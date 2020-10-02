import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Section } from "../models/Section";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SectionService {
  private sections: Section[] = [];
  private sectionsUpdated = new Subject<{
    sections: Section[];
    sectionCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getSections(sectionsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${sectionsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; sections: any; maxSection: number }>(
        "http://localhost:3000/api/section" + queryParams
      )
      .pipe(
        map((sectionData) => {
          return {
            section: sectionData.sections.map((section) => {
              return {
                name: section.name,
                hours: section.hours,
                prix: section.prix,
                local: section.local,
                description: section.description,
                id: section._id,
                imagePath: section.imagePath,
              };
            }),
            maxSection: sectionData.maxSection,
          };
        })
      )
      .subscribe((transformedData) => {
        this.sections = transformedData.section;
        this.sectionsUpdated.next({
          sections: [...this.sections],
          sectionCount: transformedData.maxSection,
        });
      });
  }

  getSectionUpdateListener() {
    return this.sectionsUpdated.asObservable();
  }

  getSection(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      hours: number;
      prix: number;
      local: string;
      description: string;
      imagePath: string;
    }>("http://localhost:3000/api/section/" + id);
  }

  addSection(
    name: string,
    hours: number,
    prix: number,
    local: string,
    description: string,
    image: File
  ) {
    const sectionData = new FormData();
    let hoursUpdated = hours.toString();
    let prixUpdated = prix.toString();

    sectionData.append("name", name);
    sectionData.append("hours", hoursUpdated);
    sectionData.append("prix", prixUpdated);
    sectionData.append("local", local);
    sectionData.append("description", description);
    sectionData.append("image", image, name);

    this.http
      .post<{ message: string; section: Section }>(
        "http://localhost:3000/api/section",
        sectionData
      )
      .subscribe((responseData) => {
        console.log(responseData.section);
        this.router.navigate(["/ecms/section"]);
      });
  }

  updateSection(
    id: string,
    name: string,
    hours: number,
    prix: number,
    local: string,
    description: string,
    image: File | string
  ) {
    let sectionData: Section | FormData;
    if (typeof image === "object") {
      let hoursUpdated = hours.toString();
      let prixUpdated = prix.toString();
      sectionData = new FormData();
      sectionData.append("name", name);
      sectionData.append("hours", hoursUpdated);
      sectionData.append("prix", prixUpdated),
        sectionData.append("local", local);
      sectionData.append("description", description);
      sectionData.append("image", image, name);
    } else {
      sectionData = {
        id: id,
        name: name,
        hours: hours,
        prix: prix,
        local: local,
        description: description,
        imagePath: image,
      };
    }
    this.http
      .put("http://localhost:3000/api/section/" + id, sectionData)
      .subscribe((response) => {
        this.router.navigate(["/ecms/section"]);
      });
  }

  deleteSection(sectionId: string) {
    return this.http.delete("http://localhost:3000/api/section/" + sectionId);
  }
}
