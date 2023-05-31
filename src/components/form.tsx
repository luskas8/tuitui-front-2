import React, { forwardRef, useEffect } from 'react';
import { useForm } from '../hooks';
import { z } from 'zod';

export interface ChildrenProps {
  values: { [key: string]: any };
  errors: { [key: string]: any };
  handleOnChange: (e: any) => void;
}

interface FormProps {
  className?: string | undefined;
  initialValues: { [key: string]: any };
  children: (props: ChildrenProps) => React.ReactNode;
  onSubmit: (values: any) => Promise<void>;
  schemeValidation?: z.ZodObject<any, any>;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(({ children, initialValues, onSubmit, className, schemeValidation }, formRef) => {
  const { values, errors, updateErrors, handleOnChange, updateInitialValues, updateSubmitting } = useForm();

  useEffect(() => {
    updateInitialValues(initialValues);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => async () => {
    e.preventDefault();
    updateSubmitting(true);

    if (schemeValidation) {
      const result = await schemeValidation?.safeParseAsync(values);

      if (!result?.success) {
        const errors = result?.error.issues
        errors?.map((error: any) => updateErrors(error.path[0], error.message))
        updateSubmitting(false);
        return;
      }
    }

    await onSubmit(values)
    updateSubmitting(false);
  }

  return <form className={className} onSubmit={(e) => handleSubmit(e)()} ref={formRef}>
    {children({ values, errors, handleOnChange })}
  </form>
});
