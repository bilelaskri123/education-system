import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/shared/models/Group';
import { Program } from 'src/app/shared/models/Program';
import { Section } from 'src/app/shared/models/Section';
import { GroupService } from 'src/app/shared/services/group.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { SectionService } from 'src/app/shared/services/section.service';

@Component({
  selector: 'app-new-attandance',
  templateUrl: './new-attandance.component.html',
  styleUrls: ['./new-attandance.component.scss']
})
export class NewAttandanceComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  sections: Section[] = [];
  private sectionSub: Subscription;
  groups: Group[] = [];
  selectedGroups: Group[] = [];
  group: Group;
  private groupSub: Subscription;

  private programsSub: Subscription;
  programs: Program[] = [];
  selectedLessons = []
  


  isEditable = true;
  constructor(private _formBuilder: FormBuilder,
     private sectionService: SectionService,
     private groupService: GroupService,
     private programService: ProgramService
    ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    })
    this.fourthFormGroup = this._formBuilder.group({
      students: this._formBuilder.array([])
    })

    this.getSections();
    this.getGroups();
    this.getPrograms();
  }

  getSections() {
    this.sectionService.getSections(1000, 1);
    this.sectionSub = this.sectionService
      .getSectionUpdateListener()
      .subscribe(
        (sectionData: { sections: Section[]; sectionCount: number }) => {
          this.sections = sectionData.sections;
        }
      );
  }

  getGroups() {
    this.groupService.getGroups(1000,1);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.groups = groupData.groups;
      });
  }

  getPrograms() {
    this.programService.getPrograms(1000,1);
    this.programsSub = this.programService
      .getProgramUpdateListener()
      .subscribe(
        (programData: { programs: Program[]; programCount: number }) => {
          this.programs = programData.programs;
        }
      );
  }

  getSection(obj) {
    this.selectedGroups = [];
    this.groups.map((group) => {
      if(group.section._id == obj.value) {
        this.selectedGroups.push(group);
      }
    })
  }

  getGroup(obj) {
    this.selectedGroups.map((group) => {
      if(group.id == obj.value) {
        this.group = group;
      }
    })
    this.programs.map((program) => {
      if ((program.section == this.group.section.name) && (program.level == this.group.level)) {
        this.selectedLessons = program.lessons;
      }
    })

    let studentsGroup = this.fourthFormGroup.get('students') as FormArray;

    this.group.students.map((student) => {
      let newStudent = this._formBuilder.group({
        email: student.email,
        fullName: student.fullName,
        absent: false 
      });

      studentsGroup.push(newStudent);
    })

    console.log(studentsGroup.value);
  }

  saveAttandance() {
    console.log(this.firstFormGroup.value,
      this.secondFormGroup.value,
      this.thirdFormGroup.value,
      this.fourthFormGroup.value)
  }
}
