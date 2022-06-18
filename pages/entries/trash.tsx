import React from 'react';
import { NextPage } from 'next';
import { Layout } from '../../components/layouts';
import { Card, CardHeader, Grid } from '@mui/material';
import { EntryList } from '../../components/ui';

export const DeletedEntriesPage: NextPage = () => {
  return (
    <Layout title='Open Jira'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} >
            <Card sx={{ height: 'calc(100vh - 100px)' }}>
                <CardHeader title='Trashed' />
                <EntryList status='deleted' />
            </Card>
          </Grid>
        </Grid>
    </Layout>
  )
}

export default DeletedEntriesPage;