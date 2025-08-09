import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setSavedForms } from '../redux/formSlice';
import { getSavedForms, deleteForm as deleteFormFromLocalStorage } from '../services/localStorageService';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Fade,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { FormSchema } from '../types/formTypes';
import FormPreviewer from '../components/FormPreviewer';

// Define a custom transition component
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyFormsPage = () => {
  const dispatch = useDispatch();
  const savedForms = useSelector((state: RootState) => state.form.savedForms);

  // State for delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [formToDeleteId, setFormToDeleteId] = useState<string | null>(null);

  // State for form preview modal
  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormSchema | null>(null);

  useEffect(() => {
    const forms = getSavedForms();
    dispatch(setSavedForms(forms));
  }, [dispatch]);

  const handleFormClick = (form: FormSchema) => {
    setSelectedForm(form);
    setOpenPreviewModal(true);
  };

  const handleClosePreviewModal = () => {
    setOpenPreviewModal(false);
    setSelectedForm(null);
  };

  const handleDeleteClick = (e: React.MouseEvent, formId: string) => {
    e.stopPropagation(); // Prevents the card click event from firing
    setFormToDeleteId(formId);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (formToDeleteId) {
      deleteFormFromLocalStorage(formToDeleteId);
      const updatedForms = getSavedForms();
      dispatch(setSavedForms(updatedForms));
      setFormToDeleteId(null);
      setOpenDeleteDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setFormToDeleteId(null);
    setOpenDeleteDialog(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Forms
      </Typography>
      {savedForms.length === 0 ? (
        <Typography variant="body1">No forms saved yet. Go to "Create Form" to start.</Typography>
      ) : (
        <Grid container spacing={3}>
          {savedForms.map((form) => (
            <Grid item xs={12} sm={6} md={4} key={form.id}>
              <Fade in={true} timeout={500}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    position: 'relative',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleFormClick(form)} sx={{ flexGrow: 1 }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {form.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Created on: {format(new Date(form.createdAt), 'MMMM d, yyyy')}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Chip
                    label={`${form.fields.length} fields`}
                    size="small"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                  />
                  <IconButton
                    color="error"
                    onClick={(e) => handleDeleteClick(e, form.id)}
                    aria-label="delete"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this form? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Form Preview Modal */}
      <Dialog 
        open={openPreviewModal} 
        onClose={handleClosePreviewModal} 
        maxWidth="sm" 
        fullWidth 
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{selectedForm?.name}</Typography>
            <IconButton onClick={handleClosePreviewModal}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedForm && <FormPreviewer formSchema={selectedForm} />}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MyFormsPage;
