// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import { updateField, removeField } from '../redux/formSlice';
// import {
//   Paper,
//   Box,
//   Typography,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Button,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   FormGroup,
//   IconButton,
//   Tooltip,
//   DialogContent,
//   DialogTitle,
//   Switch,
// } from '@mui/material';
// import { Add as AddIcon, Remove as RemoveIcon, Close as CloseIcon } from '@mui/icons-material';
// import { Field, ValidationRule } from '../types/formTypes';

// interface FieldConfigProps {
//   fieldId: string | null;
//   onClose: () => void;
// }

// const FieldConfig = ({ fieldId, onClose }: FieldConfigProps) => {
//   const dispatch = useDispatch();
//   const field = useSelector((state: RootState) =>
//     state.form.currentForm.fields.find((f) => f.id === fieldId)
//   );
//   const allFields = useSelector((state: RootState) => state.form.currentForm.fields);

//   const [fieldState, setFieldState] = useState<Field | null>(field || null);

//   useEffect(() => {
//     setFieldState(field || null);
//   }, [field]);

//   if (!fieldState) return null;

//   const handleUpdate = (updates: Partial<Field>) => {
//     if (fieldState) {
//       const updatedField = { ...fieldState, ...updates };
//       dispatch(updateField(updatedField));
//       setFieldState(updatedField);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
//     const { name, value, type, checked } = e.target as any;
//     if (type === 'checkbox' || type === 'radio') {
//       handleUpdate({ [name]: checked });
//     } else {
//       handleUpdate({ [name]: value });
//     }
//   };

//   const handleValidationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
    
//     const newRules: ValidationRule = { ...fieldState.validationRules };
//     const validationKey = name as keyof ValidationRule;

//     if (type === 'checkbox') {
//       if (checked) {
//         newRules[validationKey] = true as any;
//       } else {
//         delete newRules[validationKey];
//       }
//     } else {
//       newRules[validationKey] = (type === 'number' ? Number(value) : value) as any;
//     }
//     handleUpdate({ validationRules: newRules });
//   };

//   const handleOptionsChange = (index: number, value: string) => {
//     const newOptions = [...(fieldState.options || [])];
//     newOptions[index] = value;
//     handleUpdate({ options: newOptions });
//   };

//   const handleAddOption = () => {
//     const newOptions = [...(fieldState.options || [])];
//     newOptions.push('');
//     handleUpdate({ options: newOptions });
//   };

//   const handleRemoveOption = (index: number) => {
//     const newOptions = [...(fieldState.options || [])];
//     newOptions.splice(index, 1);
//     handleUpdate({ options: newOptions });
//   };

//   return (
//     <Box>
//       <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Typography variant="h6">Configure Field</Typography>
//         <IconButton onClick={onClose} color="error"> {/* Changed color to error */}
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent dividers>
//         <Box sx={{ p: 1 }}>
//           <TextField
//             label="Label"
//             name="label"
//             fullWidth
//             value={fieldState.label}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Default Value"
//             name="defaultValue"
//             fullWidth
//             value={fieldState.defaultValue || ''}
//             onChange={handleChange}
//             sx={{ mb: 2 }}
//           />
//           <FormControlLabel
//             control={<Switch checked={fieldState.required} name="required" onChange={handleChange} />}
//             label="Required"
//           />
          
//           {/* Validation Rules */}
//           <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
//             <Typography variant="subtitle1">Validation Rules</Typography>
//             <FormGroup>
//               <FormControlLabel
//                 control={<Checkbox checked={!!fieldState.validationRules?.notEmpty} name="notEmpty" onChange={handleValidationChange} />}
//                 label="Not Empty"
//               />
//               {['text', 'textarea'].includes(fieldState.type) && (
//                 <Box display="flex" gap={2} mt={1}>
//                   <TextField
//                     label="Min Length"
//                     name="minLength"
//                     type="number"
//                     fullWidth
//                     value={fieldState.validationRules?.minLength || ''}
//                     onChange={handleValidationChange}
//                   />
//                   <TextField
//                     label="Max Length"
//                     name="maxLength"
//                     type="number"
//                     fullWidth
//                     value={fieldState.validationRules?.maxLength || ''}
//                     onChange={handleValidationChange}
//                   />
//                 </Box>
//               )}
//               {fieldState.type === 'text' && (
//                 <>
//                   <FormControlLabel
//                     control={<Checkbox checked={!!fieldState.validationRules?.email} name="email" onChange={handleValidationChange} />}
//                     label="Email Format"
//                   />
//                   <FormControlLabel
//                     control={<Checkbox checked={!!fieldState.validationRules?.password} name="password" onChange={handleValidationChange} />}
//                     label="Custom Password Rule"
//                   />
//                 </>
//               )}
//             </FormGroup>
//           </Box>
  
