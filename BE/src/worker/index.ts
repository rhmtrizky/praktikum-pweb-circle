import { AppDataSource } from '../data-source';
import cloudinaryConfig from '../libs/cloudinary';
import * as amqp from 'amqplib';
import ThreadWorker from './ThreadWorker';
import 'dotenv/config';

class Worker {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudinaryConfig();
        const connection = await amqp.connect('amqp://localhost');

        ThreadWorker.createThread('threads-queue', connection);
      })
      .catch((error) => console.error(error));
  }
}

export default new Worker();
