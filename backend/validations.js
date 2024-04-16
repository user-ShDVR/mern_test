import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты').isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  body('name', 'Укажите имя').isLength({ min: 3 }),
  body('birth_date', 'Укажите дату рождения').isISO8601(),
  body('gender', 'Укажите пол').isIn(['male', 'female']),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const updateValidation = [
  body('email', 'Неверный формат почты').optional().isEmail(),
  body('password', 'Пароль должен быть минимум 5 символов').optional().isLength({ min: 5 }),
  body('name', 'Укажите имя').optional().isLength({ min: 3 }),
  body('birth_date', 'Укажите дату рождения').optional().isISO8601(),
  body('gender', 'Укажите пол').optional().isIn(['male', 'female']),
  body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];
