export interface Cv {
  profile: string;
  skills: [{ skill: string; level: number }];
  projects: [{ project: string; description: string }];
  langues?: [{ langue: string; level: number }];
}
