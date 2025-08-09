import { FormSchema } from '../types/formTypes';

const FORM_STORAGE_KEY = 'form_builder_forms';

export const getSavedForms = (): FormSchema[] => {
  try {
    const forms = localStorage.getItem(FORM_STORAGE_KEY);
    return forms ? JSON.parse(forms) : [];
  } catch (error) {
    console.error('Failed to get forms from local storage', error);
    return [];
  }
};

export const saveForm = (form: FormSchema) => {
  try {
    const forms = getSavedForms();
    forms.push(form);
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(forms));
  } catch (error) {
    console.error('Failed to save form to local storage', error);
  }
};

// NEW: Function to delete a form
export const deleteForm = (formId: string) => {
  try {
    const forms = getSavedForms();
    const updatedForms = forms.filter(form => form.id !== formId);
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(updatedForms));
  } catch (error) {
    console.error('Failed to delete form from local storage', error);
  }
};