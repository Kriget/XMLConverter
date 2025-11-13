export type Address = {
  street: string;
  city: string;
  zip: string;
};

export type Telephone = {
  mobile: string;
  landline: string;
};

export type Family = {
  name: string;
  birthyear: number;
  telephone?: Telephone;
  address?: Address;
};

export type Person = {
  firstname: string;
  lastname: string;
  telephone?: Telephone;
  address?: Address;
  family?: Family[];
};

export type XmlParseError = {
    message: string;
    code: number;
}