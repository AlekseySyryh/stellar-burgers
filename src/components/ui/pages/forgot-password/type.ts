import { PageUIProps } from '../common-type';
import { TLoginData } from '@api';

export type ForgotPasswordData = {
  email: string;
}

export type ForgotPasswordUIProps = PageUIProps<ForgotPasswordData>;
