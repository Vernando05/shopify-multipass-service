import supertest from 'supertest'
import functions from 'firebase-functions-test'
import app from '../src/index'
const test = functions()

describe('MultiPassToken', () => {
  beforeAll(() => {
    test.mockConfig({ multipass: { secret_key: 's3cr3tK3y' }});
  })
  afterAll(() => {
    test.cleanup()    
  })

  it('should return hello world', async () => {
    const res = await supertest(app)
      .post('/graphql')      
      .send({
        query: 'query { hello }'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)  
      .expect(200)
    expect(res.body.data.hello).toBe('Hello world!')
  })
  it('should return the token', async () => {
    const res = await supertest(app)
      .post('/graphql')      
      .send({
        query: `mutation createMultipassToken { createMultipassToken(data: {
            firstName: "Jack",
            lastName: "Axe",
            email: "jack@lumber.com"
          }) {
            firstName
            lastName
            email
            token
          }
        }`
      })
      .set('Accept', 'application/json')  
      .expect('Content-Type', /json/)  
      .expect(200)
    expect(res.body.data.createMultipassToken.firstName).toBe('Jack')
    expect(res.body.data.createMultipassToken.lastName).toBe('Axe')
    expect(res.body.data.createMultipassToken.email).toBe('jack@lumber.com')
    expect(res.body.data.createMultipassToken.token.length).toBeGreaterThan(0)  
  })
})