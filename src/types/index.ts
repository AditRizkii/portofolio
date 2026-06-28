export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: ("All" | "Web" | "Mobile")[];
  gitUrl: string;
  previewUrl: string;
  tech: string[];
}

export interface Achievement {
  metric: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: string;
}

export interface NavLink {
  title: string;
  path: string;
}

export interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = "idle" | "sending" | "success" | "error";

export interface Skill {
  name: string;
  icon: string;
  color: string;
  group: "Frontend" | "Backend" | "Database" | "Tools";
}
