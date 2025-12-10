import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeed } from '../../services/orders/feedSlice';
import { useDispatch, useSelector } from '../../services/store';
import { selectFeed } from '../../services/orders/feedSelectors';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const state = useSelector(selectFeed);

  const getFeeds = () => dispatch(getFeed());

  useEffect(() => {
    getFeeds();
  }, []);

  const orders: TOrder[] = state.orders;

  if (!orders.length || state.isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getFeeds} />;
};
