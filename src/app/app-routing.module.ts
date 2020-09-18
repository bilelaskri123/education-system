import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/auth/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./acceuil/acceuil.module").then((m) => m.AcceuilModule),
  },
  {
    path: "ecms",
    loadChildren: () =>
      import("./layout/layout.module").then((m) => m.LayoutModule),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "request-reset-password",
    loadChildren: () =>
      import("./request-reset/request-reset.module").then(
        (m) => m.RequestResetModule
      ),
  },
  {
    path: "response-reset-password/:token",
    loadChildren: () =>
      import("./response-reset/response-reset.module").then(
        (m) => m.ResponseResetModule
      ),
  },
  {
    path: "**",
    loadChildren: () =>
      import("./acceuil/acceuil.module").then((m) => m.AcceuilModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
