/*eslint-disable no-console */

import compression from 'compression';
import config from './config';
import express from 'express';

export default function(param) {

  const app = express();

  app.use(compression());
  app.use('/build', express.static('build'));
  app.use('/assets', express.static('assets'));

  app.get('/', (req, res) => {
    res.sendFile(param.indexHtmlPath);
  });

  require('./apis')(app);

  app.listen(config.port);

  console.log(`App started on port ${config.port}`);
}
