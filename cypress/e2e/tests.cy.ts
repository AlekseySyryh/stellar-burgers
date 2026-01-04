describe('Тесты конструктора', () => {
  beforeEach(() => {
    //Во время написания тестов norma.education-services.ru работал крайне нестабильно
    //потому пришлось мокать все его запросы, но для тестов это скорее полезно
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'You should be authorised'
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    cy.visit('/');
  });

  it('Ингридиенты загружены', () => {
    cy.get('[data-cy=Булки_ic]').children().should('have.length', 4);
    cy.get('[data-cy=Начинки_ic]').children().should('have.length', 6);
    cy.get('[data-cy=Соусы_ic]').children().should('have.length', 8);
  });

  it('Категория ингридиента выбирается', () => {
    cy.get('span:contains("Соусы")').click();
    cy.get('[data-cy=Булки_ic]').should('not.be.visible');
    cy.get('[data-cy=Начинки_ic]').should('not.be.visible');
    cy.get('[data-cy=Соусы_ic]').should('be.visible');

    cy.get('span:contains("Булки")').click();
    cy.get('[data-cy=Булки_ic]').should('be.visible');
    cy.get('[data-cy=Начинки_ic]').should('not.be.visible');
    cy.get('[data-cy=Соусы_ic]').should('not.be.visible');

    cy.get('span:contains("Начинки")').click();
    cy.get('[data-cy=Булки_ic]').should('not.be.visible');
    cy.get('[data-cy=Начинки_ic]').should('be.visible');
    cy.get('[data-cy=Соусы_ic]').should('not.be.visible');
  });

  it('Булка добавляется', () => {
    cy.addBun();

    cy.get('[data-cy=top_bun_1_selected]');
    cy.get('[data-cy=bottom_bun_1_selected]');
  });

  it('Счетчик булкок обновляется', () => {
    cy.addBun();

    cy.get('[data-cy=component_bun_1] .counter').contains(1);
  });

  it('Булка заменяется', () => {
    cy.changeBun();

    cy.get('[data-cy=top_bun_1_selected]').should('not.exist');
    cy.get('[data-cy=bottom_bun_1_selected]').should('not.exist');
    cy.get('[data-cy=top_bun_2_selected]');
    cy.get('[data-cy=bottom_bun_2_selected]');
  });

  it('Замена булки обновляет счетчик', () => {
    cy.changeBun();

    cy.get('[data-cy=component_bun_1] .counter').should('not.exist');
    cy.get('[data-cy=component_bun_2] .counter').contains(1);
  });

  it('Начинка добавляется', () => {
    cy.addMains();

    cy.get('[data-cy=main_1_0]');
    cy.get('[data-cy=main_2_1]');
    cy.get('[data-cy=main_1_2]');
  });

  it('Начинка обновляет счетчик', () => {
    cy.addMains();

    cy.get('[data-cy=component_main_1] .counter').contains(2);
    cy.get('[data-cy=component_main_2] .counter').contains(1);
  });

  it('Начинка удаляется', () => {
    cy.addMains();

    cy.get('[data-cy=main_1_0] .constructor-element__action svg').click();
    cy.get('[data-cy=main_1_0]').should('not.exist');
    cy.get('[data-cy=main_2_0]');
    cy.get('[data-cy=main_1_1]');

    cy.get('[data-cy=main_1_1] .constructor-element__action svg').click();
    cy.get('[data-cy=main_2_0]');
    cy.get('[data-cy=main_1_1]').should('not.exist');

    cy.get('[data-cy=main_2_0] .constructor-element__action svg').click();
    cy.get('[data-cy=main_2_0]').should('not.exist');
  });

  it('Удаление начинки меняет счетчки', () => {
    cy.addMains();

    cy.get('[data-cy=main_1_0] .constructor-element__action svg').click();
    cy.get('[data-cy=component_main_1] .counter').contains(1);
    cy.get('[data-cy=component_main_2] .counter').contains(1);

    cy.get('[data-cy=main_1_1] .constructor-element__action svg').click();
    cy.get('[data-cy=component_main_1] .counter').should('not.exist');
    cy.get('[data-cy=component_main_2] .counter').contains(1);

    cy.get('[data-cy=main_2_0] .constructor-element__action svg').click();
    cy.get('[data-cy=component_main_2] .counter').should('not.exist');
  });

  it('Начинки перемещаются вверх', () => {
    cy.addMains();

    cy.get('[data-cy=main_2_1] .move_button').first().click();

    cy.get('[data-cy=main_2_1]').should('not.exist');
    cy.get('[data-cy=main_2_0]');
    cy.get('[data-cy=main_1_1]');
    cy.get('[data-cy=main_1_2]');
  });

  it('Начинки перемещаются вниз', () => {
    cy.addMains();

    cy.get('[data-cy=main_2_1] .move_button').last().click();

    cy.get('[data-cy=main_2_1]').should('not.exist');
    cy.get('[data-cy=main_1_0]');
    cy.get('[data-cy=main_1_1]');
    cy.get('[data-cy=main_2_2]');
  });

  it('По клику на ингриденте открывается окно c компонентом', () => {
    cy.openModalConstructor();

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal]').contains(
      'Биокотлета из марсианской Магнолии тест'
    );
  });

  it('Нажатие на крестик закрывает окно', () => {
    cy.openModalConstructor();

    cy.get('[data-cy=modal] button').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Нажатие на оверлей закрывает окно', () => {
    cy.openModalConstructor();

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Тесты ленты заказов', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'You should be authorised'
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    cy.fixture('all.json').then((all) => {
      cy.intercept('GET', '/api/orders/all', all);
    });

    cy.fixture('98278.json').then((all) => {
      cy.intercept('GET', '/api/orders/98278', all);
    });

    cy.visit('/feed');
  });

  it('Заказы отображаются', () => {
    cy.get('[data-cy=orders]').children().should('have.length', 3);
  });

  it('Заказы обновляются', () => {
    cy.fixture('all2.json').then((all) => {
      cy.intercept('GET', '/api/orders/all', all);
    });

    cy.get('[data-cy=orders-header] button').click();

    cy.get('[data-cy=orders]').children().should('have.length', 2);
  });

  it('Готовые заказы отображаются', () => {
    cy.get('[data-cy=halfcolumn-complete]').children().should('have.length', 2);
  });

  it('Готовящиеся заказы отображаются', () => {
    cy.get('[data-cy=halfcolumn-pending]').children().should('have.length', 1);
  });

  it('Выполнено за все время заполняется', () => {
    cy.get('[data-cy="column-Выполнено за все время"]').contains('100');
  });

  it('Выполнено за сегодня заполняется', () => {
    cy.get('[data-cy="column-Выполнено за сегодня"]').contains('10');
  });

  it('По клику на заказе открывается окно c заказом', () => {
    cy.openModalOrder();

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal]').contains('Тест 1');
  });

  it('Нажатие на крестик закрывает окно', () => {
    cy.openModalOrder();

    cy.get('[data-cy=modal] button').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Нажатие на оверлей закрывает окно', () => {
    cy.openModalOrder();

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Страницы требующие авторизации переходят на форму логина если авторизации нет', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'You should be authorised'
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });
  });

  it('Профиль', () => {
    cy.visit('/profile');

    cy.url().should('eq', 'http://localhost:4000/login');
  });

  it('Заказы', () => {
    cy.visit('/profile/orders');

    cy.url().should('eq', 'http://localhost:4000/login');
  });
});

