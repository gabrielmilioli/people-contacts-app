import { Add, Delete, PersonAdd } from "@mui/icons-material";
import { CircularProgress, Divider, Fab, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
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
      {(!loading && items.length) &&
        <>
          <List sx={{ width: '100%', maxWidth: 560, margin: 'auto' }}>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <ListItem
                    secondaryAction={
                      <>
                      <IconButton edge="end" aria-label="edit" onClick={() => handleOpenContacts(item)}>
                        <PersonAdd />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item)}>
                        <Delete />
                      </IconButton>
                      </>
                    }
                  >
                    <ListItemButton onClick={() => handleOpen(item)}>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>

          <Fab className="floatButton" color="primary" aria-label="add" onClick={() => handleOpen()}>
            <Add />
          </Fab>

          <PersonDialog onClose={handleClose} open={open} itemToEdit={itemToEdit} />
          
          <ContactDialog onClose={handleCloseContacts} open={openContacts} itemToEdit={itemToEdit} />
        </>
      }
      {(!loading && !items.length) &&
        <Typography variant="body" m={2} style={{ width: '100%', margin: 'auto' }}>
          No items found
        </Typography>
      }

    </div>
  );
}