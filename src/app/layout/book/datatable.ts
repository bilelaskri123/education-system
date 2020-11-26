export class DataTable {
  settings_for_admin = {
    columns: {
      imagePath: {
        title: "image",
        type: "html",
        valuePrepareFunction: (imagePath: string) => {
          return `<img src="${imagePath}">`;
        },
      },
      title: {
        title: "Title",
      },
      isbn: {
        title: "isbn",
      },
      auther: {
        title: "Auther",
      },
      pages: {
        title: "Pages",
      },
      copies: {
        title: "Copies",
      },
      description: {
        title: "Description",
      },
    },
    actions: {
      custom: [
        {
          name: "edit",
          title: '<i class="fas fa-edit"></i>',
        },
        {
          name: "delete",
          title: '&nbsp;&nbsp;<i class="far fa-trash-alt"></i>',
        },
        {
          name: "add",
          title: '&nbsp;&nbsp;<i class = "fas fa-plus-square"></i>',
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
      imagePath: {
        title: "image",
        type: "html",
        valuePrepareFunction: (imagePath: string) => {
          return `<img src="${imagePath}">`;
        },
      },
      title: {
        title: "Title",
      },
      isbn: {
        title: "isbn",
      },
      auther: {
        title: "Auther",
      },
      pages: {
        title: "Pages",
      },
      copies: {
        title: "Copies",
      },
      description: {
        title: "Description",
      },
    },
    actions: {
      custom: [
        {
          name: "add",
          title: '<i class = "fas fa-plus-square"></i>',
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
}
