import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { singers } = require('../JSON/singers.json');

const router = express.Router();

router.get('/:id.html', (req, res) => {
  const { id } = req.params;
  const singer = singers.find((s) => s.id === Number(id));
  if (singer) {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <img src="${singer.singer_pic}" alt="Image">
      </body>
      </html>
    `);
  } else {
    res.status(404).send('404 Not FOUND');
  }
});

export default router;