describe('Страницы требующие отсутствия авторизации не открываются если авторизация есть', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'email@email',
          name: 'User'
        }
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });
  });

  it('Логин', () => {
    cy.visit('/login');

    cy.url().should('not.eq', 'http://localhost:4000/login');
  });

  it('Регистрация', () => {
    cy.visit('/register');

    cy.url().should('not.eq', 'http://localhost:4000/register');
  });

  it('Восстановление пароля', () => {
    cy.visit('/forgot-password');

    cy.url().should('not.eq', 'http://localhost:4000/forgot-password');
  });

  it('Сброс пароля', () => {
    cy.visit('/reset-password');

    cy.url().should('not.eq', 'http://localhost:4000/forgot-password');
  });
});

describe('Тесты формы логина', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'You should be authorised'
      }
    });

    cy.intercept('POST', '/api/auth/login', (req) => {
      if (req.body.email === 'email@email' && req.body.password === 'QZSDjhh') {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            user: {
              email: req.body.email,
              name: 'Name'
            }
          }
        });
      } else {
        req.reply({
          statusCode: 401,
          body: {
            success: false,
            message: 'email or password are incorrect'
          }
        });
      }
    }).as('login');

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    cy.visit('/login');
  });

  it('Форма отображается', () => {
    cy.get('main h3').contains('Вход');
  });

  it('Некорректный email валидируется на стороне клиента', () => {
    cy.get('.input_status_active input[name=email]').should('not.exist');

    cy.get('input[name=email]').type('aaa');
    cy.get('button[type=submit]').click();

    cy.get('.input_status_active input[name=email]');
    cy.get('@login.all').should('have.length', 0);
  });

  it('Некорректный пароль валидируется на стороне клиента', () => {
    cy.get('input[name=password]').type('1').blur();

    cy.get('form p').contains('Некорректный пароль');
  });

  it('Попытка авторизации с неправильными логином и паролем проваливается', () => {
    cy.get('input[name=email]').type('aaa@bbb');
    cy.get('input[name=password]').type('nigiyhnm');
    cy.get('form').submit();

    cy.get('form p').contains('Ошибка логина');
  });

  it('Попытка авторизации с правильными логином работает', () => {
    cy.get('input[name=email]').type('email@email');
    cy.get('input[name=password]').type('QZSDjhh');
    cy.get('form').submit();

    cy.url().should('not.eq', 'http://localhost:4000/login');
  });
});

