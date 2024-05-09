import express from 'express';

const router = express.Router();

router.get('/if', (req, res) => {
  res.render('if', { isLogin: Math.random() > 0.5 });
});

router.get('/list', (req, res) => {
  res.render('list', { users: ['shen', 'yu', 'jiang', 'chen'] });
});

export default router;
