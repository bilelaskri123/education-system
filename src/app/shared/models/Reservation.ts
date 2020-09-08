export interface Reservation {
  id: string;
  role: string;
  email: string;
  date: Date;
  book?: string;
  product?: string;
}
