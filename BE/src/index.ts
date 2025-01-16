import { AppDataSource } from './data-source';
import router from './route';
var express = require('express');
var cors = require('cors');
var app = express();

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(express.json());
    app.use(cors());

    app.use('/api/v1', router);

    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
