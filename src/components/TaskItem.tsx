import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import React from 'react';
import { Task } from '../constants/task.model';

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  return (
    <Card sx={{ width: 200, maxWidth: 200, overflow: 'hidden' }}>
      <CardContent>
        <Typography
          variant='h6'
          component='div'
          sx={{ marginBottom: '1rem' }}
          noWrap>
          {task.name}
        </Typography>
        <Typography variant='body2'>
          Due date
          <br />
          {task.dueDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Update</Button>
      </CardActions>
    </Card>
  );
};

export default TaskItem;
