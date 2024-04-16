import express from 'express';
import fs from 'fs';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from 'redis';
import { registerValidation, loginValidation, updateValidation } from './validations.js';

import { handleValidationErrors, checkAuth } from './utils/index.js';

import { AuthController, UserController } from './controllers/index.js';

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

export const redisClient = createClient({
  url: process.env.REDIS_URL  
});

redisClient.connect();

redisClient.on('error', (err) => console.error('Ошибка подключения к Redis:', err));

redisClient.on('connect', () => console.log('Успешно подключено к Redis.'));

const app = express();
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    const uniqueFilename = uuidv4();
    const fileExtension = file.originalname.split('.').pop();
    const filename = `${uniqueFilename}.${fileExtension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register);
app.get('/auth/me', checkAuth, AuthController.getMe);
app.get('/users', checkAuth, UserController.getAllExceptCurrentUser);
app.put('/users/update', checkAuth, updateValidation, handleValidationErrors, UserController.update);

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `http://127.0.0.1:4444/uploads/${req.file.filename}`,
  });
});

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Server started on port ${process.env.PORT}`);
});
