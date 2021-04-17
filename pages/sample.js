var ccxt = require ('ccxt')
function Sample({ market_name, trades }) {
    return (
      <main>
      <h1>{market_name}</h1>
      <ul>
        {trades.map((trade) => (
          <li key={trade.timestamp}>{trade.datetime}</li>
        ))}
      </ul>
      </main>
    )
  }

// This function gets called at build time
export async function getStaticProps() {
    // Call an external API endpoint to get posts
    let kraken = new ccxt.kraken () // log HTTP requests
    await kraken.load_markets () // request markets
    // console.log (kraken.id, kraken.markets)    // output a full list of all loaded markets
    console.log (Object.keys (kraken.markets)) // output a short list of market symbols
    console.log (Object.keys(kraken.markets['BTC/USD']))    // output single market details
    // console.log(mart)
    const res = await kraken.fetchTrades ('ETH/USDT');
    console.log(Object.keys('res'));
    console.log(res.length)
    console.log(res["0"])
    console.log(res["1"])
    console.log(res["2"])
    const trade_info = res.map((trade) => ({"timestamp":trade.timestamp, "datetime":trade.datetime}))
    // let pairs = await kraken.publicGetSymbolsDetails ()
    // let marketIds = Object.keys (pairs['result'])
    // let marketId = marketIds[0]
    // let ticker = await kraken.publicGetTicker ({ pair: marketId })
    // console.log (kraken.id, marketId, ticker)
    return {
      props: {
        market_name: kraken.id,
        trades: trade_info,
      },
    }
  }


export default Sample