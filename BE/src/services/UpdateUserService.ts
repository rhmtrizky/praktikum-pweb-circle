import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../data-source';
import { Request, Response } from 'express';
import { updateUserSchema } from '../utils/threads';
import * as amqp from 'amqplib';
import sendMessageToQueue from '../libs/Rabbitmq';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

class UpdateUserService {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  async update(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id);
    const { username, full_name, description, picture } = req.body;
    const filename = res.locals.filename;

    try {
      const userData = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
      });

      let updatedPictureURL = userData.picture;
      if (filename) {
        const cloudinaryResponse = await cloudinary.uploader.upload('./uploads/' + filename);
        updatedPictureURL = cloudinaryResponse.url;
      } else {
        userData.picture = userData.picture;
      }

      if (username !== null && username !== '') {
        userData.username = username;
      } else {
        userData.username = userData.username;
      }

      if (full_name !== null && full_name !== '') {
        userData.full_name = full_name;
      } else {
        userData.full_name = userData.full_name;
      }

      if (description !== null && description !== '') {
        userData.description = description;
      } else {
        userData.description = userData.description;
      }

      userData.picture = updatedPictureURL;

      const updatedUserData = await this.userRepository.save(userData);
      return res.status(200).json(`Data successfully updated: ${JSON.stringify(updatedUserData)}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new UpdateUserService();
