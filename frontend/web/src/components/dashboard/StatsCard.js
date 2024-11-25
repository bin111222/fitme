import { Paper, Typography, Box } from '@mui/material';

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: color || 'background.paper',
      }}
    >
      <Box>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mt: 1 }}>
          {value}
        </Typography>
      </Box>
      <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
    </Paper>
  );
};

export default StatsCard; 