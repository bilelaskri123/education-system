import { DatePipe } from "@angular/common";

export class DataTable {
  settings_for_admin = {
    columns: {
      email: {
        title: "Email",
      },
      status: {
        title: "Status",
      },
      book: {
        title: "Book",
      },
      date: {
        title: "Date",
        valuePrepareFunction: (date: Date) => {
          var raw = new Date(date);
          var formatted = new DatePipe("en-EN").transform(raw, "dd MMM yyyy");
          return formatted;
        },
      },
    },
    actions: {
      custom: [
        {
          name: "delete",
          title: '<i class="far fa-trash-alt"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: "right",
    },
    attr: {
      class: "table table-bordered",
    },
  };

  settings_for_users = {
    columns: {
      email: {
        title: "Email",
      },
      role: {
        title: "Status",
      },
      book: {
        title: "Book",
      },
      date: {
        title: "Date",
        valuePrepareFunction: (date: Date) => {
          var raw = new Date(date);
          var formatted = new DatePipe("en-EN").transform(raw, "dd MMM yyyy");
          return formatted;
        },
      },
    },
    actions: {
      custom: [],
      add: false,
      edit: false,
      delete: false,
      position: "right",
    },
    attr: {
      class: "table table-bordered",
    },
  };
}
