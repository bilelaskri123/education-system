export interface Group {
  id: String;
  name: String;
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
