import express from 'express';
import { urlencodedParser } from '../middlewares/body.js';
import path from 'node:path';

const router = express.Router();

router.get('/', (req, res) => {
  // 能从 session从读到 username，说明 sid 存在且能在 session 中匹配到
  if (req.session.username) {
    res.redirect('/');
  } else {
    res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
  }
});

router.post('/', urlencodedParser, (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    req.session.username = username;
    req.session.uid = Math.random().toString().slice(2);
    res.send("<button><a href='/login/logout'>logout</a></button>");
  } else {
    res.send('请提供用户名和密码');
  }
});

router.get('/logout', urlencodedParser, (req, res) => {
  // 删除 session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect('/login');
  });
});

export default router;
