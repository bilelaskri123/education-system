import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  private isAdmin: string;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this.authService.userDetail().subscribe((detail) => {
      this.isAdmin = detail.role;
    });
    if (this.isAdmin != "admin") {
      this.router.navigate(["/ecms/dashboard"]);
    }
    return true;
  }
}
