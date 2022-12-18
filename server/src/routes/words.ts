import { Router } from 'express';
import { getWords } from '../controllers/words';

const router = Router();

// GET /feed/posts
router.get('/', getWords);

export default router;
