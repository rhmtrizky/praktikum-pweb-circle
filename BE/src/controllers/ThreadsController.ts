import * as express from 'express';
import { Request, Response } from 'express';
import ThreadsService from '../services/ThreadsServices';
import UpdateUserService from '../services/UpdateUserService';

class ThreadsController {
  async find(req: Request, res: Response) {
    ThreadsService.find(req, res);
  }
  async findThreadById(req: Request, res: Response) {
    ThreadsService.findThreadsByUser(req, res);
  }
  async findOne(req: Request, res: Response) {
    ThreadsService.findOne(req, res);
  }
  async delete(req: Request, res: Response) {
    ThreadsService.delete(req, res);
  }
  // async update(req: Request, res: Response) {
  //     UpdateService.update(req, res)
  // }
}

export default new ThreadsController();
