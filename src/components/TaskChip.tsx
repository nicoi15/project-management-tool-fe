import Chip from '@mui/material/Chip';
import React from 'react';
import { Status, Task } from '../constants/task.model';

interface Props {
  task: Task;
  onTaskClick: (task: Task) => void;
}

const TaskChip = ({ task, onTaskClick }: Props) => {
  const handleClick = () => {
    onTaskClick(task);
  };

  return (
    <Chip
      label={task.name}
      color={
        task.status === Status.COMPLETED
          ? 'success'
          : task.status === Status.IN_PROGRESS
          ? 'primary'
          : 'secondary'
      }
      size='small'
      sx={{ marginBottom: '5px' }}
      onClick={handleClick}
    />
  );
};

export default TaskChip;
