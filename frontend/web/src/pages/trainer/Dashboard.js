import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { fetchClients } from '../../store/slices/trainerSlice';
import ClientForm from '../../components/clients/ClientForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.trainer);
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleAddClient = () => {
    setSelectedClient(null);
    setClientFormOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setClientFormOpen(true);
  };

  const handleCloseClientForm = () => {
    setClientFormOpen(false);
    setSelectedClient(null);
  };

  const DashboardCard = ({ title, children, action }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Trainer Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClient}
        >
          Add Client
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Clients Overview */}
        <Grid item xs={12} md={8}>
          <DashboardCard 
            title="Clients"
            action={
              <IconButton size="small" onClick={() => {/* TODO: View all clients */}}>
                <ViewIcon />
              </IconButton>
            }
          >
            {loading ? (
              <Typography>Loading clients...</Typography>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              <List>
                {clients?.map((client) => (
                  <ListItem key={client._id} divider>
                    <ListItemText
                      primary={`${client.profile.firstName} ${client.profile.lastName}`}
                      secondary={
                        <Box component="span">
                          <Typography component="span" variant="body2" color="textSecondary">
                            {client.email}
                          </Typography>
                          {client.profile.goals?.length > 0 && (
                            <Typography component="div" variant="body2" color="textSecondary" mt={0.5}>
                              Goals: {client.profile.goals.join(', ')}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton 
                        edge="end" 
                        aria-label="edit"
                        onClick={() => handleEditClient(client)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        edge="end" 
                        aria-label="assign"
                        onClick={() => {/* TODO: Assign workout/nutrition */}}
                      >
                        <AssignmentIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </DashboardCard>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={4}>
          <DashboardCard 
            title="Notifications" 
            action={
              <IconButton size="small" onClick={() => {/* TODO: View all notifications */}}>
                <NotificationsIcon />
              </IconButton>
            }
          >
            <List>
              {/* TODO: Add notifications */}
              <ListItem>
                <ListItemText
                  primary="No new notifications"
                  secondary="You're all caught up!"
                />
              </ListItem>
            </List>
          </DashboardCard>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">{clients?.length || 0}</Typography>
                <Typography variant="body2" color="textSecondary">Total Clients</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">0</Typography>
                <Typography variant="body2" color="textSecondary">Active Plans</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">0</Typography>
                <Typography variant="body2" color="textSecondary">Today's Sessions</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6">0</Typography>
                <Typography variant="body2" color="textSecondary">Pending Tasks</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ClientForm
        open={clientFormOpen}
        onClose={handleCloseClientForm}
        initialData={selectedClient}
      />
    </Box>
  );
};

export default Dashboard;
