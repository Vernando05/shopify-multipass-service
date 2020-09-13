import * as functions from 'firebase-functions'
import * as crypto from 'crypto'

function createMultipassToken(firstName: string, lastName: string, email: string, remoteIp: string) {  
  const now = (new Date()).toISOString()
  const customer = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    created_at: now,
    remote_ip: remoteIp
  }
  const hash = crypto.createHash("sha256").update(functions.config().multipass.secret_key).digest()
  const encryptionKey = hash.slice(0, 16)
  const signingKey = hash.slice(16, 32)

  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-128-cbc', encryptionKey, iv)
  const cipherText = Buffer.concat([iv, cipher.update(JSON.stringify(customer), 'utf8'), cipher.final()])

  const signed = crypto.createHmac("SHA256", signingKey).update(cipherText).digest()

  const token = Buffer.concat([cipherText, signed]).toString('base64')
  return token
}

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
  Mutation: {
    createMultipassToken: async (_: void, args: CustomerPayload, context: any): Promise<Customer> => {      
      const customer = { ...args.data }
      customer.remoteIp = context.remoteIp
      customer.token = createMultipassToken(customer.firstName, customer.lastName, customer.email, customer.remoteIp)
      return customer
    }
  }
}
export default resolvers