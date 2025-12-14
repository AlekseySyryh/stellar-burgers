import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../common-type';

export type ResetPasswordData = {
  password: string;
  token: string;
}

export type ResetPasswordUIProps = PageUIProps<ResetPasswordData>;
