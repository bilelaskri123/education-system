export interface Attandance {
  _id: string;
  date: string;
  section: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    name: string;
    level: number;
  };
  lesson: {
    id: string;
    name: string;
  };
  students: [
    {
      id: string;
      email: string;
      fullName: string;
      absent: boolean;
    }
  ];
}
