export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  emailParent?: string;
  salary?: number;
  childEmail?: string;
  group?: string;
  section?: string;
  payement?: string;
}
