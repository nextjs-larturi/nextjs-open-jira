import React, { ChangeEvent, FC, useState, useMemo, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

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
import { Entry, EntryStatus } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed'];

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const router = useRouter(); 

  const { updateEntry } = useContext(EntriesContext);

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  }

  const onSave = () => {
    if(inputValue.trim().length === 0) return;

    const updatedEntry: Entry = {
        ...entry,
        status,
        description: inputValue,
    } as Entry;

    updateEntry(updatedEntry, true);
  }

  const onDelete = () => {
    const deletedEntry: Entry = {
        ...entry,
        description: inputValue,
        status: 'deleted',
    } as Entry;

    updateEntry(deletedEntry, true);
    router.push('/');
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

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{ marginTop: '2rem' }}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader 
                        title='Entrada'
                        subheader={dateFunctions.getFormatDistanceToNow(entry.createdAt)}
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
            }} onClick={onDelete}>
                <DeleteIcon />
            </IconButton>

        </Grid>
    </Layout>
  )
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntriesById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
};

export default EntryPage;