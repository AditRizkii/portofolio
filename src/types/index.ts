export interface NavLink {
  title: string;
  path: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: ("All" | "Web" | "Mobile")[];
  gitUrl: string;
  previewUrl: string;
}

export interface Achievement {
  metric: string;
  value: number;
  prefix?: string;
  postfix?: string;
}

export interface TabData {
  title: string;
  id: string;
  content: React.ReactNode;
}

export interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}
