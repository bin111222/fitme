import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Box,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import AddClientDialog from '../../components/trainer/AddClientDialog';
import { fetchClients } from '../../store/slices/trainerSlice';

const Clients = () => {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.trainer);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleAddClient = () => {
    setOpenAddDialog(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Clients
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleAddClient}
        >
          Add New Client
        </Button>
      </Box>

      <Grid container spacing={3}>
        {clients?.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client._id}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={client.avatar}
                    alt={`${client.profile.firstName} ${client.profile.lastName}`}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">{`${client.profile.firstName} ${client.profile.lastName}`}</Typography>
                    <Typography color="textSecondary">{client.email}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary" paragraph>
                  Member since: {new Date(client.joinDate).toLocaleDateString()}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {/* Handle view details */}}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => {/* Handle manage plans */}}
                  >
                    Manage Plans
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <AddClientDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
      />
    </Container>
  );
};

export default Clients;
