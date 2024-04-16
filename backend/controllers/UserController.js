import { redisClient } from '../index.js';
import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';

export const getAllExceptCurrentUser = async (req, res) => {
  // B идеале сделать пагинацию для infinity scroll'a
  const cacheKey = `users_except:${req.userId}`;

  try {
    const cachedUsers = await redisClient.get(cacheKey);
    if (cachedUsers) {
      return res.json(JSON.parse(cachedUsers));
    }

    const users = await UserModel.find({ _id: { $ne: req.userId } }, { passwordHash: 0 });
    
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: 'Пользователи, кроме текущего, не найдены',
      });
    }
    // Тут всего 10 секунд потому что иначе не удобно работать с данными на фронте
    await redisClient.setEx(cacheKey, 10, JSON.stringify(users));
    console.log('Cached users: ', users.length);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Произошла ошибка при получении пользователей, кроме текущего',
    });
  }
};

export const update = async (req, res) => {
  try {
    const { email, ...restUpdates } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser && existingUser._id.toString() !== req.userId) {
      return res.status(400).json({
        message: 'Указанный email уже занят другим пользователем',
      });
    }

    const updates = {};
    if (email) updates.email = email;
    if (restUpdates.name) updates.name = restUpdates.name;
    if (restUpdates.birth_date) updates.birth_date = restUpdates.birth_date;
    if (restUpdates.gender) updates.gender = restUpdates.gender;
    if (restUpdates.avatarUrl) updates.avatarUrl = restUpdates.avatarUrl;
    if (restUpdates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.passwordHash = await bcrypt.hash(restUpdates.password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(req.userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Произошла ошибка при обновлении профиля',
    });
  }
};


