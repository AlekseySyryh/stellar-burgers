export const bun1 = {
  _id: 'id1',
  name: 'name1',
  type: 'bun',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: '',
  image_large: '',
  image_mobile: ''
};

export const bun2 = {
  ...bun1,
  _id: 'id2',
  name: 'name2'
};

export const main1 = {
  _id: 'id1',
  id: 'id1',
  name: 'name1',
  type: 'main',
  proteins: 1,
  fat: 2,
  carbohydrates: 3,
  calories: 4,
  price: 5,
  image: '',
  image_large: '',
  image_mobile: ''
};

export const main2 = {
  ...main1,
  _id: 'id2',
  id: 'id2',
  name: 'name2'
};

export const main3 = {
  ...main2,
  _id: 'id3',
  id: 'id3',
  name: 'name3'
};

export const ordersMock = {
  success: true,
  orders: [
    {
      _id: '695935b8a64177001b325d26',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2026-01-03T15:28:56.930Z',
      updatedAt: '2026-01-03T15:28:57.175Z',
      number: 98316
    },
    {
      _id: '69593371a64177001b325d24',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный люминесцентный бургер',
      createdAt: '2026-01-03T15:19:13.286Z',
      updatedAt: '2026-01-03T15:19:13.518Z',
      number: 98315
    }
  ],
  total: 22310,
  totalToday: 20
};

export const userMock = {
  email: 'email',
  name: 'name'
};

export const userMock2 = {
  email: 'email2',
  name: 'name2'
};

export const error = 'Видимо что-то случилось';
