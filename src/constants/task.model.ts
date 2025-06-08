import { Project } from './project.model';
import { User } from './user.model';

export interface Task {
  id: number;
  name: string;
  priority: number;
  status: Status;
  project: Project;
  user?: User;
  dueDate: string;
  createdDate: string;
}

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface TaskQueryParams {
  dueDateFrom?: string;
  dueDateTo?: string | null;
  priority?: number;
}

export interface TaskRequest {
  name: string;
  priority: number;
  status: Status;
  projectId: number;
  userId: number | string | undefined;
  dueDate: string;
}

export interface TaskCreateRequest extends TaskRequest {
  id?: number;
}

export interface TaskUpdateRequest extends TaskRequest {
  id: number;
}
