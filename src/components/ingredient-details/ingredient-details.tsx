import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredient } from '../../services/ingredients/ingredientsSlice';
import { selectSelectedIngredient } from '../../services/ingredients/ingredientsSelectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { ingredientData, isLoading } = useSelector(selectSelectedIngredient);

  useEffect(() => {
    if (id && !isLoading) {
      dispatch(selectIngredient(id));
    }
  }, [id, isLoading]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