describe('Тесты формы регистрации', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'You should be authorised'
      }
    });

    cy.intercept('POST', '/api/auth/register', (req) => {
      if (
        req.body.name === 'Name' &&
        req.body.email === 'email@email' &&
        req.body.password === 'GHGVHnjnjk'
      ) {
        req.reply({
          statuscode: 200,
          body: {
            success: true,
            user: {
              email: 'email@email',
              name: 'Name'
            },
            accessToken: 'accesstoken',
            refreshToken: 'refreshtoken'
          }
        });
      } else {
        req.reply({
          statuscode: 403,
          body: {
            success: false,
            message: 'Видимо что-то случилось...'
          }
        });
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });
    cy.visit('/register');
  });

  it('Неудачная регистрация возращает ошибку от сервера', () => {
    cy.get('form').submit();

    cy.get('form p').contains('Видимо что-то случилось');
  });

  it('Удачная регистрация', () => {
    cy.get('input[name=name]').type('Name');
    cy.get('input[name=email]').type('email@email');
    cy.get('input[name=password]').type('GHGVHnjnjk');
    cy.get('form').submit();

    cy.url().should('eq', 'http://localhost:4000/');
    cy.get('[data-cy=profile]').contains('Name');
  });
});

describe('Тесты формы забытого пароля', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'You should be authorised'
      }
    });

    cy.intercept('POST', '/api/password-reset', (req) => {
      if (req.body.email === 'email@email') {
        req.reply({
          statuscode: 200,
          body: {
            success: true,
            message: 'Reset email sent'
          }
        });
      } else {
        req.reply({
          statuscode: 403,
          body: {
            success: false,
            message: 'Видимо что-то случилось...'
          }
        });
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });
    cy.visit('/forgot-password');
  });

  it('Возвращается ошибка от сервера', () => {
    cy.get('form').submit();

    cy.get('form p').contains('Видимо что-то случилось');
  });

  it('При успешном результате переходим на страницу сброса пароля', () => {
    cy.get('input[name=email]').type('email@email');
    cy.get('form').submit();

    cy.url().should('eq', 'http://localhost:4000/reset-password');
  });
});

