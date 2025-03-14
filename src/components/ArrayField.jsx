import React, { useState } from 'react';
import { 
  Box, 
  Chip, 
  TextField,
  Paper,
  Typography,
  Button,
  Stack
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Componente para manejar campos tipo array (como mentores, materiales, premios)
const ArrayField = ({ label, values = [], onChange, helperText }) => {
  const [inputValue, setInputValue] = useState('');

  // Añadir un nuevo elemento
  const handleAdd = () => {
    if (!inputValue.trim()) return;
    
    const newValues = [...values, inputValue.trim()];
    onChange(newValues);
    setInputValue('');
  };

  // Eliminar un elemento
  const handleDelete = (indexToDelete) => {
    const newValues = values.filter((_, index) => index !== indexToDelete);
    onChange(newValues);
  };

  // Añadir elemento al presionar Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="body2" gutterBottom>
        {label}
      </Typography>
      
      <Paper
        variant="outlined"
        sx={{ 
          p: 2, 
          mb: 1,
          minHeight: 56,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          alignItems: 'flex-start',
          alignContent: 'flex-start'
        }}
      >
        {values.map((value, index) => (
          <Chip
            key={index}
            label={value}
            onDelete={() => handleDelete(index)}
            sx={{ m: 0.5 }}
          />
        ))}
      </Paper>
      
      <Stack direction="row" spacing={1}>
        <TextField
          variant="outlined"
          placeholder={`Añadir ${label.toLowerCase()}`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
          fullWidth
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
          Añadir
        </Button>
      </Stack>
      
      {helperText && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default ArrayField;