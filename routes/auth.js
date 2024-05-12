import express from 'express';
import { urlencodedParser } from '../middlewares/body.js';
import path from 'node:path';
import User from '../models/users.js';
import md5 from 'md5';

const router = express.Router();

router.get('/register', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'register.html'));
});

router.post('/register', urlencodedParser, async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    try {
      const user = new User({
        username,
        password: md5(password),
      });
      await user.save();
      res.send("注册成功！<button><a href='/auth/login'>去登录</a></button>");
    } catch (error) {
      res.send('注册失败');
    }
  } else {
    res.send('请提供用户名和密码');
  }
});

router.get('/login', (req, res) => {
  // 能从 session从读到 username，说明 sid 存在且能在 session 中匹配到
  if (req.session.username) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
  }
});

router.post('/login', urlencodedParser, async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    // 根据账号密码查询数据库，匹配则登录成功
    try {
      const user = await User.findOne({ username, password: md5(password) });
      if (user) {
        // 设置 session
        req.session.username = user.username;
        req.session._id = user._id;
        res.send("登录成功<button><a href='/auth/logout'>logout</a></button>");
      } else {
        res.send('用户名或密码错误');
      }
    } catch (err) {
      console.error(err);
      res.send('登录失败');
    }
  } else {
    res.send('请提供用户名和密码');
  }
});

router.get('/logout', (req, res) => {
  // 删除 session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/auth/login');
  });
});

export default router;
