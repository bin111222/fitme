import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  FitnessCenter as WorkoutIcon,
  Restaurant as NutritionIcon,
} from '@mui/icons-material';

const MySchedule = () => {
  const [selectedDay, setSelectedDay] = useState(0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Sample schedule data - replace with actual data from your backend
  const schedule = {
    Monday: [
      {
        type: 'workout',
        time: '07:00',
        title: 'Morning Strength Training',
        duration: '60 min',
        details: 'Upper body focus',
      },
      {
        type: 'nutrition',
        time: '08:30',
        title: 'Post-Workout Meal',
        details: 'High protein breakfast',
      },
    ],
    Tuesday: [
      {
        type: 'workout',
        time: '18:00',
        title: 'Cardio Session',
        duration: '45 min',
        details: 'HIIT training',
      },
    ],
    Wednesday: [
      {
        type: 'workout',
        time: '07:00',
        title: 'Lower Body Workout',
        duration: '60 min',
        details: 'Leg day',
      },
      {
        type: 'nutrition',
        time: '13:00',
        title: 'Lunch',
        details: 'Balanced meal with complex carbs',
      },
    ],
    // Add more days as needed
  };

  const handleDayChange = (event, newValue) => {
    setSelectedDay(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Schedule
      </Typography>

      {/* Day selector */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedDay}
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="schedule days"
        >
          {days.map((day, index) => (
            <Tab key={day} label={day} id={`schedule-tab-${index}`} />
          ))}
        </Tabs>
      </Box>

      {/* Schedule content */}
      <Grid container spacing={3}>
        {schedule[days[selectedDay]]?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Chip
                      icon={item.type === 'workout' ? <WorkoutIcon /> : <NutritionIcon />}
                      label={item.type === 'workout' ? 'Workout' : 'Nutrition'}
                      color={item.type === 'workout' ? 'primary' : 'secondary'}
                    />
                  </Grid>
                  <Grid item xs>
                    <Box>
                      <Typography variant="h6">
                        {item.time} - {item.title}
                      </Typography>
                      {item.duration && (
                        <Typography color="textSecondary" gutterBottom>
                          Duration: {item.duration}
                        </Typography>
                      )}
                      <Typography variant="body2">{item.details}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {(!schedule[days[selectedDay]] || schedule[days[selectedDay]].length === 0) && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="body1" color="textSecondary" align="center">
                  No activities scheduled for this day
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MySchedule;
