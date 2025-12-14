import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrders } from '../../services/orders/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { selectGetOrders } from '../../services/orders/ordersSelectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const ordersData = useSelector(selectGetOrders);

  useEffect(() => {
    if (!ordersData.isLoading) {
      dispatch(getOrders());
    }
  }, []);

  if (ordersData.isLoading) {
    return <Preloader />;
  }

  const orders: TOrder[] = ordersData.orders || [];

  return <ProfileOrdersUI orders={orders} />;
};
