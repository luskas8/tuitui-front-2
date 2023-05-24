import React, { forwardRef, useEffect } from 'react';
import { useForm } from '../hooks';

export interface ChildrenProps {
  values: { [key: string]: string };
  errors: { [key: string]: string };
  handleOnChange: (e: any) => void;
}

interface FormProps {
  className?: string | undefined;
  initialValues: { [key: string]: string };
  children: (props: ChildrenProps) => React.ReactNode;
  onSubmit: (values: any) => Promise<void>;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ children, initialValues, onSubmit, className }, formRef) => {
  const { values, errors, handleOnChange, updateInitialValues, updateSubmitting } = useForm();

  useEffect(() => {
    updateInitialValues(initialValues);
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    updateSubmitting(true);
    await onSubmit(values);
    updateSubmitting(false);
  }

  return <form className={className} onSubmit={handleSubmit} ref={formRef}>
    {children({ values, errors, handleOnChange })}
  </form>
});
