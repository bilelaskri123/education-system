import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { ParentService } from "src/app/shared/services/parent.service";

@Component({
  selector: "app-parents",
  templateUrl: "./parents.component.html",
  styleUrls: ["./parents.component.scss"],
})
export class ParentsComponent implements OnInit {
  parents: User[] = [];
  isLoading = false;
  private parentsSub: Subscription;

  totalParents = 0;
  parentPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private parentService: ParentService, private router: Router) {}

  ngOnInit() {}

  addParent() {
    this.router.navigate(["/ecms/add-parent"]);
  }

  deleteParent() {}
}
