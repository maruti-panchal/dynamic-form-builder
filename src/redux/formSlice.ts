import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchema, Field, FieldType } from '../types/formTypes';
import { nanoid } from 'nanoid';

interface FormState {
  currentForm: FormSchema;
  savedForms: FormSchema[];
}

const initialState: FormState = {
  currentForm: {
    id: nanoid(),
    name: '',
    fields: [],
    createdAt: Date.now(),
  },
  savedForms: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    resetCurrentForm: (state) => {
      state.currentForm = {
        id: nanoid(),
        name: '',
        fields: [],
        createdAt: Date.now(),
      };
    },
    addField: (state, action: PayloadAction<{ type: FieldType }>) => {
      const newField: Field = {
        id: nanoid(),
        type: action.payload.type,
        label: `New ${action.payload.type} Field`,
        required: false,
      };
      state.currentForm.fields.push(newField);
    },
    updateField: (state, action: PayloadAction<Field>) => {
      const index = state.currentForm.fields.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.currentForm.fields[index] = action.payload;
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.currentForm.fields = state.currentForm.fields.filter(f => f.id !== action.payload);
    },
    setSavedForms: (state, action: PayloadAction<FormSchema[]>) => {
      state.savedForms = action.payload;
    },
    loadFormForPreview: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = action.payload;
    },
    // NEW: Reducer to reorder fields
    reorderFields: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
        const [reorderedItem] = state.currentForm.fields.splice(action.payload.startIndex, 1);
        state.currentForm.fields.splice(action.payload.endIndex, 0, reorderedItem);
    },
  },
});

export const {
  resetCurrentForm,
  addField,
  updateField,
  removeField,
  setSavedForms,
  loadFormForPreview,
  reorderFields, // Export the new reducer
} = formSlice.actions;

export default formSlice.reducer;