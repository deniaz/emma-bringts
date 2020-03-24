export type MongoVendor = {
  _id: string;
  vendor: string;
  category: string;
  offer: string;
  region: string;
  type: string;
  hours: string;
  address: string;
  order_options: string;
  contact: string;
};

export type Service = 'TAKEAWAY' | 'DELIVERY_MAIL' | 'DELIVERY' | 'SELF_SERVICE';

export type Order = 'PHONE' | 'EMAIL' | 'WEBSITE';

export type Vendor = {
  id: string;
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
