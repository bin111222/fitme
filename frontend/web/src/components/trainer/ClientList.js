import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Chip,
  Button,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const ClientList = ({ clients, onView, onEdit, onDelete }) => {
  return (
    <Grid container spacing={3}>
      {clients.map((client) => (
        <Grid item xs={12} md={6} lg={4} key={client._id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={client.profile.avatar}
                  sx={{ width: 60, height: 60, mr: 2 }}
                >
                  {client.profile.firstName[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {client.profile.firstName} {client.profile.lastName}
                  </Typography>
                  <Typography color="textSecondary">{client.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Chip
                  label={`${client.workouts?.length || 0} Workouts`}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={`${client.nutritionPlans?.length || 0} Nutrition Plans`}
                  size="small"
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  startIcon={<ViewIcon />}
                  size="small"
                  onClick={() => onView(client)}
                >
                  View Details
                </Button>
                <Box>
                  <IconButton size="small" onClick={() => onEdit(client)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => onDelete(client)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ClientList; 