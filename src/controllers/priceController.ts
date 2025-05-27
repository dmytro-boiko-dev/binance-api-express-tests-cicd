import {Request, Response} from 'express';
import axios from 'axios';
import {IBinancePrice} from '../interfaces/IBinancePrice';

const BINANCE_API_URL = 'https://api.binance.com/api/v3/ticker';

interface ResponseData {
    pair: string;
    timePeriod: string;
    dynamic: string;
    priceChange: string;
    priceChangePercent: string;
}

export const healthCheck = (req: Request, res: Response) => {

    const data = {
        status: 'ok',
    };

    res.json(data);
}

export const getPrices = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. fetch prices
        const pair = req.body.pair;
        const timePeriod = req.body.period;

        const combinedUrl = BINANCE_API_URL + `?symbol=${pair}&windowSize=${timePeriod}`

        const response = await axios.get<IBinancePrice>(combinedUrl);

        // @ts-ignore
        const {symbol, priceChange, priceChangePercent} = response.data;

        // console.log(`Fetched price for ${symbol}`);
        // console.log(`Time period ${timePeriod}`);

        // 2. analyze price
        if (Number(priceChange) > 0) {
            // console.log(`Price change dynamic: INCREASED`);
            // console.log(`Absolute price change: ${priceChange}`);
            // console.log(`Price change in percent: ${priceChangePercent}`);

            let data: ResponseData = {
                pair: symbol,
                timePeriod: timePeriod,
                dynamic: "INCREASED",
                priceChange: priceChange,
                priceChangePercent: priceChangePercent,
            };

            res.json(data);

        } else {
            // console.log(`Price change dynamic: DECREASED`);
            // console.log(`Absolute price change: ${priceChange}`);
            // console.log(`Price change in percent: ${priceChangePercent}`);

            let data: ResponseData = {
                pair: symbol,
                timePeriod: timePeriod,
                dynamic: "DECREASED",
                priceChange: priceChange,
                priceChangePercent: priceChangePercent,
            };

            res.json(data);
        }


    } catch (error) {
        console.error('Error fetching/storing price:', error instanceof Error ? error.message : 'Unknown error');
    }
};