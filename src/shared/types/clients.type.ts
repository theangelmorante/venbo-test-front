export type Client = {
  id: string;
  identification: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  type: 'PERSONA' | 'EMPRESA';
  isRegular: boolean;
  isActive: boolean;
  employees: Employee[];
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
};
