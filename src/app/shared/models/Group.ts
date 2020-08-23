export interface Group {
  id: String;
  name: String;
  section: {
    name: String;
  };
  students: [
    {
      fullName: String;
      email: String;
    }
  ];
}
