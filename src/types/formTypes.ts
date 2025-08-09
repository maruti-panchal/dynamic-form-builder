export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export interface ValidationRule {
  notEmpty?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  password?: boolean;
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  validationRules?: ValidationRule;
  options?: string[];
  isDerived?: boolean;
  parentFieldIds?: string[];
  formula?: string;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: number;
  fields: Field[];
}