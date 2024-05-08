import fs from 'node:fs';
import path from 'node:path';

export default async function (req, res, next) {
  let { url, ip } = req;
  // 确保文件夹存在
  if (!fs.existsSync(path.resolve(process.cwd(), 'logs'))) {
    fs.mkdirSync(path.resolve(process.cwd(), 'logs'));
  }
  fs.appendFile(
    path.resolve(process.cwd(), 'logs', 'access.log'),
    `${url} ${ip} \r\n`, // 写入内容
    (err) => {
      if (!err) console.log('写入成功!');
      next();
    },
  );
}
