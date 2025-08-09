import React, { useEffect } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { FormSchema } from '../types/formTypes';

interface FormPreviewerProps {
  formSchema: FormSchema;
}

const FormPreviewer = ({ formSchema }: FormPreviewerProps) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const allValues = watch();

  useEffect(() => {
    if (formSchema && formSchema.fields) {
      formSchema.fields.forEach(field => {
        if (field.isDerived && field.parentFieldIds && field.formula) {
          const parentValues = field.parentFieldIds.map(parentFieldId => allValues[parentFieldId]);
          try {
            const argNames = field.parentFieldIds as string[];
            const formulaFunc = new Function(...argNames, `return ${field.formula}`);
            const derivedValue = formulaFunc(...parentValues);
            setValue(field.id, derivedValue);
          } catch (e) {
            console.error(`Error calculating derived field ${field.id}:`, e);
          }
        }
      });
    }
  }, [allValues, formSchema, setValue]);

  const onSubmit = (data: any) => {
    console.log('Form Submitted!', data);
    alert('Form submitted successfully! Check the console for data.');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{formSchema.name}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formSchema.fields.map((field) => (
          <Box key={field.id} sx={{ mb: 2 }}>
            <Controller
              name={field.id}
              control={control}
              defaultValue={field.defaultValue || ''}
              rules={{
                required: field.required ? 'This field is required' : false,
                pattern: field.validationRules?.email ? /^\S+@\S+$/i : undefined,
                minLength: field.validationRules?.minLength ? { value: field.validationRules.minLength, message: `Minimum length is ${field.validationRules.minLength}` } : undefined,
                maxLength: field.validationRules?.maxLength ? { value: field.validationRules.maxLength, message: `Maximum length is ${field.validationRules.maxLength}` } : undefined,
                validate: {
                  passwordRule: (value) => {
                    if (field.validationRules?.password && value) {
                      const hasNumber = /[0-9]/.test(value);
                      if (value.length < 8 || !hasNumber) {
                        return 'Password must be at least 8 characters long and contain a number.';
                      }
                    }
                    return true;
                  },
                  requiredCheckboxes: (value) => {
                    if (field.type === 'checkbox' && field.required && field.options && (!value || value.length === 0)) {
                      return 'Please select at least one option.';
                    }
                    return true;
                  }
                },
              }}
              render={({ field: controllerField }) => {
                const error = errors[field.id];
                const helperText = error?.message as React.ReactNode;
                switch (field.type) {
                  case 'text':
                  case 'number':
                    return (
                      <TextField
                        {...controllerField}
                        label={field.label}
                        type={field.type}
                        fullWidth
                        error={!!error}
                        helperText={helperText}
                        disabled={field.isDerived}
                      />
                    );
                  case 'textarea':
                    return (
                      <TextField
                        {...controllerField}
                        label={field.label}
                        multiline
                        rows={4}
                        fullWidth
                        error={!!error}
                        helperText={helperText}
                        disabled={field.isDerived}
                      />
                    );
                  case 'select':
                    return (
                      <FormControl fullWidth error={!!error}>
                        <FormLabel>{field.label}</FormLabel>
                        <Select
                          {...controllerField}
                          label={field.label} // Add the label here for consistency
                          value={controllerField.value || ''} // Ensure the value is controlled
                        >
                          {field.options?.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{helperText}</FormHelperText>
                      </FormControl>
                    );
                  case 'radio':
                    return (
                      <FormControl component="fieldset" error={!!error}>
                        <FormLabel component="legend">{field.label}</FormLabel>
                        <RadioGroup {...controllerField}>
                          {field.options?.map((option) => (
                            <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio />}
                              label={option}
                            />
                          ))}
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                      </FormControl>
                    );
                  case 'checkbox':
                    if (field.options && field.options.length > 0) {
                      return (
                        <FormControl component="fieldset" error={!!error}>
                            <FormLabel component="legend">{field.label}</FormLabel>
                            <FormGroup>
                                {field.options.map(option => (
                                    <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                                checked={controllerField.value.includes(option)}
                                                onChange={() => {
                                                    const newValue = controllerField.value.includes(option)
                                                        ? controllerField.value.filter((item: string) => item !== option)
                                                        : [...controllerField.value, option];
                                                    controllerField.onChange(newValue);
                                                }}
                                            />
                                        }
                                        label={option}
                                    />
                                ))}
                            </FormGroup>
                            <FormHelperText>{helperText}</FormHelperText>
                        </FormControl>
                      );
                    } else {
                      return (
                        <FormControlLabel
                          control={<Checkbox {...controllerField} checked={controllerField.value} />}
                          label={field.label}
                        />
                      );
                    }
                  case 'date':
                    return (
                      <TextField
                        {...controllerField}
                        label={field.label}
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        error={!!error}
                        helperText={helperText}
                        disabled={field.isDerived}
                      />
                    );
                  default:
                    return <Box />;
                }
              }}
            />
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormPreviewer;