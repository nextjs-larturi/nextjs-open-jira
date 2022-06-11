import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {

  const [ isAdding, setIsAdding ] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const [ touched, setTouched ] = useState(false);

  const onTextFieldChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onSave = () => {
      if(inputValue.length === 0) return;
      console.log({inputValue});
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>

        {
            isAdding ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop: '1rem', marginBottom: '1rem' }}  
                        placeholder='Nueva Tarea'
                        autoFocus
                        multiline
                        label='Nueva Tarea'
                        helperText={ inputValue.length <= 0 && touched && 'Ingrese una Tarea' }
                        error={ inputValue.length <= 0 && touched }
                        value={ inputValue }
                        onChange={ onTextFieldChanged }
                        onBlur={ () => setTouched(true) }
                    /> 

                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant='outlined'
                            color='primary'
                            endIcon={<CancelOutlinedIcon />}
                            onClick = {() => setIsAdding(false)}
                        >
                            Cancelar
                        </Button>  
                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={<SaveOutlinedIcon />}
                            onClick = { onSave }
                        >
                            Guardar
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Button
                        startIcon={<AddCircleOutlineOutlinedIcon/>}
                        fullWidth
                        variant='outlined'
                        sx={{ padding: '0.5rem' }}
                        onClick = {() => setIsAdding(true)}
                    >
                        Nueva Tarea
                    </Button>
                </>
            )
        }
        
    </Box>
  )
}
