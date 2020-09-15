export interface Lesson {
  id: string;
  name: string;
  coefficient: number;
  description: string;
  teachers: [
    {
      _id: string;
      fullName: string;
    }
  ];
}
