import React from 'react';
import { Task } from '../constants/task.model';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TaskChip from './TaskChip';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import dayjs from 'dayjs';

interface Props {
  date: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const TaskDate = ({ date, tasks = [], onTaskClick }: Props) => {
  return (
    <Card
      sx={{
        width: 200,
        maxWidth: 200,
        height: 200,
        maxHeight: 200,
        overflow: 'hidden',
      }}>
      <CardContent>
        <Typography
          variant='h6'
          component='div'
          sx={{ marginBottom: '1rem' }}
          noWrap>
          {dayjs(date).format('DD MMM YYYY')}
        </Typography>
        <Stack sx={{ height: '125px', overflowY: 'auto' }}>
          {tasks.length === 0 && (
            <Stack direction='row' spacing={1}>
              <RemoveCircleIcon color='warning' />
              <Typography>No data</Typography>
            </Stack>
          )}
          {tasks.length > 0 &&
            tasks.map((task, index) => (
              <TaskChip
                key={`${date}-${task.id}-${index}`}
                task={task}
                onTaskClick={onTaskClick}
              />
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskDate;
