import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getOrder } from '../../services/orders/orderSlice';
import { selectAllIngredients } from '../../services/ingredients/ingredientsSelectors';
import { useParams } from 'react-router-dom';
import { selectGetOrder } from '../../services/orders/orderSelectors';
import { TModalChild } from '../ui/modal/type';

export const OrderInfo: FC<TModalChild> = (props: TModalChild) => {
  const num = useParams<{ number: string }>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (num.number) {
      dispatch(getOrder(+num.number));
    }
  }, [num]);

  const getOrderData = useSelector(selectGetOrder);
  const ingredientsData = useSelector(selectAllIngredients);

  useEffect(() => {
    if (props?.setTitle && getOrderData?.selectedOrder?.number) {
      props.setTitle(
        `#${String(getOrderData.selectedOrder.number).padStart(6, '0')}`
      );
    }
  }, [getOrderData?.selectedOrder?.number, props?.setTitle]);

  const orderData = getOrderData.selectedOrder;
  const ingredients = ingredientsData.ingredients;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
