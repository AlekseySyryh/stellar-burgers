import { ChangeEvent, useState } from 'react';

export function useForm<T extends { [key: string]: string }>(
  baseForm: T
): [T, ({ target }: ChangeEvent<HTMLInputElement>) => void] {
  const [form, setForm] = useState<T>(baseForm);

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    setForm((pastForm) => ({ ...pastForm, [target.name]: target.value }));
  }

  return [form, handleChange];
}
