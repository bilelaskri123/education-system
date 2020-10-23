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
import { SettingService } from 'src/app/shared/services/setting.service';

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

  totalTeachers = 0;
  teacherPerPage = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private teacherService: TeacherService, 
    private settingService: SettingService,
    private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.getTeachers("");
    // this.getPaginator();
  }

  public getTeachers(filter: string) {
    this.teacherService.getTeachers(this.teacherPerPage, this.currentPage, filter);
    this.teachersSub = this.teacherService
      .getTeacherUpdateListener()
      .subscribe((teacherData: { teachers: User[]; teacherCount: number }) => {
        this.isLoading = false;
        this.totalTeachers = teacherData.teacherCount;
        this.teachers = teacherData.teachers;
      });
  }

  teacherFilter(serach: string) {
    this.getTeachers(serach);
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-teacher/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.teacherService.deleteTeacher(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.teacherService.getTeachers(this.teacherPerPage, this.currentPage, "");
        })
      }
    }
    else {
      this.router.navigate(['/ecms/cv-detail/' + event.data.id])
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.teacherPerPage = pageData.pageSize;
    this.teacherService.getTeachers(this.teacherPerPage, this.currentPage,"");
  }

  getPaginator(){
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.teacherPerPage = setting.paginator;
      this.teacherService.getTeachers(setting.paginator, this.currentPage,"");
    })
  }

  addTeacher() {
    this.router.navigate(["/ecms/add-teacher"]);
  }

  ngOnDestroy() {
    this.teachersSub.unsubscribe();
  }
}
