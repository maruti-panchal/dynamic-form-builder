import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addField, resetCurrentForm, reorderFields, removeField } from '../redux/formSlice';
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
  IconButton,
} from '@mui/material';
import { DragIndicator as DragIndicatorIcon, Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';
import FieldConfig from '../components/FieldConfig';
import FormPreviewer from '../components/FormPreviewer';
import { saveForm } from '../services/localStorageService';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    // Reordering fields within the "Current Form Fields" list
    if (source.droppableId === 'form-fields' && destination.droppableId === 'form-fields') {
      dispatch(reorderFields({ startIndex: source.index, endIndex: destination.index }));
    }

    // Dragged a field from the "Add New Field" panel to the form
    if (source.droppableId === 'field-types' && destination.droppableId === 'form-fields') {
        const type = result.draggableId as any;
        dispatch(addField({ type }));
        return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Form Builder</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Add New Field</Typography>
            <Droppable droppableId="field-types">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {['text', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date'].map((type, index) => (
                    <Draggable key={type} draggableId={type} index={index}>
                      {(provided) => (
                        <Button
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={type}
                          variant="outlined"
                          fullWidth
                          sx={{ mb: 1, cursor: 'grab', justifyContent: 'space-between' }}
                          onClick={() => dispatch(addField({ type: type as any }))}
                        >
                          <Box>{`Add ${type} Field`}</Box>
                          <Box sx={{ cursor: 'grab' }}>
                            <DragIndicatorIcon color="action" />
                          </Box>
                        </Button>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
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
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" mb={2}>Current Form Fields</Typography>
            {currentForm.fields.length === 0 ? (
              <Typography>Drag and drop fields from the left to start building your form.</Typography>
            ) : (
              <Droppable droppableId="form-fields">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {currentForm.fields.map((field, index) => (
                      <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided, snapshot) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            onClick={() => handleFieldClick(field.id)}
                            sx={{
                              p: 1.5,
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              mb: 1,
                              bgcolor: snapshot.isDragging ? 'lightgray' : (selectedFieldId === field.id ? '#e3f2fd' : 'inherit'),
                              transition: 'background-color 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              '&:hover': {
                                bgcolor: '#f5f5f5',
                              },
                            }}
                          >
                            <Box sx={{ flexGrow: 1 }}>
                                {field.label} ({field.type})
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevents the field click from firing
                                        dispatch(removeField(field.id));
                                    }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                <Box {...provided.dragHandleProps} sx={{ cursor: 'grab' }}>
                                    <DragIndicatorIcon color="action" />
                                </Box>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </Paper>
        </Grid>

        {/* Dialogs for Field Configuration, Save Form, and Preview */}
        <Dialog
          fullScreen={fullScreen}
          open={!!selectedFieldId}
          onClose={handleCloseFieldConfig}
          fullWidth
          maxWidth="sm"
          TransitionComponent={Slide}
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Configure Field</Typography>
              <IconButton onClick={handleCloseFieldConfig} color="error">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <FieldConfig fieldId={selectedFieldId} onClose={handleCloseFieldConfig} />
          </DialogContent>
        </Dialog>
        
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
              <IconButton onClick={() => setIsPreviewOpen(false)} color="error">
                <CloseIcon />
              </IconButton>
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
    </DragDropContext>
  );
};

export default CreateFormPage;


