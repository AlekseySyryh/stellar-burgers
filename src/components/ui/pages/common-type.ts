import { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';

export type PageUIProps<T> = {
  pageData: T;
  errorText: string | undefined;
  handleChange: ({target}: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};
