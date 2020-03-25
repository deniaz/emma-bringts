export type Service = 'TAKEAWAY' | 'DELIVERY_MAIL' | 'DELIVERY' | 'SELF_SERVICE';

export type Order = 'PHONE' | 'EMAIL' | 'WEBSITE';

export type Tenant = 'EMMA' | 'SFY';

type VendorData = {
  name: string;
  categories: string[];
  body: string;
  region: string;
  service: Service[];
  hours: string[];
  address: string[];
  order: Order[];
  contact: string[];
  tenant: Tenant;
};

export type MongoVendor = {
  _id: string;
} & VendorData;

export type Vendor = {
  id: string;
} & VendorData;
