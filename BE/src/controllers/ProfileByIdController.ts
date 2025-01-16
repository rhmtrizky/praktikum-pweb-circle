import { Request, Response } from "express";
import profileByThread from "../services/profileByThread";


class ProfileByIdController {
    async findOne(req: Request, res: Response) {
        profileByThread.findOne(req, res)
    }
}
export default new ProfileByIdController();