import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { ParentService } from "src/app/shared/services/parent.service";
import { StudentService } from "src/app/shared/services/student.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-parents",
  templateUrl: "./parents.component.html",
  styleUrls: ["./parents.component.scss"],
})
export class ParentsComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;

  parents: User[] = [];
  private parentsSub: Subscription;

  totalParents = 0;
  parentPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(
    private parentService: ParentService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.form = new FormGroup({
      search: new FormControl(null, { validators: [Validators.nullValidator] }),
    });

    this.getParents("");
  }

  getParents(filtredBy: string) {
    this.parentService.getParents(
      this.parentPerPage,
      this.currentPage,
      filtredBy
    );
    this.parentsSub = this.parentService
      .getParentUpdateListener()
      .subscribe((parentData: { parents: User[]; parentCount: number }) => {
        this.isLoading = false;
        this.totalParents = parentData.parentCount;
        this.parents = parentData.parents;
      });
  }

  test() {
    this.getParents(this.form.value.search);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.parentPerPage = pageData.pageSize;
    this.parentService.getParents(this.parentPerPage, this.currentPage, "");
  }

  deleteParent(parentId: string) {
    this.parentService.deleteParent(parentId).subscribe(() => {
      this.isLoading = true;
      this.parentService.getParents(this.parentPerPage, this.currentPage, "");
    });
  }

  addParent() {
    this.router.navigate(["/ecms/add-parent"]);
  }

  ngOnDestroy() {
    this.parentsSub.unsubscribe();
  }
}
