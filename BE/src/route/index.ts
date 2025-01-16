import * as express from 'express';
import { Request, Response } from 'express';
import ThreadsController from '../controllers/ThreadsController';
import Authenticate from '../middlerwares/AuthMiddleware';
import AuthController from '../controllers/AuthController';
import { Upload } from '../middlerwares/Upload';
import ThreadsQueue from '../queues/TheadsQueue';
import RepliesController from '../controllers/RepliesController';
import LikesController from '../controllers/LikeController';
import ProfileByIdController from '../controllers/ProfileByIdController';
import FollowsController from '../controllers/FollowsController';
import updateController from '../controllers/UpdateController';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!');
});

// router.get("/threads", ThreadsController.find)
router.get('/threads', Authenticate, ThreadsController.find);
router.get('/threads/profile', Authenticate, ThreadsController.findThreadById);
router.post('/threads', Authenticate, Upload('image'), ThreadsQueue.create);
router.get('/thread/:id', Authenticate, ThreadsController.findOne);
router.patch('/editProfile/:id', Authenticate, Upload('picture'), updateController.update);
router.get('/profile/:id', Authenticate, ProfileByIdController.findOne);
router.delete('/thread/delete/:id', Authenticate, ThreadsController.delete);
// router.patch("/thread/update", ThreadsController.update)

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/check', Authenticate, AuthController.check);

router.get('/replies', Authenticate, RepliesController.find);
router.post('/reply', Authenticate, RepliesController.create);

router.post('/like', Authenticate, LikesController.create);
router.delete('/like/:thread_id', Authenticate, LikesController.delete);

router.get('/follows', Authenticate, FollowsController.find);
router.post('/follow', Authenticate, FollowsController.create);
router.delete('/follow/:followed_user_id', Authenticate, FollowsController.delete);

export default router;
