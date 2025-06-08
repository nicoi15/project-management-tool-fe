'use client';

import {
  Container,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getTasks } from '../../services/actions/task-service';
import { useQuery } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import TaskDate from '../../components/TaskDate';
import TaskDateSkeleton from '../../components/TaskDateSkeleton';
import TaskDrawer from '../../components/TaskDrawer';
import { Task, TaskQueryParams } from '../../constants/task.model';
import { getProjects } from '../../services/actions/project-service';
import useProjectStore from '../../zustand/projectStore';
import { getUsers } from '../../services/actions/user-service';
import useUsersStore from '../../zustand/usersStore';
import { getFormattedDate } from '../../utils/date-utils';

const Overview = () => {
  const { setProjects } = useProjectStore();
  const { setUsers } = useUsersStore();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [dueDateFrom, setDueDateFrom] = useState<Dayjs | null>(dayjs());
  const [dueDateTo, setDueDateTo] = useState<Dayjs | null>(dayjs());
  const [params, setParams] = useState<TaskQueryParams>({
    dueDateFrom: dayjs().format('YYYY-MM-DD'),
    dueDateTo: dayjs().format('YYYY-MM-DD'),
  });
  const [days, setDays] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [priority, setPriority] = useState<number>(1);

  const { isLoading, data: tasks } = useQuery({
    queryKey: ['tasks', JSON.stringify(params)],
    queryFn: async () => await getTasks(params),
  });

  const { isLoading: isProjectsLoading, data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => await getProjects(),
  });

  const { isLoading: isUsersLoading, data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await getUsers(),
  });

  const onDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    setDueDateFrom(date);
    setDueDateTo(date);
    if (date !== null) {
      setParams({
        dueDateFrom: getFormattedDate(date),
        dueDateTo: getFormattedDate(date),
      });
    }
  };

  const onDateFromChange = (date: Dayjs | null) => {
    setSelectedDate(null);
    if (date?.isAfter(dueDateTo)) {
      setDueDateTo(null);
    } else {
      setDueDateFrom(date);
      if (date !== null) {
        setParams({
          ...params,
          dueDateFrom: getFormattedDate(date),
        });
      }
    }
  };

  const onDateToChange = (date: Dayjs | null) => {
    setSelectedDate(null);
    if (date?.isBefore(dueDateFrom)) {
      setDueDateFrom(null);
    } else {
      setDueDateTo(date);
      if (date !== null) {
        setParams({
          ...params,
          dueDateTo: getFormattedDate(date),
        });
      }
    }
  };

  const handleOnTaskClick = (task: Task) => {
    setOpen(true);
    setSelectedTask(task);
  };

  useEffect(() => {
    if (dueDateFrom === null || dueDateTo === null) {
      return;
    }

    const days = [];

    let currentDate = dueDateFrom;

    while (
      currentDate.isBefore(dueDateTo) ||
      currentDate.isSame(dueDateTo, 'day')
    ) {
      days.push(currentDate.format('YYYY-MM-DD')); // Format as needed
      currentDate = currentDate.add(1, 'day'); // Add 1 day to the current date
    }

    setDays(days);
  }, [dueDateFrom, dueDateTo]);

  useEffect(() => {
    if (projects) {
      setProjects(projects);
    }
  }, [projects]);

  useEffect(() => {
    if (users) {
      setUsers(users);
    }
  }, [users]);

  return (
    <Container
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'start',
        display: 'flex',
      }}>
      <Stack
        spacing={2}
        sx={{
          width: '100%',
          flexWrap: 'wrap',
        }}
        maxWidth='320px'
        margin='1rem'>
        <DateCalendar onChange={onDateChange} value={selectedDate} />
        <Stack spacing={2} direction='row'>
          <DatePicker
            label='From'
            sx={{ width: '150px' }}
            value={dueDateFrom}
            onChange={onDateFromChange}
          />
          <DatePicker
            label='To'
            sx={{ width: '150px' }}
            value={dueDateTo}
            onChange={onDateToChange}
          />
        </Stack>
        <FormControl fullWidth sx={{ marginTop: '1rem' }}>
          <InputLabel>Priority</InputLabel>
          <Select
            id='priority'
            name='priority'
            value={priority}
            label='Priority'
            onChange={(event) => setPriority(event.target.value)}>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Stack
        spacing={2}
        direction='row'
        useFlexGap
        sx={{ width: '100%', flexWrap: 'wrap' }}
        margin='1rem'>
        {}
        {isLoading || isProjectsLoading || isUsersLoading ? (
          <TaskDateSkeleton />
        ) : (
          days?.map((date, index) => {
            const filteredTasks =
              tasks?.filter((task) => task.dueDate === date) || [];
            return (
              <TaskDate
                key={`${date}-${index}`}
                date={date}
                tasks={filteredTasks}
                onTaskClick={handleOnTaskClick}
              />
            );
          })
        )}
      </Stack>
      <React.Fragment key='right'>
        <Drawer anchor='right' onClose={() => setOpen(false)} open={open}>
          {selectedTask && (
            <TaskDrawer task={selectedTask} onClose={() => setOpen(false)} />
          )}
        </Drawer>
      </React.Fragment>
    </Container>
  );
};

export default Overview;
