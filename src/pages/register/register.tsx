import { FC, SyntheticEvent } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/user/userSlice';
import { selectUser } from '../../services/user/userSelectors';
import { useForm } from '../../hooks/useForm';
import { TRegisterData } from '@api';

export const Register: FC = () => {
  const [data, onChange] = useForm<TRegisterData>({
    email: '',
    name: '',
    password: ''
  });
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };

  return (
    <RegisterUI
      errorText={userData.registerError}
      pageData={data}
      handleChange={onChange}
      handleSubmit={handleSubmit}
    />
  );
};
