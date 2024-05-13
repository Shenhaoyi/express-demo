import express from 'express';
import { urlencodedParser } from '../../middlewares/body.js';
import User from '../../models/users.js';
import md5 from 'md5';
import checkLoginByToken from '../../middlewares/checkLoginByToken.js';
import jwt from 'jsonwebtoken';
import { privateKey } from '../../config/default.js';

const router = express.Router();

router.post('/login', urlencodedParser, async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // 根据账号密码查询数据库，匹配则登录成功
    try {
      const user = await User.findOne({ username, password: md5(password) });
      if (user) {
        const token = jwt.sign(
          {
            username: user.username,
            _id: user._id,
          },
          privateKey,
          { expiresIn: '7d' },
        );
        // 返回 token
        res.json({
          code: 0,
          msg: '',
          data: token,
        });
      } else {
        res.json({
          code: -1,
          msg: '账号或密码错误',
          data: null,
        });
      }
    } catch (err) {
      console.error(err);
      res.json({
        code: -1,
        msg: '登录失败',
        data: null,
      });
    }
  } else {
    res.json({
      code: -1,
      msg: '请提供用户名和密码',
      data: null,
    });
  }
});

// 带 token 验证的接口
router.get('/list', checkLoginByToken, (req, res) => {
  console.log({
    user: req.user,
  });
  res.json({
    code: 0,
    msg: '',
    data: [
      {
        name: '张三',
        age: 18,
      },
    ],
  });
});

export default router;
