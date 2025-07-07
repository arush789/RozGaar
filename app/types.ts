export type UserType = {
  id: number;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string | null;
};

export type Jobstype = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  salary_min: number;
  salary_max: number;
  application_deadline: Date;
};
