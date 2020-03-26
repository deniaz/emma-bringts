import { buildSchema } from 'graphql';
import { Service, Tenant } from '../entities/vendor';

export type VendorInput = {
  filter: {
    service?: Service[];
    zip?: number;
    tenants?: Tenant[];
  };
};

export const schema = buildSchema(`
  input VendorFilterInput {
    service: [Service!]
    zip: Int
    tenants: [Tenant!]
  }

  enum Service {
    TAKEAWAY
    DELIVERY_MAIL
    DELIVERY
    SELF_SERVICE
  }

  enum Order {
    PHONE
    EMAIL
    WEBSITE
  }

  enum Tenant {
    EMMA
    SFY
  }

  type Vendor {
    id: String!
    name: String!
    categories: [String]!
    body: String
    service: [Service]!
    hours: [String]!
    address: String!
    zip: Int!
    locality: String!
    state: String!
    order: [Order]!
    phone: String
    email: String
    website: String
    tenant: String!
  }

  input VendorInput {
    name: String!
    categories: [String]!
    body: String
    service: [Service]!
    hours: [String]!
    address: String!
    zip: Int!
    locality: String!
    order: [Order]!
    phone: String
    email: String
    website: String
    tenant: String
  }



  type Mutation {
    createVendor(vendor: VendorInput!): Vendor!
  }

  type Query {
    vendors(filter: VendorFilterInput): [Vendor]!
  }
`);
