import { Check, Delete } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Fab, FormControl, FormControlLabel, FormLabel, IconButton, List, ListItem, ListItemButton, ListItemText, Radio, RadioGroup } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useEffect, useRef, useState } from 'react';
import { object, string } from 'yup';
import ContactService from '../../../api/ContactService';
import { ContactType, getDescription } from "../../enums/ContactType";

const VALIDATION = object().shape({
  type: string().required('Required'),
  value: string().required('Required')
    .when('type', {
      is: '2',
      then: string().email('Invalid email address'),
    }),
});

const INITIAL_VALUES = {
  id: undefined,
  type: ContactType.PHONE,
  value: '',
  person: {}
};

export default function ContactDialog(props) {
  const service = new ContactService();

  const formikRef = useRef();
  const [items, setItems] = useState([]);

  const { onClose, open, itemToEdit } = props;

  useEffect(() => {
    if (itemToEdit && itemToEdit.id) {
      loadItem();
    }
  }, [itemToEdit]);

  const loadItem = async () => {
    await service
      .findByPersonId(itemToEdit.id)
      .then(response => {
        setItems(response.data);
      });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    values.person = itemToEdit;
    await service
      .save(values)
      .then(() => {
        loadItem();
        resetForm();
      })
      .catch(e => setSubmitting(false));
  };

  const handleRemove = async (item) => {

    await service
      .remove(item.id)
      .then(() => {
        loadItem();
      })
      .catch(err => {
        console.log(err);
      });

  };

  const handleEdit = async (item) => {

    if (formikRef.current) {
      const fields = Object.keys(INITIAL_VALUES);
      fields.forEach(field => {
        if (item[field]) {
          formikRef.current.setFieldValue(field, item[field]);
        }
      });
    }

  };

  const handleClose = (e) => {
    onClose(e);
  };

  const handleChangeRadio = (e) => {
    if (formikRef.current) {
      formikRef.current.setFieldValue('type', e.target.value);
    }
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="contact-dialog"
      open={open}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper">
      <Formik initialValues={INITIAL_VALUES}
        validationSchema={VALIDATION}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        {(formik) => (
          <Form noValidate>

            <DialogTitle id="form-dialog-title">
              {itemToEdit?.name}'s contacts
            </DialogTitle>
            <DialogContent dividers={true}>

              <FormControl component="fieldset"
                style={{ width: '100%' }}>
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="type"
                  defaultValue="1"
                  name="radio-buttons-group"
                  value={formik.values.type}
                  onChange={handleChangeRadio}
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Phone" />
                  <FormControlLabel value="2" control={<Radio />} label="Email" />
                  <FormControlLabel value="3" control={<Radio />} label="WhatsApp" />
                </RadioGroup>
              </FormControl>

              <br /><br />

              <Field
                component={TextField}
                name="value"
                label={getDescription(formik.values.type)}
                fullWidth
                style={{ maxWidth: 'calc(100% - 64px)' }}
              />
              <Fab color="secondary" aria-label="add"
                type="submit"
                style={{ marginLeft: 8 }}>
                <Check />
              </Fab>

              <br /><br />

              <Divider />

              {items.length &&
                <List sx={{ width: '100%' }}>
                  {items.map((item) => {
                    return (
                      <div key={item.id}>
                        <ListItem
                          dense
                          secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(item)}>
                              <Delete />
                            </IconButton>
                          }
                        >
                          <ListItemButton onClick={() => handleEdit(item)}>
                            <ListItemText primary={item.value} secondary={getDescription(item.type)} />
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                      </div>
                    );
                  })}
                </List>
              }

            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                onClick={handleClose}>
                Close
              </Button>
            </DialogActions>

          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
