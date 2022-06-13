import { FC, useContext, useMemo, DragEvent } from 'react';
import { List, Paper} from '@mui/material';
import { EntryStatus} from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries } = useContext(EntriesContext);
  const { isDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');
    console.log(id);
  };

  return (
    <div
        onDragOver={ allowDrop }
        onDrop={ onDropEntry }
        className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ 
            height: 'calc(100vh - 25px)', 
            overflow: 'scroll',
            backgroundColor: 'transparent',
            padding: '1px 8px',
        }}>
            <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .4s' }}>
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
