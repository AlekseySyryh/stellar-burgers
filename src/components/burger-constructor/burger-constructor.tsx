import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { selectUser } from '../../services/user/userSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearOrder, placeOrder } from '../../services/orders/orderSlice';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructorItems } from '../../services/burgerConstructor/burgerConstructorSelectors';
import { clearConstructor } from '../../services/burgerConstructor/burgerConstructorSlice';
import { selectGetOrder } from '../../services/orders/orderSelectors';

export const BurgerConstructor: FC = () => {
  const location = useLocation();
  const constructorItems = useSelector(selectConstructorItems);
  const orderData = useSelector(selectGetOrder);
  const orderRequest = orderData.isLoading;
  const orderModalData = orderData.order;

  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectConstructorItems);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData.user) {
      navigate('/login', { state: { from: location } });
    } else {
      const data: string[] = [];
      data.push(items.bun!._id);
      items.ingredients.reduce((acc, item) => {
        acc.push(item._id);
        return acc;
      }, data);
      data.push(items.bun!._id);
      dispatch(placeOrder(data));
    }
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
