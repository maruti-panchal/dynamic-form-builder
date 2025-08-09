import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addField, resetCurrentForm } from '../redux/formSlice';
import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Slide,
} from '@mui/material';
import FieldConfig from '../components/FieldConfig';
import FormPreviewer from '../components/FormPreviewer';
import { saveForm } from '../services/localStorageService';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

const CreateFormPage = () => {
  const dispatch = useDispatch();
  const currentForm = useSelector((state: RootState) => state.form.currentForm);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleFieldClick = (id: string) => {
    setSelectedFieldId(id);
  };

  const handleCloseFieldConfig = () => {
    setSelectedFieldId(null);
  };

  const handleSaveForm = () => {
    if (formName.trim() === '') {
      alert('Form name is required.');
      return;
    }
    const formToSave = { ...currentForm, id: nanoid(), name: formName, createdAt: Date.now() };
    saveForm(formToSave);
    setSaveDialogOpen(false);
    dispatch(resetCurrentForm());
    navigate('/myforms');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Form Builder</Typography>
      </Grid>
      {/* The field creation panel will take up full width on small screens and 1/3 on large screens */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>Add New Field</Typography>
          {['text', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date'].map((type) => (
            <Button
              key={type}
              variant="outlined"
              fullWidth
              sx={{ mb: 1 }}
              onClick={() => dispatch(addField({ type: type as any }))}
            >
              Add {type} Field
            </Button>
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setSaveDialogOpen(true)}
          >
            Save Form
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setIsPreviewOpen(true)}
          >
            Preview Form
          </Button>
        </Paper>
      </Grid>
      {/* The field list panel will take up full width on small screens and 2/3 on large screens */}
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" mb={2}>Current Form Fields</Typography>
          {currentForm.fields.length === 0 ? (
            <Typography>Start by adding fields from the left.</Typography>
          ) : (
            currentForm.fields.map((field) => (
              <Box
                key={field.id}
                sx={{
                  p: 1.5,
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  mb: 1,
                  cursor: 'pointer',
                  bgcolor: selectedFieldId === field.id ? '#e3f2fd' : 'inherit',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                  },
                }}
                onClick={() => handleFieldClick(field.id)}
              >
                {field.label} ({field.type})
              </Box>
            ))
          )}
        </Paper>
      </Grid>

      {/* Dialog for Field Configuration */}
      <Dialog
        fullScreen={fullScreen}
        open={!!selectedFieldId}
        onClose={handleCloseFieldConfig}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Slide}
      >
        <FieldConfig fieldId={selectedFieldId} onClose={handleCloseFieldConfig} />
      </Dialog>
      
      {/* Dialog for Saving the form */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)} fullScreen={fullScreen}>
        <DialogTitle>Save Form</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Form Name"
            type="text"
            fullWidth
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveForm}>Save</Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog for Form Preview */}
      <Dialog
        fullScreen={fullScreen}
        open={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Slide}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Live Preview</Typography>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {currentForm.fields.length > 0 ? (
            <FormPreviewer formSchema={currentForm} />
          ) : (
            <Typography>Add some fields to see a preview!</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
};

export default CreateFormPage;