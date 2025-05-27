import {Router} from 'express';
import {getPrices, healthCheck} from '../controllers/priceController';

const router = Router();

router.get('/health', healthCheck);

router.post('/', getPrices);

export default router;