import express from 'express';
import { urlencodedParser } from '../middlewares/body.js';
import path from 'node:path';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
});

router.post('/', urlencodedParser, (req, res) => {
  console.log(req.body); // 输出解析后的请求体
  res.send('登录成功');
});

export default router;
