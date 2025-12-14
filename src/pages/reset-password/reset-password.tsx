import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api';
import { ResetPasswordUI } from '@ui-pages';
import { useForm } from '../../hooks/useForm';
import { ResetPasswordData } from '../../components/ui/pages/reset-password/type';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [data, onChange] = useForm<ResetPasswordData>({
    password: '',
    token: ''
  });
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    resetPasswordApi(data)
      .then(() => {
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <ResetPasswordUI
      errorText={error?.message}
      pageData={data}
      handleChange={onChange}
      handleSubmit={handleSubmit}
    />
  );
};
