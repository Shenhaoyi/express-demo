import Book from '../../models/book.js';
import { urlencodedParser } from '../../middlewares/body.js';

import express from 'express';
const router = express.Router();

// 查询所有图书
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      code: 0,
      msg: '',
      data: books,
    });
  } catch (error) {
    res.json({
      code: -1,
      msg: '查询图书失败',
      data: null,
    });
  }
});

// 查询单个图书
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({
      code: 0,
      msg: '',
      data: book,
    });
  } catch (error) {
    res.json({
      code: -1,
      msg: '查询图书失败',
      data: null,
    });
  }
});

// 创建图书
router.post('/', urlencodedParser, async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
    });
    await book.save();
    res.json({
      code: 0,
      msg: '创建图书成功',
      data: book,
    });
  } catch (error) {
    res.json({
      code: -1,
      msg: '创建图书失败',
      data: null,
    });
  }
});

// 局部更新图书
router.patch('/:id', urlencodedParser, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
      },
      { new: true },
    );
    res.json({
      code: 0,
      msg: '更新图书成功',
      data: book,
    });
  } catch (error) {
    res.json({
      code: -1,
      msg: '更新图书失败',
      data: null,
    });
  }
});

// 删除图书
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({
      code: 0,
      msg: '删除图书成功',
      data: null,
    });
  } catch (error) {
    res.json({
      code: -1,
      msg: '删除图书失败',
      data: null,
    });
  }
});

export default router;
