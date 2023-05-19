import { createContext, forwardRef, ReactNode, useCallback, useEffect, useState } from 'react';
import lodash from 'lodash';

interface FormContextData {
  isSubmitting: boolean;
  hasUnsavedChanges: boolean;
  updateValue: (key: string, value: string) => void;
  updateErrors: (errors: any) => void;
  hableOnChange: (e: any) => void;
  errors: { [key: string]: string };
  values: { [key: string]: string };
  reset: () => void;
}

export const FormContext = createContext<FormContextData>({} as FormContextData);

interface ChildrenProps {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  hableOnChange: (e: any) => void;
}

interface FormProviderProps {
  className?: string | undefined;
  initialValues: { [key: string]: string };
  children: (props: ChildrenProps) => ReactNode;
  onSubmit: (values: any) => Promise<void>;
}

export const FormProvider = forwardRef<HTMLFormElement, FormProviderProps>(({ children, initialValues, onSubmit, className }, formRef) => {
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({ "email": "Erro de email" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    if (!lodash.isEqual(values, initialValues)) {
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [values]);

  const updateValue = useCallback((key: string, value: string) => {
    setValues((values: any) => ({...values, [key]: value}));
  }, []);

  const hableOnChange = (e: any) => {
    const { name, value } = e.target;
    updateValue(name, value);
  }

  const updateErrors = useCallback((errors: any) => {
    setErrors((oldErros: any) => ({...oldErros, ...errors}));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setHasUnsavedChanges(false);
  }, [initialValues]);

  useEffect(() => {
    console.log(hasUnsavedChanges)
  }, [hasUnsavedChanges])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("AAAAAA");
    setIsSubmitting(_ => true);
    onSubmit(values);
    setIsSubmitting(_ => false);
  }

  return (
    <FormContext.Provider value={{ values, errors, updateErrors, updateValue, hableOnChange, reset, hasUnsavedChanges, isSubmitting }}>
      <form onSubmit={handleSubmit} className={className} ref={formRef}>
        {children({ values, errors, hableOnChange })}
      </form>
    </FormContext.Provider>
  )
});