//           {/* Options for Select/Radio/Checkbox */}
//           {['select', 'radio', 'checkbox'].includes(fieldState.type) && (
//             <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
//               <Typography variant="subtitle1">Options</Typography>
//               {fieldState.options?.map((option, index) => (
//                 <Box key={index} display="flex" alignItems="center" gap={1} mt={1}>
//                   <TextField
//                     label={`Option ${index + 1}`}
//                     fullWidth
//                     value={option}
//                     onChange={(e) => handleOptionsChange(index, e.target.value)}
//                   />
//                   <IconButton onClick={() => handleRemoveOption(index)}>
//                     <RemoveIcon color="error" />
//                   </IconButton>
//                 </Box>
//               ))}
//               <Button startIcon={<AddIcon />} onClick={handleAddOption} sx={{ mt: 1 }}>
//                 Add Option
//               </Button>
//             </Box>
//           )}
  
//           {/* Derived Field Configuration */}
//           <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
//             <Typography variant="subtitle1">Derived Field</Typography>
//             <FormControlLabel
//               control={<Checkbox checked={!!fieldState.isDerived} name="isDerived" onChange={handleChange} />}
//               label="Is a Derived Field"
//             />
//             {fieldState.isDerived && (
//               <>
//                 <FormControl fullWidth sx={{ mt: 1 }}>
//                   <InputLabel>Parent Fields</InputLabel>
//                   <Select
//                     multiple
//                     value={fieldState.parentFieldIds || []}
//                     onChange={(e) => handleUpdate({ parentFieldIds: e.target.value as string[] })}
//                     renderValue={(selected) =>
//                       (selected as string[])
//                         .map((id) => allFields.find(f => f.id === id)?.label)
//                         .join(', ')
//                     }
//                   >
//                     {allFields
//                       .filter((f) => f.id !== fieldState.id)
//                       .map((f) => (
//                         <MenuItem key={f.id} value={f.id}>
//                           {f.label}
//                         </MenuItem>
//                       ))}
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   label="Formula (e.g., parent1_value + ' ' + parent2_value)"
//                   name="formula"
//                   fullWidth
//                   multiline
//                   rows={3}
//                   sx={{ mt: 2 }}
//                   value={fieldState.formula || ''}
//                   onChange={handleChange}
//                 />
//               </>
//             )}
//           </Box>
//         </Box>
//       </DialogContent>
//     </Box>
//   );
// };

// export default FieldConfig;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateField } from '../redux/formSlice';
import {
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormGroup,
  IconButton,
  Switch,
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon, Close as CloseIcon } from '@mui/icons-material';
import { Field, ValidationRule } from '../types/formTypes';

interface FieldConfigProps {
  fieldId: string | null;
  onClose: () => void;
}

