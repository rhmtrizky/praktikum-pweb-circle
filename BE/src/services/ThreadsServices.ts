import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Thread } from '../entities/Thread';

class ThreadsService {
  private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const { user } = res.locals.loginSession;

      const threads = await this.threadRepository.find({
        relations: ['user', 'likes.user', 'replies'],
        order: { id: 'DESC' },
      });

      const formattedThreads = threads.map((thread) => ({
        ...thread,
        likes_count: thread.likes.length,
        replies_count: thread.replies.length,
        is_liked: thread.likes.some((like) => like.user.id === user.id),
      }));

      return res.status(200).json(formattedThreads);
    } catch (error) {
      console.error('Error fetching threads:', error);
      return res.status(500).json({ error: 'Failed to fetch threads' });
    }
  }

  async findThreadsByUser(req: Request, res: Response): Promise<Response> {
    try {
      const { user } = res.locals.loginSession;

      const threads = await this.threadRepository.find({
        where: { user },
        relations: ['user', 'likes.user', 'replies'],
        order: { id: 'DESC' },
      });

      const formattedThreads = threads.map((thread) => ({
        ...thread,
        likes_count: thread.likes.length,
        replies_count: thread.replies.length,
        is_liked: thread.likes.some((like) => like.user.id === user.id),
      }));

      return res.status(200).json(formattedThreads);
    } catch (error) {
      console.error('Error fetching user threads:', error);
      return res.status(500).json({ error: 'Failed to fetch user threads' });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);

      const thread = await this.threadRepository.findOne({
        where: { id },
        relations: ['user', 'likes.user', 'replies'],
      });

      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      const formattedThread = {
        ...thread,
        likes_count: thread.likes.length,
        replies_count: thread.replies.length,
      };

      return res.status(200).json(formattedThread);
    } catch (error) {
      console.error('Error fetching thread:', error);
      return res.status(500).json({ error: 'Failed to fetch thread' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const { user } = res.locals.loginSession;

      const thread = await this.threadRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      if (thread.user.id !== user.id) {
        return res.status(403).json({ error: 'Unauthorized to delete this thread' });
      }

      // Save the thread data to return it later
      const deletedThread = { ...thread };

      await this.threadRepository.delete(id);

      return res.status(200).json({
        message: 'Thread successfully deleted',
        deletedThread,
      });
    } catch (error) {
      console.error('Error deleting thread:', error);
      return res.status(500).json({ error: 'Failed to delete thread' });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { content } = req.body;
      const { filename } = res.locals;
      const { user } = res.locals.loginSession;

      const newThread = this.threadRepository.create({
        content,
        image: filename,
        user,
      });

      const savedThread = await this.threadRepository.save(newThread);
      return res.status(201).json(savedThread);
    } catch (error) {
      console.error('Error creating thread:', error);
      return res.status(500).json({ error: 'Failed to create thread' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id, 10);
      const { content, image } = req.body;
      const { user } = res.locals.loginSession;

      const thread = await this.threadRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!thread) {
        return res.status(404).json({ error: 'Thread not found' });
      }

      if (thread.user.id !== user.id) {
        return res.status(403).json({ error: 'Unauthorized to update this thread' });
      }

      thread.content = content || thread.content;
      thread.image = image || thread.image;

      const updatedThread = await this.threadRepository.save(thread);
      return res.status(200).json(updatedThread);
    } catch (error) {
      console.error('Error updating thread:', error);
      return res.status(500).json({ error: 'Failed to update thread' });
    }
  }
}

export default new ThreadsService();
