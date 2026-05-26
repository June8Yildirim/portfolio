export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  technologies?: string[];
  responsibilities: string[];
  category: "software" | "technical";
}
