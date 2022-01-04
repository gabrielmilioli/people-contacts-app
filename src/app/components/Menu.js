import Person from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClippedDrawer() {
  const navigate = useNavigate();

  const handleGoTo = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
    >
      <Box sx={{ overflow: 'auto' }} style={{ width: 240 }}>
        <List>
          <ListItem button onClick={() => handleGoTo('/person')}>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Person" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