describe('Тесты формы сброса пароля', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 401,
      body: {
        success: false,
        message: 'You should be authorised'
      }
    });

    cy.intercept('POST', '/api/password-reset/reset', (req) => {
      if (req.body.password === 'VVHbnjnk' && req.body.token === 'token') {
        req.reply({
          statuscode: 200,
          body: {
            success: true,
            message: 'Password successfully reset'
          }
        });
      } else {
        req.reply({
          statuscode: 404,
          body: {
            success: false,
            message: 'Видимо что-то случилось...'
          }
        });
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    localStorage.setItem('resetPassword', 'true');
    cy.visit('/reset-password');
  });

  it('Возвращается ошибка от сервера', () => {
    cy.get('form').submit();
    cy.get('form p').contains('Видимо что-то случилось');
  });

  it('При успешном результате переходим на страницу логина', () => {
    cy.get('input[name=password]').type('VVHbnjnk');
    cy.get('input[name=token]').type('token');
    cy.get('form').submit();

    cy.url().should('eq', 'http://localhost:4000/login');
  });
});

describe('Тесты профиля', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'email@email',
          name: 'Name'
        }
      }
    });

    cy.intercept('PATCH', '/api/auth/user', (req) => {
      if (req.headers['authorization'] != 'accessToken') {
        req.reply({
          statusCode: 401,
          body: {
            success: false,
            message: 'You should be authorised'
          }
        });
      } else {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            user: {
              email: req.body.email,
              name: req.body.name
            }
          }
        });
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    cy.visit('/profile');
  });

  it('Форма заполнена', () => {
    cy.checkProfileFormInOriginalState();
  });

  it('Кнопки не доступны по умолчанию', () => {
    cy.get('button[type=button]').should('not.exist');
    cy.get('button[type=submit]').should('not.exist');
  });

  it('Кнопки доступны после внесения изменения имени', () => {
    cy.get('[name=name]').type('1');

    cy.get('button[type=button]');
    cy.get('button[type=submit]');
  });

  it('Кнопки доступны после внесения изменения email', () => {
    cy.get('[name=email]').type('email@email1');

    cy.get('button[type=button]');
    cy.get('button[type=submit]');
  });

  it('Кнопки доступны после внесения изменения пароля', () => {
    cy.get('[name=password]').type('njbknjbku');

    cy.get('button[type=button]');
    cy.get('button[type=submit]');
  });

  it('Кнопка отмены отменяет правки', () => {
    cy.modifyProfileForm();

    cy.get('button[type=button]').click();

    cy.checkProfileFormInOriginalState();
  });

  it('Обновление без токена не работает', () => {
    cy.modifyProfileForm();

    cy.get('button[type=submit]').click();

    cy.checkProfileFormInOriginalState();
  });

  it('Обновление c токеном работает', () => {
    cy.modifyProfileForm();
    cy.setCookie('accessToken', 'accessToken');

    cy.get('button[type=submit]').click();

    cy.get('[name=name]').should('have.attr', 'value', 'Name1');
    cy.get('[name=email]').should('have.attr', 'value', 'email@email1');
    cy.get('[name=password]').should('have.attr', 'value', '');
  });
});

