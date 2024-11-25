import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import ClientList from '../../components/trainer/ClientList';
import ClientProgress from '../../components/trainer/ClientProgress';
import { trainers as trainersApi } from '../../services/api';
import ClientForm from '../../components/trainer/ClientForm';

const TrainerDashboard = () => {
  const [tab, setTab] = useState(0);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await trainersApi.getClients();
      setClients(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setTab(1);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setOpenDialog(true);
  };

  const handleDeleteClient = async (client) => {
    if (window.confirm('Are you sure you want to remove this client?')) {
      try {
        await trainersApi.removeClient(client._id);
        fetchClients();
      } catch (error) {
        console.error('Error removing client:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Trainer Dashboard</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Add Client
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab label="Client List" />
          {selectedClient && <Tab label="Client Progress" />}
        </Tabs>
      </Box>

      {tab === 0 && (
        <ClientList
          clients={clients}
          onView={handleViewClient}
          onEdit={handleEditClient}
          onDelete={handleDeleteClient}
        />
      )}

      {tab === 1 && selectedClient && (
        <Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Progress for {selectedClient.profile.firstName}{' '}
            {selectedClient.profile.lastName}
          </Typography>
          <ClientProgress
            client={selectedClient}
            workouts={selectedClient.workouts || []}
            nutritionPlans={selectedClient.nutritionPlans || []}
          />
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedClient(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedClient ? 'Edit Client' : 'Add New Client'}
        </DialogTitle>
        <DialogContent>
          <ClientForm
            initialData={selectedClient}
            onSubmit={async (formData) => {
              try {
                if (selectedClient) {
                  await trainersApi.updateClient(selectedClient._id, formData);
                } else {
                  await trainersApi.addClient(formData);
                }
                setOpenDialog(false);
                setSelectedClient(null);
                fetchClients();
              } catch (error) {
                console.error('Error saving client:', error);
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default TrainerDashboard; 