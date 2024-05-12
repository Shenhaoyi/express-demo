import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.cookie('name', 'shen'); // session
  res.cookie('cart', { items: [1, 2, 3] }, { maxAge: 60 * 1000 }); // 强缓存
  res.send('set cookie');
});

export default router;