const FieldConfig = ({ fieldId, onClose }: FieldConfigProps) => {
  const dispatch = useDispatch();
  const field = useSelector((state: RootState) =>
    state.form.currentForm.fields.find((f) => f.id === fieldId)
  );
  const allFields = useSelector((state: RootState) => state.form.currentForm.fields);

  const [fieldState, setFieldState] = useState<Field | null>(field || null);

  useEffect(() => {
    setFieldState(field || null);
  }, [field]);

  if (!fieldState) return null;

  const handleUpdate = (updates: Partial<Field>) => {
    if (fieldState) {
      const updatedField = { ...fieldState, ...updates };
      dispatch(updateField(updatedField));
      setFieldState(updatedField);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value, type, checked } = e.target as any;
    if (type === 'checkbox' || type === 'radio') {
      handleUpdate({ [name]: checked });
    } else {
      handleUpdate({ [name]: value });
    }
  };

  const handleValidationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    const newRules: ValidationRule = { ...fieldState.validationRules };
    const validationKey = name as keyof ValidationRule;

    if (type === 'checkbox') {
      if (checked) {
        newRules[validationKey] = true as any;
      } else {
        delete newRules[validationKey];
      }
    } else {
      newRules[validationKey] = (type === 'number' ? Number(value) : value) as any;
    }
    handleUpdate({ validationRules: newRules });
  };

  const handleOptionsChange = (index: number, value: string) => {
    const newOptions = [...(fieldState.options || [])];
    newOptions[index] = value;
    handleUpdate({ options: newOptions });
  };

  const handleAddOption = () => {
    const newOptions = [...(fieldState.options || [])];
    newOptions.push('');
    handleUpdate({ options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...(fieldState.options || [])];
    newOptions.splice(index, 1);
    handleUpdate({ options: newOptions });
  };

  return (
    <Box sx={{ p: 1 }}>
      <TextField
        label="Label"
        name="label"
        fullWidth
        value={fieldState.label}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Default Value"
        name="defaultValue"
        fullWidth
        value={fieldState.defaultValue || ''}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={<Switch checked={fieldState.required} name="required" onChange={handleChange} />}
        label="Required"
      />
      
      {/* Validation Rules */}
      <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <Typography variant="subtitle1">Validation Rules</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={!!fieldState.validationRules?.notEmpty} name="notEmpty" onChange={handleValidationChange} />}
            label="Not Empty"
          />
          {['text', 'textarea'].includes(fieldState.type) && (
            <Box display="flex" gap={2} mt={1}>
              <TextField
                label="Min Length"
                name="minLength"
                type="number"
                fullWidth
                value={fieldState.validationRules?.minLength || ''}
                onChange={handleValidationChange}
              />
              <TextField
                label="Max Length"
                name="maxLength"
                type="number"
                fullWidth
                value={fieldState.validationRules?.maxLength || ''}
                onChange={handleValidationChange}
              />
            </Box>
          )}
          {fieldState.type === 'text' && (
            <>
              <FormControlLabel
                control={<Checkbox checked={!!fieldState.validationRules?.email} name="email" onChange={handleValidationChange} />}
                label="Email Format"
              />
              <FormControlLabel
                control={<Checkbox checked={!!fieldState.validationRules?.password} name="password" onChange={handleValidationChange} />}
                label="Custom Password Rule"
              />
            </>
          )}
        </FormGroup>
      </Box>

      {/* Options for Select/Radio/Checkbox */}
      {['select', 'radio', 'checkbox'].includes(fieldState.type) && (
        <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
          <Typography variant="subtitle1">Options</Typography>
          {fieldState.options?.map((option, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1} mt={1}>
              <TextField
                label={`Option ${index + 1}`}
                fullWidth
                value={option}
                onChange={(e) => handleOptionsChange(index, e.target.value)}
              />
              <IconButton onClick={() => handleRemoveOption(index)}>
                <RemoveIcon color="error" />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<AddIcon />} onClick={handleAddOption} sx={{ mt: 1 }}>
            Add Option
          </Button>
        </Box>
      )}

      {/* Derived Field Configuration */}
      <Box sx={{ mt: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <Typography variant="subtitle1">Derived Field</Typography>
        <FormControlLabel
          control={<Checkbox checked={!!fieldState.isDerived} name="isDerived" onChange={handleChange} />}
          label="Is a Derived Field"
        />
        {fieldState.isDerived && (
          <>
            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel>Parent Fields</InputLabel>
              <Select
                multiple
                value={fieldState.parentFieldIds || []}
                onChange={(e) => handleUpdate({ parentFieldIds: e.target.value as string[] })}
                renderValue={(selected) =>
                  (selected as string[])
                    .map((id) => allFields.find(f => f.id === id)?.label)
                    .join(', ')
                }
              >
                {allFields
                  .filter((f) => f.id !== fieldState.id)
                  .map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Formula (e.g., parent1_value + ' ' + parent2_value)"
              name="formula"
              fullWidth
              multiline
              rows={3}
              sx={{ mt: 2 }}
              value={fieldState.formula || ''}
              onChange={handleChange}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default FieldConfig;
