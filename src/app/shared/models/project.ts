export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    demo?: string;
    repo?: string;
    live?: string;
  };
  images: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
