import path from 'node:path';
import { privateKey } from '../config/default.js';
import jwt from 'jsonwebtoken';

export default function (req, res, next) {
  const token = req.get('token');
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
    } else {
      // console.log({ decoded });
      req.user = decoded; // 放用户信息放到 req 上，这样就不用从数据库再去取一遍用户信息了
      next();
    }
  });
}
