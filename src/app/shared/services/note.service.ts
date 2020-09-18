import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Note } from "../models/Note";

@Injectable({
  providedIn: "root",
})
export class NoteService {
  private notes: Note[] = [];
  private notessUpdated = new Subject<{
    notes: Note[];
    notesCount: number;
  }>();
  constructor(private http: HttpClient) {}

  createNote(title: string, problem: string, solution: string) {
    let note = {
      title: title,
      problem: problem,
      solution: solution,
    };
    // console.log(note);
    return this.http.post("http://localhost:3000/api/note", note);
  }

  getNotes(parentPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${parentPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; notes: any; count: number }>(
        "http://localhost:3000/api/note" + queryParams
      )
      .pipe(
        map((noteData) => {
          return {
            notes: noteData.notes.map((note) => {
              return {
                fullName: note.userId.fullName,
                title: note.title,
                problem: note.problem,
                solution: note.solution,
                id: note._id,
              };
            }),
            count: noteData.count,
          };
        })
      )
      .subscribe((transformedNote) => {
        this.notes = transformedNote.notes;
        this.notessUpdated.next({
          notes: [...this.notes],
          notesCount: transformedNote.count,
        });
      });
  }

  getNoteUpdateListener() {
    return this.notessUpdated.asObservable();
  }

  deleteNote(id: string) {
    return this.http.delete("http://localhost:3000/api/note/" + id);
  }
}
