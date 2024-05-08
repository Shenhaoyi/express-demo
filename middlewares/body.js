import bodyParser from 'body-parser';
const { json, text, raw, urlencoded } = bodyParser;

export const urlencodedParser = urlencoded({ extended: false });
