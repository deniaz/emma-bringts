export type Service = 'TAKEAWAY' | 'DELIVERY_MAIL' | 'DELIVERY' | 'SELF_SERVICE';

export type Order = 'PHONE' | 'EMAIL' | 'WEBSITE';

export type Tenant = 'EMMA' | 'SFY' | 'BELOCALHERO' | 'LOKALLOYAL' | 'LAEDELISHOP';

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
  location?: Location;
};

type Location = {
  type: 'Point';
  coordinates: [number, number];
};

export type MongoVendor = {
  _id: string;
} & VendorData;

export type Vendor = {
  id: string;
} & VendorData;
