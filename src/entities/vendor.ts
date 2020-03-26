export type Service = 'TAKEAWAY' | 'DELIVERY_MAIL' | 'DELIVERY' | 'SELF_SERVICE';

export type Order = 'PHONE' | 'EMAIL' | 'WEBSITE';

export type Tenant = 'EMMA' | 'SFY';

type VendorData = {
  name: string;
  categories: string[];
  body: string;
  service: Service[];
  hours: string[];
  address: string;
  zip: number;
  state: string;
  locality: string;
  order: Order[];
  phone?: string;
  email?: string;
  website?: string;
  tenant: Tenant;
};

export type MongoVendor = {
  _id: string;
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
} & VendorData;

export type Vendor = {
  id: string;
} & VendorData;
