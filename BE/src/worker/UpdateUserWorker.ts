import * as amqp from 'amqplib';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { log } from 'console';
import { EventEmitter } from 'stream';

// async function UpdateUserQueue() {
//   const queueName = 'update-user-queue';
//   cloudinary.config({
//     cloud_name: process.env.cloud_name,
//     api_key: process.env.api_key,
//     api_secret: process.env.api_secret,
//   });
//   try {
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     await channel.assertQueue(queueName);

//     await channel.consume(queueName, async (message) => {
//       console.log('masuk sini');

//       if (message !== null) {
//         try {
//           const payload = JSON.parse(message.content.toString());
//           let cloudinaryResponse: any;

//           if (payload.picture) {
//             cloudinaryResponse = await cloudinary.uploader.upload('./uploads/' + payload.picture);
//           }
//           console.log('cloudinary picture', cloudinaryResponse);

//           const user = AppDataSource.getRepository(User).create({
//             full_name: payload.full_name ? payload.fullname : '',
//             username: payload.username ? payload.username : '',
//             picture: payload.picture ? cloudinaryResponse.secure_url : '',
//             description: payload.description ? payload.description : '',
//           });

//           user.id = payload.user_id;

//           const createdUser = await AppDataSource.getRepository(User).save(user);

//           channel.ack(message);
//         } catch (error) {
//           console.log('Error processing update user queue: ', error);
//         }
//       }
//     });
//   } catch (error) {
//     console.log('Error processing update user queue: ', error);
//   }
// }

// AppDataSource.initialize().then(async () => {
//   UpdateUserQueue();
// });

class UpdateUserWorker {
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

            if (payload.picture) {
              cloudinaryResponse = await cloudinary.uploader.upload('./uploads/' + payload.picture);
              console.log('testing', cloudinaryResponse.secure_url);
            }
            const user = AppDataSource.getRepository(User).create({
              full_name: payload.full_name ? payload.fullname : '',
              username: payload.username ? payload.username : '',
              picture: payload.picture ? cloudinaryResponse.secure_url : '',
              description: payload.description ? payload.description : '',
            });
            // Save the thread after creating it
            const createdThread = await AppDataSource.getRepository(User).save(user);
            console.log(createdThread);

            this.emitter.emit('message');
            console.log('Update user has been updated');
            channel.ack(message);
          } catch (error) {
            console.log('Failed to update user', error);
          }
        }
      });
    } catch (error) {
      console.error({ error: 'Processing queue is error' });
    }
  }
}
export default new UpdateUserWorker();
