import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

import { loginUser } from '../../services/user/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { selectUser } from '../../services/user/userSelectors';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (userData.isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={userData?.loginError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
