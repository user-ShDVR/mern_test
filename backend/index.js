import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import multer from 'multer';
import EasyYandexS3Lib from 'easy-yandex-s3';
const EasyYandexS3 = EasyYandexS3Lib.default;
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
const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
    secretAccessKey: process.env.YANDEX_SECRET_ACCESS_KEY,
  },
  Bucket: process.env.YANDEX_BUCKET_NAME,
  debug: true
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, AuthController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, AuthController.register);
app.get('/auth/me', checkAuth, AuthController.getMe);
app.get('/users', checkAuth, UserController.getAllExceptCurrentUser);
app.put('/users/update', checkAuth, updateValidation, handleValidationErrors, UserController.update);

app.post('/upload', upload.single('image'), async (req, res) => {
  const image = req.file;
  if (!image) {
    return res.status(400).send('No file uploaded.');
  }

  const folderPath = '/uploads/'; 
  const fileName = `${uuidv4()}.${image.originalname.split('.').pop()}`;

  try {
    const uploadResult = await s3.Upload({
      buffer: image.buffer,
      name: fileName, 
    }, folderPath);

    if (!uploadResult) {
      throw new Error('File upload failed');
    }

    console.log(uploadResult);
    res.json({
      message: 'File uploaded successfully',
      location: uploadResult.Location
    });
  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    res.status(500).send('Ошибка при загрузке файла');
  }
});


app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server started on port ${process.env.PORT}`);
});
