import mongoose from 'mongoose';
import chalk from 'chalk';
import Book from '../models/book.js';

/*
  连接 mongodb 服务
    默认端口可以省略
    test 为数据库名
*/
mongoose.connect('mongodb://127.0.0.1:27017/test');

mongoose.connection.once('open', async () => {
  console.log(chalk.green('MongoDb connected'));
  // 这里写入连接成功后的代码
  await Book.create({
    title: 'test',
    author: 'shen',
    price: 100,
  });
  console.log(chalk.green('Data created'));
});

mongoose.connection.on('error', (error) => {
  console.error(chalk.red('Error in MongoDb connection: ' + error));
});

mongoose.connection.on('close', () => {
  console.log(chalk.green('MongoDb connection closed'));
});
