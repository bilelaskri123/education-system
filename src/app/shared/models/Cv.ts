export interface Cv {
  profile: string;
  skills: [{ id?: string,  skill: string; level: number }];
  projects: [{id?:string,  project: string; description: string }];
  langues?: [{id?:string,  langue: string; level: number }];
}
