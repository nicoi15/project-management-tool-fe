import React from 'react';
import { Status, Task, TaskUpdateRequest } from '../constants/task.model';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useFormik } from 'formik';
import useProjectsStore from '../zustand/projectStore';
import useUsersStore from '../zustand/usersStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../services/actions/task-service';

interface Props {
  task: Task;
  onClose: () => void;
}

const TaskDrawer = ({ task, onClose }: Props) => {
  const { projects } = useProjectsStore();
  const { users } = useUsersStore();
  const queryClient = useQueryClient();

  const invalidateTaskQuery = (): Promise<void> =>
    queryClient.invalidateQueries({
      queryKey: ['tasks'],
    });

  const { mutateAsync: updateTaskMutation } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => invalidateTaskQuery(),
  });

  const formik = useFormik<TaskUpdateRequest>({
    initialValues: {
      id: task.id,
      name: task.name,
      priority: task.priority,
      status: task.status,
      projectId: task.project.id,
      userId: task?.user?.id || '',
      dueDate: task.dueDate,
    },
    onSubmit: (values) => {
      try {
        updateTaskMutation(values);
        onClose();
      } catch (error) {
        console.error('An error has occured when updating task', error);
      }
    },
  });

  return (
    <Box sx={{ mt: 1, padding: '10px', maxWidth: 'sm' }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin='normal'
          required
          fullWidth
          label='Name'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <DatePicker
          sx={{ marginTop: '1rem', width: '100%' }}
          label='Due date'
          value={
            formik.values.dueDate ? dayjs(formik.values.dueDate) : undefined
          }
          onChange={(value) =>
            formik.setFieldValue('dueDate', value?.format('YYYY-MM-DD'), true)
          }
        />
        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
          <InputLabel id='priority-label'>Priority</InputLabel>
          <Select
            labelId='priority-label'
            id='priority'
            name='priority'
            value={formik.values.priority}
            label='Priority'
            onChange={formik.handleChange}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
          <InputLabel id='status-label'>Status</InputLabel>
          <Select
            labelId='status-label'
            id='status'
            name='status'
            value={formik.values.status}
            label='Status'
            onChange={formik.handleChange}>
            <MenuItem value={Status.PENDING}>Pending</MenuItem>
            <MenuItem value={Status.IN_PROGRESS}>In Progress</MenuItem>
            <MenuItem value={Status.COMPLETED}>Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
          <InputLabel id='project-label'>Project</InputLabel>
          <Select
            labelId='project-label'
            id='projectId'
            name='projectId'
            value={formik.values.projectId}
            label='Project'
            onChange={formik.handleChange}>
            {projects?.map((project, index) => (
              <MenuItem key={`${project.id}-${index}`} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
          <InputLabel id='assignee-label'>Assignee</InputLabel>
          <Select
            labelId='assignee-label'
            id='userId'
            name='userId'
            value={formik.values.userId}
            label='Assignee'
            onChange={formik.handleChange}>
            {users?.map((user, index) => (
              <MenuItem key={`${user.id}-${index}`} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          loading={formik.isSubmitting}
          loadingIndicator='Submitting..'
          sx={{ mt: 3, mb: 2 }}>
          Update
        </Button>
      </form>
    </Box>
  );
};

export default TaskDrawer;
