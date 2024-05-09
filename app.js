import express from 'express';
import path from 'node:path';
import birds from './routes/birds.js';
import singers from './routes/singers.js';
import response from './routes/response.js';
import record from './middlewares/record.js';
import login from './routes/login.js';
import ejs from './routes/ejs.js';

const app = express();
const port = 3000;

// 设置模板引擎
app.set('views', './views');
app.set('view engine', 'ejs');

// 全局中间件
app.use(record);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/birds', birds);
app.use('/singers', singers);
app.use('/response', response);
app.use('/login', login);
app.use('/ejs', ejs);

app.use(
  express.static(path.join(process.cwd(), 'public'), {
    maxAge: 60 * 1000, // 单位为毫秒
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
