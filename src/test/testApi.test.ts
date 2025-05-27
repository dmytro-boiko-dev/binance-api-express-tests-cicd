import request from 'supertest';
import app from '../app';
import axios from 'axios';

// create API mock
jest.mock('axios');

beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
        // mock API response
        data: {
            "pair": "BTCUSDT",
            "timePeriod": "1d",
            "dynamic": "DECREASED",
            "priceChange": "-161.83000000",
            "priceChangePercent": "-0.148"
        },
        status: 200
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

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
        expect(['INCREASED', 'DECREASED']).toContain(res.body.dynamic);
        // expect(res.body.dynamic).toMatch(/^(INCREASED|DECREASED)$/); // or this
        expect(parseFloat(res.body.priceChange)).not.toBe(0);
    }, 10000); // 10 seconds timeout
});

afterEach(() => {
    jest.clearAllMocks();
});