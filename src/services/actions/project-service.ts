import { PROJECT_URL } from '../../constants/api-urls';
import { Project } from '../../constants/project.model';
import { apiClient } from '../api-helper';

export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient({
    method: 'GET',
    url: PROJECT_URL,
  });

  return response.data as Project[];
};
