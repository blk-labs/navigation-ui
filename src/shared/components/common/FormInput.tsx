import { zodResolver } from '@hookform/resolvers/zod';
import type { FormHTMLAttributes } from 'react';
import {
  FormProvider,
  useForm,
  type DefaultValues,
  type FieldValues,
  type UseFormReturn,
  type Resolver,
} from 'react-hook-form';
interface FormInputProps<T extends FieldValues> {
  schema: Parameters<typeof zodResolver>[0];
  onsubmit: (data: T) => void | Promise<void>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  mode?: NonNullable<'all' | 'onChange' | 'onBlur' | 'onTouched' | 'onSubmit'>;
  defaultValues?: DefaultValues<T>;
  config?: FormHTMLAttributes<HTMLFormElement>;
}

export default function FormInput<T extends FieldValues>({
  schema,
  onsubmit,
  config,
  children,
  mode = 'onTouched',
  defaultValues,
}: FormInputProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema) as Resolver<T>,
    mode,
    defaultValues,
  });

  const baseStyles = '';

  return (
    <FormProvider {...methods}>
      <form
        {...config}
        onSubmit={(e) => {
          void methods.handleSubmit(async (data) => {
            await onsubmit(data);
            methods.reset();
          })(e);
        }}
        className={`${baseStyles}   ${config?.className ?? ''}`}
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
}
