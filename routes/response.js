import express from 'express';
import path from 'node:path';
const router = express.Router();

router.get('/404', (req, res) => {
  res.status(404).set('xxx', 'yyy').send('NOT FOUND');
});
router.get('/redirect', (req, res) => {
  res.redirect('./download');
});
router.get('/download', (req, res) => {
  res.download(path.join(process.cwd(), 'public', 'text.txt'));
});
router.get('/json', (req, res) => {
  res.json({ name: 'shen' });
});
router.get('/sendfile', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

export default router;
