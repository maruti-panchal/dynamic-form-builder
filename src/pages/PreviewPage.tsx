import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { RootState } from '../redux/store';
import { loadFormForPreview } from '../redux/formSlice';
import { getSavedForms } from '../services/localStorageService';
import FormPreviewer from '../components/FormPreviewer';

const PreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const formSchema = useSelector((state: RootState) => state.form.currentForm);

  useEffect(() => {
    const savedForms = getSavedForms();
    const formToLoad = savedForms.find(f => f.id === id);
    if (formToLoad) {
      dispatch(loadFormForPreview(formToLoad));
    }
  }, [id, dispatch]);

  if (!formSchema || formSchema.id !== id) {
    return <Typography>Loading or form not found...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Preview: {formSchema.name}
      </Typography>
      <FormPreviewer formSchema={formSchema} />
    </Box>
  );
};

export default PreviewPage;