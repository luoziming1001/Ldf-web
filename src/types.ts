/**
 * Shared types for the Luo Ziming / Dongfang Designer Portfolio
 */

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  englishTitle: string;
  category: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  client: string;
  date: string;
  role: string;
  description: string;
  tags: string[];
  stats: ProjectStat[];
  concept: string;
  tools: string[];
  beforeImage: string;
  fallbackBeforeImage?: string;
  afterImage: string;
  fallbackAfterImage?: string;
}

export interface ProfileInfo {
  name: string;
  age: string;
  gender: string;
  education: string;
  phone: string;
  email: string;
  wechat: string;
  hobbies: string;
  company: string;
  time: string;
  position: string;
  experience: string;
  evaluation: string;
}

export interface SliderImage {
  url: string;
  title: string;
  isCustomized?: boolean;
  fallbackUrl?: string;
}
