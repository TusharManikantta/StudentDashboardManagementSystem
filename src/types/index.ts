export interface User {
  id: string;
  name: string;
  email: string;
  branch: string;
  rollNumber: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface Performance {
  subjectId: string;
  attendance: number;
  grade: string;
  behaviorScore: number;
  marks: number;
}

export interface Semester {
  id: number;
  performances: Performance[];
}

export type Branch = 'CSE' | 'ECE' | 'EEE' | 'MECH' | 'CIVIL' | 'IT';