describe('Тесты истории заказов профиля', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'email@email',
          name: 'Name'
        }
      }
    });

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    cy.fixture('all.json').then((all) => {
      cy.intercept('GET', '/api/orders', (req) => {
        if (req.headers['authorization'] != 'accessToken') {
          req.reply({
            statusCode: 401,
            body: {
              success: false,
              message: 'You should be authorised'
            }
          });
        } else {
          req.reply({
            statusCode: 200,
            body: all
          });
        }
      });
    });

    cy.fixture('98278.json').then((all) => {
      cy.intercept('GET', '/api/orders/98278', all);
    });

    cy.setCookie('accessToken', 'accessToken');

    cy.visit('/profile/orders');
  });

  it('Без токена заказы не отображаются', () => {
    cy.clearAllCookies();
    cy.get('[data-cy=orders]').children().should('have.length', 0);
  });

  it('Заказы отображаются', () => {
    cy.get('[data-cy=orders]').children().should('have.length', 3);
  });

  it('По клику на заказе открывается окно c заказом', () => {
    cy.openModalOrder();

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal]').contains('Тест 1');
  });

  it('Нажатие на крестик закрывает окно', () => {
    cy.openModalOrder();

    cy.get('[data-cy=modal] button').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Нажатие на оверлей закрывает окно', () => {
    cy.openModalOrder();

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Заказ', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/auth/user', (req) => {
      if (req.headers['authorization'] != 'accessToken') {
        req.reply({
          statusCode: 401,
          body: {
            success: false,
            message: 'You should be authorised'
          }
        });
      } else {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            user: {
              email: 'email@email',
              name: 'Name'
            }
          }
        });
      }
    });

    cy.intercept('POST', '/api/auth/login', (req) => {
      if (req.body.email === 'email@email' && req.body.password === 'QZSDjhh') {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            user: {
              email: req.body.email,
              name: 'Name'
            }
          }
        });
      } else {
        req.reply({
          statusCode: 401,
          body: {
            success: false,
            message: 'email or password are incorrect'
          }
        });
      }
    });

    cy.intercept('POST', '/api/orders', (req) => {
      if (req.headers['authorization'] != 'accessToken') {
        req.reply({
          statusCode: 401,
          body: {
            success: false,
            message: 'You should be authorised'
          }
        });
      } else if (
        req.body.ingredients.length === 3 &&
        req.body.ingredients[0] === 'bun_1' &&
        req.body.ingredients[1] === 'main_1' &&
        req.body.ingredients[2] === 'bun_1'
      ) {
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            name: 'Тест',
            order: {
              ingredients: [],
              _id: '69590d96a64177001b325cf2',
              status: 'done',
              name: 'Тест',
              createdAt: '2026-01-03T12:37:42.862Z',
              updatedAt: '2026-01-03T12:37:43.061Z',
              number: 12345,
              price: 2934
            }
          }
        });
      } else {
        req.reply({
          statusCode: 500,
          body: {
            success: false,
            message: 'Internal Server Error'
          }
        });
      }
    }).as('order');

    cy.fixture('ingredients.json').then((ingredients) => {
      cy.intercept('GET', '/api/ingredients', ingredients);
    });

    cy.visit('/');
  });

  it('Заказ без авторизации переводит на форму логина', () => {
    cy.doOrder();

    cy.url().should('eq', 'http://localhost:4000/login');
  });

  it('После логина заказ сохраняется', () => {
    cy.doOrder();

    cy.doLogin();

    cy.get('[data-cy=main_1_0]');
    cy.get('[data-cy=top_bun_1_selected]');
    cy.get('[data-cy=bottom_bun_1_selected]');
  });

  it('Заказ посылается на бэк', () => {
    cy.goToLogin();
    cy.doLogin();
    cy.doOrder();

    cy.wait('@order');
  });

  it('Заказ открывает модальное окно', () => {
    cy.goToLogin();
    cy.doLogin();
    cy.doOrder();

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal]').contains('012345');
  });

  it('Модальное окно закрывается крестиком', () => {
    cy.goToLogin();
    cy.doLogin();
    cy.doOrder();

    cy.get('[data-cy=modal] button').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Модальное окно закрывается кликом по оверлею', () => {
    cy.goToLogin();
    cy.doLogin();
    cy.doOrder();

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Конструктор очищается после заказа', () => {
    cy.goToLogin();
    cy.doLogin();
    cy.doOrder();

    cy.get('[data-cy=modal] button').click();

    cy.get('[data-cy=main_1_0]').should('not.exist');
    cy.get('[data-cy=top_bun_1_selected]').should('not.exist');
    cy.get('[data-cy=bottom_bun_1_selected]').should('not.exist');
  });
});
