import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import priceRoutes from './routes/priceRoute';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/prices', priceRoutes);

export default app;