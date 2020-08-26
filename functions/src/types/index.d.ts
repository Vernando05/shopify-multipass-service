interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  created_at: string;
  token: string;
  remoteIp: string;
}
interface CustomerPayload {
  data: Customer;
}