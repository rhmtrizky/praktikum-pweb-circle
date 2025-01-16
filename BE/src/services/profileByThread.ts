import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import { Request, Response } from "express";
import { Thread } from "../entities/Thread";


class ProfileByThread {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const threads = await this.userRepository.findOne({
            where : {
                id: id
            },
            relations : ["threads","threads.user"]
        })
        console.log("ashdsayhd", threads)
    
        return res.status(200).json(threads)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

export default new ProfileByThread()