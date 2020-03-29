import { buildSchema } from 'graphql';
import { Service, Tenant } from '../entities/vendor';

export type VendorInput = {
  filter: {
    service?: Service[];
    zip?: number;
    tenants?: Tenant[];
    categories?: string[];
  };
  skip?: number;
  limit?: number;
};

export const schema = buildSchema(`
  input VendorFilterInput {
    categories: [String]
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
    BELOCALHERO
    LOKALLOYAL
    LAEDELISHOP
  }

  type Vendor {
    id: String!
    name: String!
    categories: [String]!
    body: String
    region: String
    service: [Service]!
    hours: [String]!
    address: [String]!
    order: [Order]!
    contact: [String]!
    tenant: String!
  }

  input VendorInput {
    name: String!
    categories: [String]!
    body: String
    region: String
    service: [Service]!
    hours: [String]!
    address: [String]!
    order: [Order]!
    contact: [String]!
  }



  type Mutation {
    createVendor(vendor: VendorInput!): Vendor!
  }

  type Query {
    vendors(filter: VendorFilterInput, skip: Int, limit: Int): [Vendor]!
    categories: [String]!
    total: Int!
  }
`);
