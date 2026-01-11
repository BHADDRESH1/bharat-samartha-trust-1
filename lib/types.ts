export enum UserRole {
  SUPER_ADMIN = 'Super Admin',
  ADMIN = 'Admin',
  VOLUNTEER = 'Volunteer',
  DONOR = 'Donor',
  MENTOR = 'Mentor',
  LEGAL_WORKER = 'Legal Aid Case Worker',
  LEGAL_APPLICANT = 'Legal Aid Applicant',
  STUDENT = 'Student'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Cause {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  image: string;
  category: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: any;
}