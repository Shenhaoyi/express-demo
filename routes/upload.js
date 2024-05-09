import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import formidable from 'formidable';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'upload.html'));
});

const staticFolder = 'uploads';
const absoluteStaticFolder = path.resolve(process.cwd(), 'public', staticFolder);

router.post('/', (req, res) => {
  if (!fs.existsSync(absoluteStaticFolder)) {
    fs.mkdirSync(absoluteStaticFolder);
  }
  const form = formidable({
    uploadDir: absoluteStaticFolder, // 设置上传目录
    keepExtensions: true, // 保持文件后缀名
  });

  form.parse(req, (err, fields, files) => {
    // fields 是普通字段；files 是上传的文件
    if (err) {
      return;
    }
    // files 的字段对应文件的上传时 input 的 name 属性
    const { newFilename } = files.file[0];
    const filePath = path.join(staticFolder, newFilename); // TODO:保存到数据库中
    // res.json({ fields, files, newFilename, filePath });
    res.send(`<h1>上传成功</h1><img src="${filePath}"/>`); // 预览图片
  });
});

export default router;
