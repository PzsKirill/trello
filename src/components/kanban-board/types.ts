export interface Task {
  id: string;
  title: string;
  description: string;
  images?: string[];
  checklist?: { id: string; text: string; done: boolean }[];
  deadline?: string; // YYYY-MM-DD
  priority?: 'low' | 'medium' | 'high';
  tags: string[];
  category?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}
