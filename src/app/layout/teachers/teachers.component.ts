import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { AccountantService } from "src/app/shared/services/accountant.service";
import { TeacherService } from "src/app/shared/services/teacher.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"],
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers: User[] = [];
  isLoading = false;
  private teachersSub: Subscription;
  settings = {
    columns : {
      fullName : {
        title: 'Full Name'
      },
      email : {
        title: 'Email'
      },
      speciality : {
        title: 'Speciality'
      },
      salary : {
        title: 'Salary'
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
        },
        {
          name: 'view',
          title: ' <i class="fas fa-eye"></i>'
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

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.getTeachers();
  }

  public getTeachers() {
    this.teacherService.getTeachers();
    this.teachersSub = this.teacherService
      .getTeacherUpdateListener()
      .subscribe((teacherData: { teachers: User[]; teacherCount: number }) => {
        this.isLoading = false;
        this.teachers = teacherData.teachers;
      });
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-teacher/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.teacherService.deleteTeacher(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.teacherService.getTeachers();
        })
      }
    }
    else {
      this.router.navigate(['/ecms/cv-detail/' + event.data.id])
    }
  }

  addTeacher() {
    this.router.navigate(["/ecms/add-teacher"]);
  }

  ngOnDestroy() {
    this.teachersSub.unsubscribe();
  }
}
