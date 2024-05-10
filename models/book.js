import mongoose from 'mongoose';

const { Schema } = mongoose;

// 描述并定义文档结构
const bookSchema = new Schema({
  title: String,
  author: String,
  price: Number,
});

// 创建文档模型，用于操作集合中的文档，第一个参数是集合名称
const Book = mongoose.model('Book', bookSchema);

export default Book;
