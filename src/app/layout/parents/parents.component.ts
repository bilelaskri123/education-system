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
import { SettingService } from "src/app/shared/services/setting.service";

@Component({
  selector: "app-parents",
  templateUrl: "./parents.component.html",
  styleUrls: ["./parents.component.scss"],
})
export class ParentsComponent implements OnInit, OnDestroy {
  isLoading = false;
  parents: User[] = [];
  private parentsSub: Subscription;

  settings = {
    columns: {
      fullName: {
        title: "Full Name",
      },
      email: {
        title: "Email",
      },
      childEmail: {
        title: "Child",
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

  totalParents = 0;
  parentsPerPage = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  searchValue: string = "";

  constructor(
    private parentService: ParentService,
    private studentService: StudentService,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    // this.getParents("");
    this.getPaginator();
    this.parentFilter("");
  }

  getParents(filter: string) {
    this.parentService.getParents(
      this.parentsPerPage,
      this.currentPage,
      filter
    );
    this.parentsSub = this.parentService
      .getParentUpdateListener()
      .subscribe((parentData: { parents: User[]; parentCount: number }) => {
        this.isLoading = false;
        this.totalParents = parentData.parentCount;
        this.parents = parentData.parents;
      });
  }

  parentFilter(search: string) {
    this.getParents(search);
    this.searchValue = search;
  }

  onCustom(event) {
    if (event.action == "edit") {
      this.router.navigate(["/ecms/edit-parent/" + event.data.id]);
    } else if (event.action == "delete") {
      if (confirm("are you sure to delete " + event.data.fullName)) {
        this.parentService.deleteParent(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.parentService.getParents(
            this.parentsPerPage,
            this.currentPage,
            this.searchValue
          );
        });
      }
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.parentsPerPage = pageData.pageSize;
    this.parentService.getParents(
      this.parentsPerPage,
      this.currentPage,
      this.searchValue
    );
  }

  getPaginator() {
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.parentsPerPage = setting.paginator;
      this.parentService.getParents(
        this.parentsPerPage,
        this.currentPage,
        this.searchValue
      );
    });
  }

  addParent() {
    this.router.navigate(["/ecms/add-parent"]);
  }

  ngOnDestroy() {
    this.parentsSub.unsubscribe();
  }
}
