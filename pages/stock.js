import React from 'react'
import { Row, Col, Card, Tag, Statistic, Table, Typography, Layout, Divider, Button } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  MoneyCollectOutlined,
  DollarCircleOutlined
} from '@ant-design/icons'
import Stock from '@ant-design/charts/lib/stock'
import { useRouter } from 'next/router'
import Link from 'next/link'
const ccxt = require('ccxt')
const { Title } = Typography
const { Header, Content, Footer } = Layout
const StockVis = data => {
  const router = useRouter()
  let pair = router.query.pair
  let markets = router.query.market
  pair = pair.replace('-', '/')
  let marketsArray = markets.split('-')
  let marketCount = marketsArray.length
  const gridSize = 24 / marketCount
  const columns = [
    {
      title: 'Exchange',
      dataIndex: 'name'
    },
    {
      title: 'Bid',
      dataIndex: 'bid',
      sorter: {
        compare: (a, b) => a.bid - b.bid,
        multiple: 3
      }
    },
    {
      title: 'Ask',
      dataIndex: 'ask',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2
      }
    },
    {
      title: 'Spread',
      dataIndex: 'spread',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1
      }
    }
  ]
  return (
    <Layout>
      <Header style={{ height: '100px' }}>
        <Title style={{ color: '#ffffff', marginTop: '25px' }}>
          <DollarCircleOutlined style={{ color: '#ffffff' }} />
          {pair}
        </Title>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Row gutter={24} style={{ marginTop: 24 }}>
          <Col span={24} style={{ marginBottom: 24 }}>
            <Card title={'Current Best Price'}>
              <Table
                columns={columns}
                dataSource={data.orderBooks}
                pagination={false}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24} style={{ marginBottom: 24 }}>
            <Card title={'Historical Best Price'}>
              <Row>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title='Max Value to Sell'
                      value={data.maxSell.val}
                      precision={6}
                      valueStyle={{ color: '#cf1322' }}
                      prefix={<ArrowUpOutlined />}
                      suffix={
                        <Tag color='error'>{data.maxSell.marketName}</Tag>
                      }
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title='Min Value to Buy'
                      value={data.minBuy.val}
                      precision={6}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<ArrowDownOutlined />}
                      suffix={
                        <Tag color='success'>{data.minBuy.marketName}</Tag>
                      }
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title='Profit'
                      value={data.profit}
                      precision={2}
                      valueStyle={{ color: '#FFD700' }}
                      prefix={<MoneyCollectOutlined />}
                      suffix='%'
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Card title={'Historical Trends'}>
              <Row>
                {data.stockData.map(marketData => (
                  <Col span={gridSize} style={{ marginBottom: 24 }}>
                    <Card title={marketData.name} bordered={false}>
                      <Stock
                        data={marketData.data}
                        xField={'trade_date'}
                        yField={['open', 'close', 'high', 'low']}
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
        <Divider plain></Divider>
          <Row justify='space-around' style={{ marginBottom: 24 }}>
            <Link href={"/"}>
              <Button
                type='primary'
                style={{
                  width: 300,
                  height: 40,
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                Back
              </Button>
            </Link>
          </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const namesAll = ['Binance', 'Huobi Pro', 'Coinbase Pro', 'Kraken']
  let pair = context.query.pair
  let markets = context.query.market
  let timeframe = context.query.timeframe
  pair = pair.replace('-', '/')
  let marketsArray = markets.split('-')
  let namesCurrent = marketsArray.map(item => namesAll[parseInt(item)])
  let stockData = []
  let minPrice = []
  let maxPrice = []
  let orderBooks = []
  for (let i = 0; i < marketsArray.length; i++) {
    let market = marketsArray[i]
    let exchange
    let name
    switch (parseInt(market)) {
      case 0:
        exchange = new ccxt.binance()
        name = 'Binance'
        break
      case 1:
        exchange = new ccxt.huobipro()
        name = 'Huobi Pro'
        break
      case 2:
        exchange = new ccxt.coinbasepro()
        name = 'Coinbase Pro'
        break
      case 3:
        exchange = new ccxt.kraken()
        name = 'Kraken'
        break
    }
    let ohlcv = await exchange.fetchOHLCV(pair, timeframe)
    let orderbook = await exchange.fetchOrderBook(pair)
    let bid = orderbook.bids.length ? orderbook.bids[0][0] : undefined
    let ask = orderbook.asks.length ? orderbook.asks[0][0] : undefined
    let spread = bid && ask ? ask - bid : undefined
    let series
    switch (timeframe) {
      case '1m':
        series = ohlcv.slice(-60)
        break
      case '5m':
        series = ohlcv.slice(-72)
        break
      case '1h':
        series = ohlcv.slice(-24)
        break
      case '1d':
        series = ohlcv.slice(-30)
        break
      case '1w':
        series = ohlcv.slice(-12)
        break
      case '15m':
        series = ohlcv.slice(-36)
        break
    }
    let data = series.map(x => ({
      trade_date: new Date(x[0]).toISOString(),
      close: x[3],
      open: x[1],
      high: x[2],
      low: x[3]
    }))
    stockData.push({ data: data, name: name, key: i })
    minPrice.push(Math.min(...data.map(item => item.low)))
    maxPrice.push(Math.max(...data.map(item => item.high)))
    orderBooks.push({
      key: i,
      name: namesCurrent[i],
      bid: bid,
      ask: ask,
      spread: spread
    })
  }
  const maxVal = Math.max(...maxPrice)
  const minVal = Math.min(...minPrice)
  return {
    props: {
      namesCurrent: namesCurrent,
      stockData: stockData,
      maxSell: {
        marketName: namesCurrent[maxPrice.indexOf(maxVal)],
        val: maxVal
      },
      minBuy: {
        marketName: namesCurrent[minPrice.indexOf(minVal)],
        val: minVal
      },
      profit: ((maxVal - minVal) / minVal) * 100,
      orderBooks: orderBooks
    }
  }
}

export default StockVis
