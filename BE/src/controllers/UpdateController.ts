import { Request, Response } from "express";
import UpdateUserService from "../services/UpdateUserService";

class UpdateContoller {
    async update(req: Request, res: Response) {
    
        UpdateUserService.update(req, res)
    }
}
export default new UpdateContoller();