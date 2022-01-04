import { Add, Delete, PersonAdd } from "@mui/icons-material";
import { CircularProgress, Divider, Fab, IconButton, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PersonService from '../../api/PersonService';
import ContactDialog from "./dialog/ContactDialog";
import PersonDialog from './dialog/PersonDialog';

export default function Person() {
  const service = new PersonService();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [openContacts, setOpenContacts] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);

    await service
      .find()
      .then(response => {
        setItems(response.data);
      });

    setLoading(false);
  };

  const handleRemove = async (item) => {

    await service
      .remove(item.id)
      .then(() => {
        loadItems();
      })
      .catch(err => {
        console.log(err);
      });

  };

  const handleOpen = (item) => {
    setItemToEdit(item);
    setOpen(true);
  };

  const handleClose = () => {
    setItemToEdit({});
    setOpen(false);
    loadItems();
  };

  const handleOpenContacts = (item) => {
    setItemToEdit(item);
    setOpenContacts(true);
  };

  const handleCloseContacts = () => {
    setItemToEdit({});
    setOpenContacts(false);
    loadItems();
  };

  return (
    <div className="full">
      <Typography variant="h5" p={2}>
        Persons
      </Typography>

      <Divider />

      {loading && <CircularProgress />}
      {(!loading && items.length > 0) &&
        <>
          <List sx={{ width: '100%', maxWidth: 560, margin: 'auto' }}>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <ListItem
                    style={{ paddingRight: '100px' }}
                    secondaryAction={
                      <div style={{ width: '80px' }}>
                        <Tooltip title="Contacts">
                          <IconButton edge="end" aria-label="edit" onClick={() => handleOpenContacts(item)}>
                            <PersonAdd />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item)} style={{ float: 'right' }}>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </div>
                    }
                  >
                    <Tooltip title="Edit">
                      <ListItemButton onClick={() => handleOpen(item)}>
                        <ListItemText primary={item.name} />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        </>
      }

      {(!loading && !items.length) &&
        <Typography component="p" m={2} style={{ width: '100%', textAlign: 'center' }}>
          No items found
        </Typography>
      }

      <Tooltip title="Add">
        <Fab className="floatButton" color="primary" aria-label="add" onClick={() => handleOpen()}>
          <Add />
        </Fab>
      </Tooltip>

      <PersonDialog onClose={handleClose} open={open} itemToEdit={itemToEdit} />

      <ContactDialog onClose={handleCloseContacts} open={openContacts} itemToEdit={itemToEdit} />

    </div>
  );
}