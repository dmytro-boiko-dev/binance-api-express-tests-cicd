import request from 'supertest';
import app from '../app';

describe('Express API', () => {
    it('should return health status', async () => {
        // @ts-ignore
        const res = await request(app).get('/api/prices/health');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('ok');
    });

    it('should echo back posted data', async () => {

        const data = {
            "pair": "BTCUSDT",
            "period": "1d"
        };

        // @ts-ignore
        const res = await request(app)
            .post('/api/prices/')
            .send(data);
        expect(res.statusCode).toBe(200);
        expect(res.body.dynamic).toBe('INCREASED');
        expect(parseFloat(res.body.priceChange)).not.toBe(0);
    });
});