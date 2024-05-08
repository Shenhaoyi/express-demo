import express from 'express';
import path from 'node:path';
import birds from './routes/birds.js';
import singers from './routes/singers.js';
import response from './routes/response.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/birds', birds);
app.use('/singers', singers);
app.use('/response', response);


app.use(
  express.static(path.join(process.cwd(), 'public'), {
    maxAge: 60 * 1000, // 单位为毫秒
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
