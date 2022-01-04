import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import React, { useEffect, useRef } from 'react';
import PersonService from '../../../api/PersonService';
import { object, string } from 'yup';

const VALIDATION = object().shape({
  name: string().required('Required'),
});

const INITIAL_VALUES = {
  id: undefined,
  name: '',
};

export default function PersonDialog(props) {
  const service = new PersonService();

  const formikRef = useRef();

  const { onClose, open, itemToEdit } = props;

  useEffect(() => {
    if (itemToEdit && itemToEdit.id) {
      loadItem();
    }
  }, [itemToEdit]);

  const loadItem = async () => {
    await service
      .one(itemToEdit.id)
      .then(response => {
        const data = response.data || {};
        if (formikRef.current) {
          const fields = Object.keys(INITIAL_VALUES);
          fields.forEach(field => {
            if (data[field]) {
              formikRef.current.setFieldValue(field, data[field]);
            }
          });
        }
      });

  };

  const handleSubmit = async (values, { setSubmitting }) => {
    await service
      .save(values)
      .then(() => {
        handleClose();
      })
      .catch(e => setSubmitting(false));
  };

  const handleClose = (e) => {
    onClose(e);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="person-dialog"
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
              {formik.values?.id ? 'Editing' : 'New'} person
            </DialogTitle>
            <DialogContent dividers={true}>
              
              <Field
                component={TextField}
                name="name"
                label="Name"
                fullWidth
              />

            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                onClick={handleClose}>
                Cancel
              </Button>
              <Button
                color="secondary"
                variant="contained"
                type="submit">
                Save
              </Button>
            </DialogActions>

          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
