import express from 'express';
import path from 'node:path';
import birds from './routes/birds.js';
import singers from './routes/singers.js';
import response from './routes/response.js';
import record from './middlewares/record.js';
import auth from './routes/auth.js';
import ejs from './routes/ejs.js';
import upload from './routes/upload.js';
import { dbUrl } from './config/dbConfig.js';
import connect from './mongodb/db.js';
import book from './routes/api/book.js';
import cookie from './routes/cookie.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import checkLogin from './middlewares/checkLogin.js';
import authByToken from './routes/api/authByToken.js';

const app = express();
const port = 3000;

// 设置模板引擎
app.set('views', './views');
app.set('view engine', 'ejs');

// 全局中间件
app.use(record);
app.use(cookieParser());
app.use(
  session({
    name: 'sid', // 设置 cookie 的 name，默认值是：connect.sid
    secret: 'atguigu', // 参与加密的字符串（又称签名），又称为加盐
    saveUninitialized: false, // 是否为每次请求都设置一个 cookie 用来存储 session 的 id。给匿名用户记录一些信息时可以使用
    resave: true, // 是否在每次请求时重新保存session
    // 将 session 保存到数据库
    store: MongoStore.create({
      mongoUrl: dbUrl,
    }),
    cookie: {
      httpOnly: true, // 仅服务端可操作 cookie
      maxAge: 1000 * 300, // 控制 sessionID 的过期时间，同时也控制 cookie
    },
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/birds', birds);
app.use('/singers', singers);
app.use('/response', response);
app.use('/auth', auth);
app.use('/ejs', ejs);
app.use('/upload', checkLogin, upload);
app.use('/book', book);
app.use('/cookie', cookie);
app.use('/token', authByToken);

app.use(
  express.static(path.join(process.cwd(), 'public'), {
    maxAge: 60 * 1000, // 单位为毫秒
  }),
);

async function start() {
  await connect(dbUrl);
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
  });
}

start();
