import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import lodash, { set } from 'lodash';

interface FormContextData {
  initialValues: { [key: string]: string };
  updateInitialValues: (values: { [key: string]: string }) => void;
  isSubmitting: boolean;
  updateSubmitting: (isSubmitting: boolean) => void;
  hasUnsavedChanges: boolean;
  updateValue: (key: string, value: string) => void;
  updateErrors: (errors: any) => void;
  handleOnChange: (e: any) => void;
  errors: { [key: string]: string };
  values: { [key: string]: string };
  reset: () => void;
}

export const FormContext = createContext<FormContextData>({} as FormContextData);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [initialValues, setInitialValues] = useState<any>({});
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({ "email": "Erro de email" });
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
    const { name, value } = e.target;
    updateValue(name, value);
  }

  const updateErrors = useCallback((errors: any) => {
    setErrors((oldErros: any) => ({...oldErros, ...errors}));
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
