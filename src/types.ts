// src/types.ts
export type PersonalDetailsForm_ = {
  name: string;
  age: number;
  sex: 'Male' | 'Female';
  mobile: string;
  govtIdType: 'Aadhar' | 'PAN';
  govtId: string;
};

export type AddressDetailsForm_ = {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: number;
};
