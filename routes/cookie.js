import express from 'express';
const router = express.Router();

router.get('/set', (req, res) => {
  res.cookie('name', 'shen'); // session
  res.cookie('cart', { items: [1, 2, 3] }, { maxAge: 60 * 1000 }); // 强缓存
  res.send('set cookie');
});

router.get('/clear', (req, res) => {
  res.clearCookie('name');
  res.clearCookie('cart');
  res.send('clear cookie');
});

router.get('/get', (req, res) => {
  // console.log(req.cookies);
  res.json(req.cookies);
});

export default router;
