export interface Group {
  id: String;
  name: String;
  level?: Number
  section: {
    name: String;
    _id?: string;
  };
  students: [
    {
      fullName: String;
      email: String;
    }
  ];
}
