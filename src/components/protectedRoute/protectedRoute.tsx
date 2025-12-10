import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/user/userSelectors';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: ReactNode;
  mustBeAuthenticated: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  mustBeAuthenticated
}) => {
  const location = useLocation();
  const { user, isLoading } = useSelector(selectUser);

  if (isLoading) {
    return <Preloader />;
  }

  if (mustBeAuthenticated && !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (!mustBeAuthenticated && user) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return <>{children}</>;
};
