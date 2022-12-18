import { Router } from 'express';
import { getRank } from '../controllers/rank';

const router = Router();

router.post('/', getRank);

export default router;
