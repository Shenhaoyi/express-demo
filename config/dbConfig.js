const config = {
  port: 27017,
  host: 'mongodb://127.0.0.1',
  database: 'test',
};

export const dbUrl = `${config.host}:${config.port}/${config.database}`;
export default config;
