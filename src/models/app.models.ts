import {UUID} from 'angular2-uuid';

export const BooleanList = [
  {id: true, value: 'Yes'},
  {id: false, value: 'No'}
];

export class PersonalInformation {
  uuid: number;
  firstName: string;
  lastName: string;
  dob: string;
  ssn: number;
  phNo: number;
  email: string;
  address = Address;
  visa: string;
  expiration: string;
  i94date: string;
}

class EmployerInformation {
  companyName: string;
  name: string;
  ein: string;
  stateReg: string;
  phNo: string;
  email: string;
  address: Address;
}

export class InteranalInformation {
  employmentType: string;
  offerStatus: string;
  employer: EmployerInformation;
  bgvstartDate: string;
  bgvendDate: string;
  drugTeststartDate: string;
  drugTestendDate: string;
  ndastartDate: string;
  ndaendDate: string;
}

export class ClientInformation {
  ads: string;
  email: string;
  role: string;
  sow: string;
  sowSubmittedOn: string;
  sowSubmittedBy: string;
  cafeNumber: string;
  po: string;
  poLineNumber: string;
  rate: number;
  startDate: string;
  endDate: string;
  laptopNo: string;
}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: number;
}
export class Audit {
  createdBy: string;
  createdOn: Date;
  updatedBy: string;
  updatedOn: Date;
}
export class Onboardinginfo {
  recordId: string;
  clientName: string;
  recruiter: string;
  accountManager: string;
  personal: PersonalInformation;
  internal: InteranalInformation;
  client: ClientInformation[];
}
export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token?: string;
}
export class Vendor {
  record_id: UUID;
  vendorName: string;
  contactPerson: string;
  contact: string;
  email: string;
  address: Address;
  region: string;
  scopeOfServices: string;
  newSubmittal: boolean;
  audit: Audit;
}
