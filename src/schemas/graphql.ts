import { buildSchema } from 'graphql';
import { Service } from '../entities/vendor';

export type VendorInput = {
  filter: {
    service?: Service[];
    zip?: number;
  };
};

export const schema = buildSchema(`
  input VendorFilterInput {
    service: [Service!]
    zip: Int
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
  }

  type Query {
    vendors(filter: VendorFilterInput): [Vendor]!
  }
`);
