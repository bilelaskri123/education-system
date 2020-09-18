import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { StudentService } from "src/app/shared/services/student.service";
import { TeacherService } from "src/app/shared/services/teacher.service";
import { GroupService } from "src/app/shared/services/group.service";
import { SectionService } from "src/app/shared/services/section.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/shared/models/User";
import { Section } from "src/app/shared/models/Section";
import { Group } from "src/app/shared/models/Group";
import { NoteService } from "src/app/shared/services/note.service";
import { Note } from "src/app/shared/models/Note";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["../../app.component.scss", "./dashboard.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  totalNotes = 0;
  notePerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5];

  students: number;
  teachers: number;
  classes: number;
  specialities: number;

  studentsSub: Subscription;
  teachersSub: Subscription;
  sectionSub: Subscription;
  groupSub: Subscription;
  noteSub: Subscription;

  notes: any;

  isLoading = false;
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private groupService: GroupService,
    private sectionService: SectionService,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.studentService.getStudents(1000, 1);
    this.studentsSub = this.studentService
      .getStudentUpdateListener()
      .subscribe((studentData: { students: User[]; studentCount: number }) => {
        this.isLoading = false;
        this.students = studentData.studentCount;
      });

    this.teacherService.getTeachers(1000, 1);
    this.teachersSub = this.teacherService
      .getTeacherUpdateListener()
      .subscribe((teacherData: { teachers: User[]; teacherCount: number }) => {
        this.isLoading = false;
        this.teachers = teacherData.teacherCount;
      });

    this.sectionService.getSections(1000, 1);
    this.sectionSub = this.sectionService
      .getSectionUpdateListener()
      .subscribe(
        (sectionData: { sections: Section[]; sectionCount: number }) => {
          this.isLoading = false;
          this.specialities = sectionData.sectionCount;
        }
      );

    this.groupService.getGroups(1000, 1);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.isLoading = false;

        this.classes = groupData.groupCount;
      });

    this.noteService.getNotes(this.notePerPage, this.currentPage);
    this.noteSub = this.noteService
      .getNoteUpdateListener()
      .subscribe((noteData: { notes: Note[]; notesCount: number }) => {
        this.isLoading = false;
        this.notes = noteData.notes;
        this.totalNotes = noteData.notesCount;
        // console.log(this.notes);
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.notePerPage = pageData.pageSize;
    this.noteService.getNotes(this.notePerPage, this.currentPage);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id).subscribe((data) => {
      this.isLoading = true;
      this.noteService.getNotes(this.notePerPage, this.currentPage);
    });
  }
}
