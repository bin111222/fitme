import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [appointments, setAppointments] = useState([
    {
      time: '09:00',
      clientName: 'John Doe',
      type: 'Personal Training',
      duration: '60 min',
    },
    {
      time: '11:00',
      clientName: 'Jane Smith',
      type: 'Fitness Assessment',
      duration: '45 min',
    },
    // Add more appointments as needed
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Fetch appointments for the selected date
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Schedule
      </Typography>

      <Grid container spacing={3}>
        {/* Date Picker */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointments List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedDate.format('dddd, MMMM D, YYYY')}
              </Typography>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    sx={{ mb: 2, '&:last-child': { mb: 0 } }}
                  >
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={2}>
                          <Typography variant="h6">{appointment.time}</Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="subtitle1">
                            {appointment.clientName}
                          </Typography>
                          <Typography color="textSecondary">
                            {appointment.type} • {appointment.duration}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography color="textSecondary" align="center">
                  No appointments scheduled for this day
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Appointment Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary">
          Add Appointment
        </Button>
      </Box>
    </Container>
  );
};

export default Schedule;
