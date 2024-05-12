import path from 'node:path';

export default function (req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.sendFile(path.join(process.cwd(), 'public', 'login.html'));
  }
}
