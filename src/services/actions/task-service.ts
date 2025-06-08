import { TASK_URL } from './../../constants/api-urls';
import { apiClient } from '../api-helper';
import {
  Task,
  TaskQueryParams,
  TaskUpdateRequest,
} from '../../constants/task.model';

export const getTasks = async (params: TaskQueryParams): Promise<Task[]> => {
  const response = await apiClient({
    method: 'GET',
    url: TASK_URL,
    params,
  });

  return response.data as Task[];
};

export const updateTask = async (task: TaskUpdateRequest): Promise<void> => {
  await apiClient({
    method: 'PUT',
    url: `${TASK_URL}/${task.id}`,
    data: task,
  });
};
