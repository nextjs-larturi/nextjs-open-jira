import React, { ChangeEvent, FC, useState } from 'react';
import { GetServerSideProps } from 'next';

import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Grid, 
    IconButton, 
    Radio, 
    RadioGroup, 
    TextField 
} from '@mui/material';

import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import DeleteIcon from '@mui/icons-material/Delete';

import { Layout } from '../../components/layouts';
import { EntryStatus } from '../../interfaces';
import { useMemo } from 'react';

import { isValidObjectId } from 'mongoose';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];

interface Props {

}

const humanizeStatus = (status: EntryStatus) => {
    switch (status) {
        case 'pending':
            return 'Pending';
        case 'in-progress':
            return 'In Progress';
        case 'completed':
            return 'Completed';
        default:
            return 'Unknown';
    }
}

export const EntryPage: FC = () => {

  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<EntryStatus>('pending');
  const [touched, setTouched] = useState(false);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {
    if(inputValue.length === 0) return;
    setTouched(false);
    setInputValue('');
  }

  return (
    <Layout title='....'>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: '2rem' }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader 
                        title={`Titulo: ${inputValue}`}
                        subheader={`Creada hace 12m`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{ marginBottom: '1rem' }}
                            fullWidth
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Editar Entrada'
                            value={inputValue}
                            onChange={onInputValueChanged}
                            helperText={isNotValid && 'Por favor, ingresa un titulo para la tarea'}
                            onBlur={() => setTouched(true)}
                            error={isNotValid}
                        />

                        <FormControl>
                            <FormLabel>Estado</FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    validStatus.map(option => (
                                        <FormControlLabel 
                                            key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={humanizeStatus(option)}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={<SaveSharpIcon />}
                            variant='contained'
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <= 0}
                        >
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'red'
            }}>
                <DeleteIcon />
            </IconButton>

        </Grid>
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    if(!isValidObjectId(id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            id
        }
    }
};

export default EntryPage;