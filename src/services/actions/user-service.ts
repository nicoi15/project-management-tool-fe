import { USER_URL } from '../../constants/api-urls';
import { User } from '../../constants/user.model';
import { apiClient } from '../api-helper';

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient({
    method: 'GET',
    url: USER_URL,
  });

  return response.data as User[];
};
