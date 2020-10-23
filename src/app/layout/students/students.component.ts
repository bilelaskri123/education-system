import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "src/app/shared/services/student.service";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { PageEvent } from '@angular/material';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentComponent implements OnInit, OnDestroy {
  isLoading = false;
  students: User[] = [];
  private studentsSub: Subscription;

  settings = {
    columns : {
      fullName : {
        title: 'Full Name'
      },
      email : {
        title: 'Email'
      },
      emailParent : {
        title: 'Parent Email'
      },
      section : {
        title: 'Section'
      },
      group : {
        title: 'Group'
      }
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

  totalStudents = 0;
  studentsPerPage = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private studentService: StudentService,
    private settingService: SettingService,
    private router: Router) {}
  ngOnInit() {
    this.isLoading = true;
    this.getStudents("");
    this.getPaginator();
  }

  public getStudents(filter: string) {
    this.studentService.getStudents(this.studentsPerPage, this.currentPage, filter);
    this.studentsSub = this.studentService
      .getStudentUpdateListener()
      .subscribe((studentData: { students: User[]; studentCount: number }) => {
        this.isLoading = false;
        this.totalStudents = studentData.studentCount;
        this.students = studentData.students;
      });
  }

  studentFilter(serach: string) {
    this.getStudents(serach);
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-student/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.studentService.deleteStudent(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.studentService.getStudents(this.studentsPerPage, this.currentPage, "");
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
    this.studentsPerPage = pageData.pageSize;
    this.studentService.getStudents(this.studentsPerPage, this.currentPage,"");
  }

  getPaginator(){
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.studentsPerPage = setting.paginator;
      this.studentService.getStudents(setting.paginator, this.currentPage,"");
    })
  }
 
  addStudent() {
    this.router.navigate(["/ecms/add-student"]);
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
  }
}
