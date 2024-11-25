import { useState, useEffect } from 'react';
import {
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import api from '../../services/api';

const ClientSelect = ({ value, onChange, error }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchClients = async () => {
      if (user?.role === 'trainer') {
        try {
          const response = await api.get('/api/trainers/clients');
          setClients(response.data);
        } catch (error) {
          console.error('Error fetching clients:', error);
          setClients([]);
        }
      }
      setLoading(false);
    };

    fetchClients();
  }, [user?.role]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      options={clients}
      getOptionLabel={(option) => 
        option ? `${option.profile?.firstName || ''} ${option.profile?.lastName || ''}`.trim() : ''
      }
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Client"
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default ClientSelect;