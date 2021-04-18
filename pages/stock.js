import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
// import StockChart from '../components/StockChart'
// import {Stock} from '@ant-design/charts'
import Stock from '@ant-design/charts/lib/stock';
const ccxt = require ('ccxt');
// const StockChartWithNoSSR = dynamic(
//   import('../components/StockChart'),
//   { ssr: false }
// )

const StockVis = (data) => {
    console.log(data)
    var config = {
        width: 400,
        height: 500,
        data: data.data,
        xField: 'trade_date',
        yField: ['open', 'close', 'high', 'low'],
      };
    return <Stock {...config} />;
}

export async function getStaticProps(){
    const exchange = new ccxt.kraken ()
    const ohlcv = await exchange.fetchOHLCV ('BTC/USD', '1h')
    const series = ohlcv.slice(-24).map (x => ({"trade_date":new Date(x[0]).toISOString(),"close":x[3], "open":x[1], "high":x[2], "low":x[3], }))
    return {
        props:{
            data: series
        }
    }
}

export default StockVis;