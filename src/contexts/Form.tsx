import lodash from 'lodash';
import { createContext, useCallback, useEffect, useState } from 'react';
import { BaseChildrenProps } from '../@types/global';
import { isEmpty } from 'lodash';

interface FormContextData {
  initialValues: { [key: string]: any };
  updateInitialValues: (values: { [key: string]: string }) => void;
  isSubmitting: boolean;
  updateSubmitting: (isSubmitting: boolean) => void;
  hasUnsavedChanges: boolean;
  updateValue: (key: string, value: string) => void;
  updateErrors: (key: string, value: string) => void;
  handleOnChange: (e: any) => void;
  errors: { [key: string]: any };
  values: { [key: string]: any };
  reset: () => void;
}

export const FormContext = createContext<FormContextData>({} as FormContextData);

interface FormProviderProps extends BaseChildrenProps {}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    if (!lodash.isEqual(values, initialValues)) {
      setHasUnsavedChanges(true);
    }

    setHasUnsavedChanges(false);
  }, [values]);

  const updateValue = useCallback((key: string, value: string) => {
    setValues((values: any) => ({...values, [key]: value}));
  }, []);

  const handleOnChange = (e: any) => {
    if (!isEmpty(errors)) {
      setErrors((errors: any) => {
        const newErrors = {...errors};
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
    const { name, value } = e.target;
    updateValue(name, value);
  }

  const updateErrors = useCallback((key: string, value: string) => {
    setErrors((errors: any) => ({...errors, [key]: value}));
  }, []);

  const reset = useCallback(() => {
    setValues((_: any) => initialValues);
    setErrors({});
    setHasUnsavedChanges(false);
  }, []);

  const updateSubmitting = useCallback((isSubmittingStatus: boolean) => {
    setIsSubmitting(_ => isSubmittingStatus);
  }, []);

  const updateInitialValues = useCallback((initialValues: { [key: string]: string }) => {
    setInitialValues((_: any) => initialValues);
    setValues((_: any) => initialValues);
  }, []);

  return (
    <FormContext.Provider value={{ values, errors, updateErrors, updateValue, handleOnChange, reset, hasUnsavedChanges, isSubmitting, updateSubmitting, initialValues, updateInitialValues }}>
      {children}
    </FormContext.Provider>
  )
}
