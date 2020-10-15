import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "src/app/shared/services/student.service";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";

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

  constructor(private studentService: StudentService, private router: Router) {}
  ngOnInit() {
    this.isLoading = true;
    this.getStudents();
  }

  public getStudents() {
    this.studentService.getStudents();
    this.studentsSub = this.studentService
      .getStudentUpdateListener()
      .subscribe((studentData: { students: User[]; studentCount: number }) => {
        this.isLoading = false;
        this.students = studentData.students;
      });
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-student/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.studentService.deleteStudent(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.studentService.getStudents();
        })
      }
    }
    else {
      this.router.navigate(['/ecms/cv-detail/' + event.data.id])
    }
  }
 
  addStudent() {
    this.router.navigate(["/ecms/add-student"]);
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
  }
}
