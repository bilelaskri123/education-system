import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/auth/auth.guard";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "prefix",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashbord.module").then((m) => m.DashbordModule),
      },
      {
        path: "program",
        loadChildren: () =>
          import("./program/program.module").then((m) => m.ProgramModule),
      },
      {
        path: "subject",
        loadChildren: () =>
          import("./subject/subject.module").then((m) => m.SubjectModule),
      },
      {
        path: "parents",
        loadChildren: () =>
          import("./parents/parents.module").then((m) => m.ParentsModule),
      },
      {
        path: "accountant",
        loadChildren: () =>
          import("./accountant/accountant.module").then(
            (m) => m.AccountantModule
          ),
      },
      {
        path: "group",
        loadChildren: () =>
          import("./group/group.module").then((m) => m.GroupModule),
      },
      {
        path: "librarians",
        loadChildren: () =>
          import("./librarian/librarian.module").then((m) => m.LibrarianModule),
      },
      {
        path: "evaluation",
        loadChildren: () =>
          import("./evaluation/evaluation.module").then(
            (m) => m.EvaluationModule
          ),
      },
      {
        path: "students",
        loadChildren: () =>
          import("./students/students.module").then((m) => m.StudentsModule),
      },
      {
        path: "teachers",
        loadChildren: () =>
          import("./teachers/teachers.module").then((m) => m.TeachersModule),
      },
      {
        path: "section",
        loadChildren: () =>
          import("./section/section.module").then((m) => m.SectionModule),
      },
      {
        path: "timetables",
        loadChildren: () =>
          import("./timetable/timetable.module").then((m) => m.TimetableModule),
      },
      {
        path: "attendance",
        loadChildren: () =>
          import("./attendance/attendance.module").then(
            (m) => m.AttendanceModule
          ),
      },
      {
        path: "note",
        loadChildren: () =>
          import("./payement/payement.module").then((m) => m.PayementModule),
      },
      {
        path: "products",
        loadChildren: () =>
          import("./products/products.module").then((m) => m.ProductsModule),
      },
      {
        path: "books",
        loadChildren: () =>
          import("./book/book.module").then((m) => m.BookModule),
      },
      {
        path: "add-student",
        loadChildren: () =>
          import("./add-student/add-student.module").then(
            (m) => m.AddStudentModule
          ),
      },
      {
        path: "edit-student/:studentId",
        loadChildren: () =>
          import("./add-student/add-student.module").then(
            (m) => m.AddStudentModule
          ),
      },
      {
        path: "add-teacher",
        loadChildren: () =>
          import("./add-teacher/add-teacher.module").then(
            (m) => m.AddTeacherModule
          ),
      },
      {
        path: "edit-teacher/:teacherId",
        loadChildren: () =>
          import("./add-teacher/add-teacher.module").then(
            (m) => m.AddTeacherModule
          ),
      },
      {
        path: "edit-parent/:parentId",
        loadChildren: () =>
          import("./add-parent/add-parent.module").then(
            (m) => m.AddParentModule
          ),
      },
      {
        path: "edit-librarian/:librarianId",
        loadChildren: () =>
          import("./add-librarian/add-librarian.module").then(
            (m) => m.AddLibrarianModule
          ),
      },
      {
        path: "edit-accountant/:accountantId",
        loadChildren: () =>
          import("./add-accountant/add-accountant.module").then(
            (m) => m.AddAccountantModule
          ),
      },
      {
        path: "add-parent",
        loadChildren: () =>
          import("./add-parent/add-parent.module").then(
            (m) => m.AddParentModule
          ),
      },
      {
        path: "add-librarian",
        loadChildren: () =>
          import("./add-librarian/add-librarian.module").then(
            (m) => m.AddLibrarianModule
          ),
      },
      {
        path: "add-accountant",
        loadChildren: () =>
          import("./add-accountant/add-accountant.module").then(
            (m) => m.AddAccountantModule
          ),
      },
      {
        path: "create-product",
        loadChildren: () =>
          import("./add-product/add-product.module").then(
            (m) => m.AddProductModule
          ),
      },
      {
        path: "edit-product/:productId",
        loadChildren: () =>
          import("./add-product/add-product.module").then(
            (m) => m.AddProductModule
          ),
      },
      {
        path: "edit-section/:sectionId",
        loadChildren: () =>
          import("./add-section/add-section.module").then(
            (m) => m.AddSectionModule
          ),
      },
      {
        path: "create-book",
        loadChildren: () =>
          import("./add-book/add-book.module").then((m) => m.AddBookModule),
      },
      {
        path: "edit-book/:bookId",
        loadChildren: () =>
          import("./add-book/add-book.module").then((m) => m.AddBookModule),
      },
      {
        path: "edit-subject/:subjectId",
        loadChildren: () =>
          import("./add-subject/add-subject.module").then(
            (m) => m.AddSubjectModule
          ),
      },
      {
        path: "edit-program/:programId",
        loadChildren: () =>
          import("./new-program/new-program.module").then(
            (m) => m.NewProgramModule
          ),
      },
      {
        path: "product-reservation",
        loadChildren: () =>
          import("./reser-product/reser-product.module").then(
            (m) => m.ReserProductModule
          ),
      },
      {
        path: "my-product-reservation",
        loadChildren: () =>
          import("./my-reser-product/my-reser-product.module").then(
            (m) => m.MyReserProductModule
          ),
      },
      {
        path: "book-reservation",
        loadChildren: () =>
          import("./reser-book/reser-book.module").then(
            (m) => m.ReserBookModule
          ),
      },
      {
        path: "my-book-reservation",
        loadChildren: () =>
          import("./my-reser-book/my-reser-book.module").then(
            (m) => m.MyReserBookModule
          ),
      },
      {
        path: "add-section",
        loadChildren: () =>
          import("./add-section/add-section.module").then(
            (m) => m.AddSectionModule
          ),
      },
      {
        path: "add-group",
        loadChildren: () =>
          import("./add-group/add-group.module").then((m) => m.AddGroupModule),
      },
      {
        path: "add-subject",
        loadChildren: () =>
          import("./add-subject/add-subject.module").then(
            (m) => m.AddSubjectModule
          ),
      },
      {
        path: "new-reservation-book",
        loadChildren: () =>
          import("./add-reser-book/add-reser-book.module").then(
            (m) => m.AddReserBookModule
          ),
      },
      {
        path: "new-reservation-product",
        loadChildren: () =>
          import("./add-reser-product/add-reser-product.module").then(
            (m) => m.AddReserProductModule
          ),
      },
      {
        path: "new-program",
        loadChildren: () =>
          import("./new-program/new-program.module").then(
            (m) => m.NewProgramModule
          ),
      },
      {
        path: "new-course/:subjectId",
        loadChildren: () =>
          import("./new-course/new-course.module").then(
            (m) => m.NewCourseModule
          ),
      },
      {
        path: "new-time-table",
        loadChildren: () =>
          import("./newtimetable/newtimetable.module").then(
            (m) => m.NewtimetableModule
          ),
      },
      {
        path: "events",
        loadChildren: () =>
          import("./event-modal/event-modal.module").then(
            (m) => m.EventModalModule
          ),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "my-course/:subjectId",
        loadChildren: () =>
          import("./my-course/my-course.module").then((m) => m.MyCourseModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class LayoutRoutingModule {}
