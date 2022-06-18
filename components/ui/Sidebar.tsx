import { useContext } from 'react';
import NextLink from 'next/link';
import { Box, Link, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography }  from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { UIContext } from '../../context/ui';

interface MenuItem {
   name: string;
   path: string;
}

const menuItems: MenuItem[] = [
    { name: 'Inbox', path: '/' },
    { name: 'Stats', path: '/stats' },
];

export const Sidebar = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);
    
  return (
    <Drawer
        anchor='left'
        open={sidemenuOpen}
        onClose={closeSideMenu}
    >
        <Box sx={{ width: 250 }}>
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant='h4' sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    margin: '10px 0 0 5px',
                }}>Menú</Typography>
            </Box>

            
                <List>
                    {
                        menuItems.map((item, index) => (
                            <NextLink href={item.path} passHref key={index}>
                                <ListItem button>
                                    <ListItemIcon>
                                        { index % 2 === 0 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon /> }
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                            </NextLink>
                        ))
                    }
                </List>
            
        </Box>
    </Drawer>
  )
}
