import * as amqp from 'amqplib';
import { v2 as cloudinary } from 'cloudinary';
import { AppDataSource } from '../data-source';
import { Thread } from '../entities/Thread';
import { EventEmitter } from 'stream';

class ThreadWorker {
  public emitter = new EventEmitter();
  async createThread(queueName: string, connection: amqp.Connection) {
    try {
      const channel = await connection.createChannel();
      await channel.assertQueue(queueName);
      await channel.consume(queueName, async (message) => {
        if (message !== null) {
          try {
            const payload = JSON.parse(message.content.toString());
            let cloudinaryResponse: any;

            if (payload.image) {
              cloudinaryResponse = await cloudinary.uploader.upload('./uploads/' + payload.image);
              console.log('testing', cloudinaryResponse.secure_url);
            }
            const thread = AppDataSource.getRepository(Thread).create({
              content: payload.content ? payload.content : '',
              image: payload.image ? cloudinaryResponse.secure_url : '',
              user: payload.user,
            });
            // Save the thread after creating it
            const createdThread = await AppDataSource.getRepository(Thread).save(thread);
            console.log(createdThread);

            this.emitter.emit('message');
            console.log('Thread has been created');
            channel.ack(message);
          } catch (error) {
            console.log('Failed to create thread', error);
          }
        }
      });
    } catch (error) {
      console.error({ error: 'Processing queue is error' });
    }
  }
}
export default new ThreadWorker();
