import mongoose from 'mongoose';
import chalk from 'chalk';

mongoose.connection.once('open', async () => {
  console.log(chalk.green('MongoDb connected'));
});

mongoose.connection.on('error', (error) => {
  console.error(chalk.red('Error in MongoDb connection: ' + error));
});

mongoose.connection.on('close', () => {
  console.log(chalk.green('MongoDb connection closed'));
});

export default async function connect(dbUrl) {
  /*
    连接 mongodb 服务
      默认端口可以省略
      test 为数据库名
  */
  await mongoose.connect(dbUrl);
}
