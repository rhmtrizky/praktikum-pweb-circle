import sendMessageToQueue from '../libs/Rabbitmq';
import { createThreadSchema } from '../utils/threads';
import { Request, Response } from 'express';

class ThreadsQueue {
  async create(req: Request, res: Response) {
    try {
      const queueName = 'threads-queue';
      const filename = res.locals.filename;
      const data = req.body;

      const threadCreate = {
        content: data.content ? data.content : '',
        image: filename,
        // user: user
      };

      const { error } = createThreadSchema.validate(threadCreate);

      if (error) {
        return res.status(400).json({ 'message noh bos': error });
      }
      const loginSession = res.locals.loginSession;

      const payload = {
        content: data.content ? threadCreate.content : '',
        image: threadCreate.image ? threadCreate.image : '',
        user: loginSession.user,
      };

      const queueError = await sendMessageToQueue(queueName, payload);

      if (queueError) {
        return res.status(500).json({ message: queueError });
      }

      res.status(200).json({
        message: 'thread is queue',
        threadCreate: payload,
      });
    } catch (error) {
      res.status(500).json({ error: 'something wrong in server' });
      console.log('error when enqueuing', error);
    }
  }
}

export default new ThreadsQueue();
