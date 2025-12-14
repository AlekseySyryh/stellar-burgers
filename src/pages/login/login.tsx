import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { loginUser } from '../../services/user/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { selectUser } from '../../services/user/userSelectors';
import { useForm } from '../../hooks/useForm';
import { TLoginData } from '@api';

export const Login: FC = () => {
  const [pageData, onChange] = useForm<TLoginData>({ email: '', password: '' });

  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(pageData));
  };

  if (userData.isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={userData?.loginError}
      pageData={pageData}
      handleChange={onChange}
      handleSubmit={handleSubmit}
    />
  );
};
