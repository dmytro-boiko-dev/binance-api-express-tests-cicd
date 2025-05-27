## Binance price getter

### Setup & run project

Install dependencies:

```text
npm install
```

Run project:

```text
npm run dev
```

## API description

1. Get prices data for a pair for a specified period:  
   Request:

```
POST /api/prices
```

Request body:

```text
{
    "pair": "BTCUSDT",
    "period": "1d"
}
```

Full URL (for localhost):

```text
http://localhost:3000/api/prices
```

Response example:

```text
{
    "pair": "BTCUSDT",
    "timePeriod": "1d",
    "dynamic": "INCREASED",
    "priceChange": "4577.45000000",
    "priceChangePercent": "4.314"
}
```

## Tests

1. run app:

```text
npm run dev
```

2. run tests:

```text
npm run test
```

### Docs

Binance API docs:

```text
https://developers.binance.com/docs/binance-spot-api-docs/rest-api/market-data-endpoints#rolling-window-price-change-statistics
```