export type Service = 'TAKEAWAY' | 'DELIVERY_MAIL' | 'DELIVERY' | 'SELF_SERVICE';

export type Order = 'PHONE' | 'EMAIL' | 'WEBSITE';

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
};

export type MongoVendor = {
  _id: string;
} & VendorData;

export type Vendor = {
  id: string;
} & VendorData;
