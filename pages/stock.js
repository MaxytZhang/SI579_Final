import React, {Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Tag, Statistic, Form, Select, InputNumber, Switch, Slider, Button } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import Stock from '@ant-design/charts/lib/stock';
import { useRouter } from 'next/router'
const ccxt = require ('ccxt');

const StockVis = (data) => {
    const router = useRouter()
    console.log(router.query)
    let pair = router.query.pair;
    let markets = router.query.market
    console.log(pair, markets)
    pair = pair.replace("-", "/")
    let marketsArray = markets.split("-")
    let marketCount = marketsArray.length;
    console.log(marketCount)
    console.log(data.stockData.length)
    const gridSize = 24 / marketCount;
    return (
        <Fragment>
        <Row>
            <Col span={8}>
            <Card>
                <Statistic
                    title="Max Value to Sell"
                    value={data.maxSell.val}
                    precision={6}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowUpOutlined />}
                />
                <Tag color="error">{data.maxSell.marketName}</Tag>
                </Card>
            </Col>
            <Col span={8}>
            <Card>
                <Statistic
                    title="Min Value to Buy"
                    value={data.minBuy.val}
                    precision={6}
                    valueStyle={{ color:  '#3f8600'}}
                    prefix={<ArrowDownOutlined />}
                />
                <Tag color="success">{data.minBuy.marketName}</Tag>
                </Card>
            </Col>
            <Col span={8}>
            <Card>
                <Statistic
                    title="Profit"
                    value={data.profit}
                    precision={2}
                    valueStyle={{ color: '#FFD700' }}
                    prefix={<MoneyCollectOutlined />}
                    suffix="%"
                />
                </Card>
            </Col>
        </Row>
        <Row>
            {
                data.stockData.map(marketData => (
                    <Col span={gridSize}>
                        <Card title={marketData.name} bordered={false}>
                    <Stock data={marketData.data} xField={'trade_date'} yField={['open', 'close', 'high', 'low']} />
                    </Card>
                    </Col>
                ))
            }
        </Row>
        </Fragment>
    );
}

export async function getServerSideProps(context){
    // const router = useRouter()
    // let {pair, markets, timeframe} = context.query
    const namesAll = ["Binance", "Huobi Pro", "Coinbase Pro", "Kraken"];
    let pair = context.query.pair;
    let markets = context.query.market
    let timeframe = context.query.timeframe
    pair = pair.replace("-", "/")
    console.log(pair, markets, timeframe)
    let marketsArray = markets.split("-")
    let namesCurrent = marketsArray.map(item => namesAll[parseInt(item)])
    let stockData = [];
    let minPrice = [];
    let maxPrice = [];
    for (let market of marketsArray){
        let exchange;
        let name;
        switch(parseInt(market)){
            case 0:
                exchange = new ccxt.binance()
                name = "Binance"
                break
            case 1:
                exchange = new ccxt.huobipro()
                name = "Huobi Pro"
                break
            case 2:
                exchange = new ccxt.coinbasepro()
                name = "Coinbase Pro"
                break
            case 3:
                exchange = new ccxt.kraken()
                name = "Kraken"
                break
        }
        let ohlcv = await exchange.fetchOHLCV (pair, timeframe)
        let series;
        switch(timeframe){
            case "1m":
                series = ohlcv.slice(-60)
                break
            case "5m":
                series = ohlcv.slice(-72)
                break
            case "1h":
                series = ohlcv.slice(-24)
                break
            case "1d":
                series = ohlcv.slice(-30)
                break
            case "1w":
                series = ohlcv.slice(-12)
                break
            case "15m":
                series = ohlcv.slice(-36)
                break
        }
        let data = series.map (x => ({"trade_date":new Date(x[0]).toISOString(),"close":x[3], "open":x[1], "high":x[2], "low":x[3], }))
        stockData.push({"data":data, "name":name})
        minPrice.push(Math.min(...data.map(item => item.low)))
        maxPrice.push(Math.max(...data.map(item => item.high)))
    }
    const maxVal = Math.max(...maxPrice)
    const minVal = Math.min(...minPrice)
    return {
        props:{
            stockData: stockData,
            maxSell: {marketName: namesCurrent[maxPrice.indexOf(maxVal)], val: maxVal},
            minBuy: {marketName: namesCurrent[minPrice.indexOf(minVal)], val: minVal},
            profit: (maxVal - minVal) / minVal * 100
        }
    }
}

export default StockVis;