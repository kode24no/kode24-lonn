export enum Sector {
  PRIVATE = "private",
  PUBLIC = "public"
}

export interface Row {
  age: string;
  educationYears: number;
  experienceYears: number;
  position: string;
  sector: string;
  municipality: string;
  domain: string;
  salary: number;
  hasBonus: boolean;
  isSatisfied: boolean;
}


