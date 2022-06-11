import { FC, useContext, useMemo } from 'react';
import { List, Paper} from '@mui/material';
import { EntryStatus} from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])

  return (
    <div>
        <Paper sx={{ 
            height: 'calc(100vh - 25px)', 
            overflow: 'scroll',
            backgroundColor: 'transparent',
            padding: '1px 8px',
        }}>
            <List sx={{ opacity: 1 }}>
                {
                    entriesByStatus.map(entry => (
                        <EntryCard key={entry._id} entry={entry} />
                    ))
                }
            </List>
        </Paper>
    </div>
  )
}
