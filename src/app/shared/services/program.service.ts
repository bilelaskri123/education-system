import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Program } from "../models/Program";

let URLSUBJECT = "http://localhost:3000/api/subject/all";
let URLSECTION = "http://localhost:3000/api/section/all";
let URLPROGRAM = "http://localhost:3000/api/program";

@Injectable({
  providedIn: "root",
})
export class ProgramService {
  private programs: Program[] = [];
  private programsUpdated = new Subject<{
    programs: Program[];
    programCount: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  getAllSubject() {
    return this.http.get(URLSUBJECT);
  }

  getAllSection() {
    return this.http.get(URLSECTION);
  }

  addProgram(section: string, level: number, lessons: string[]) {
    let Program = {
      section: section,
      level: level,
      lessons: lessons,
    };

    this.http
      .post<{ message: string }>(URLPROGRAM, Program)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/program"]);
      });
  }

  getPrograms(programsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${programsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; programs: any; maxPrograms: number }>(
        URLPROGRAM + queryParams
      )
      .pipe(
        map((programData) => {
          return {
            programs: programData.programs.map((program) => {
              return {
                section: program.section.name,
                level: program.level,
                lessons: program.lessons,
                id: program._id,
              };
            }),
            programCount: programData.maxPrograms,
          };
        })
      )
      .subscribe((transformedProgramsData) => {
        console.log(transformedProgramsData);
        this.programs = transformedProgramsData.programs;
        this.programsUpdated.next({
          programs: [...this.programs],
          programCount: transformedProgramsData.programCount,
        });
      });
  }

  getProgramUpdateListener() {
    return this.programsUpdated.asObservable();
  }

  getProgram(id: string) {
    return this.http.get<{
      _id: string;
      section: string;
      level: number;
      lessons: string[];
    }>(URLPROGRAM + "/" + id);
  }

  updateProgram(id: string, section: string, level: number, lessons: string[]) {
    let Data = {
      id: id,
      section: section,
      level: level,
      lessons: lessons,
    };

    return this.http.put(URLPROGRAM + "/" + id, Data).subscribe((response) => {
      this.router.navigate(["/ecms/program"]);
    });
  }

  deleteProgram(id: string) {
    return this.http.delete(URLPROGRAM + "/" + id);
  }
}
