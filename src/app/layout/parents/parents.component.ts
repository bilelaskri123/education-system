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
  parents: User[] = [];
  private parentsSub: Subscription;

  settings = {
    columns : {
      fullName : {
        title: 'Full Name'
      },
      email : {
        title: 'Email'
      },
      childEmail : {
        title: 'Child'
      },
    },
    actions: {
      custom : [
        {
          name: 'edit',
          title: '<i class="fas fa-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="far fa-trash-alt"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    },
    attr: {
      class: 'table table-bordered'
    }
  }

  constructor(
    private parentService: ParentService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getParents();
  }

  getParents() {
    this.parentService.getParents();
    this.parentsSub = this.parentService
      .getParentUpdateListener()
      .subscribe((parentData: { parents: User[]; parentCount: number }) => {
        this.isLoading = false;
        this.parents = parentData.parents;
      });
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-parent/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.parentService.deleteParent(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.parentService.getParents();
        })
      }
    }
  }

  addParent() {
    this.router.navigate(["/ecms/add-parent"]);
  }

  ngOnDestroy() {
    this.parentsSub.unsubscribe();
  }
}
