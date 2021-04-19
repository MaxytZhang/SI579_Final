# SI579 Final Project - CoinHub
## Demo
[CoinHub](https://coinhub.vercel.app/)
## Team Members & Contribution
- Yangtao Zhang 
  - react components
  - data fetching with CCTX api
  - routing
  - visualization
  - deployment
- Shukai Fan
  - react components
  - visualization
  - documentation
  - design implementation
  - website polishment
- Yuhen Xie
  - wireframe layout
  - visualization
  - design specilization
  - website polishment

## Intuition
Crypto currencies have been a hot topic as their values explode. Apart from Bitcoin (BTC) and Ethereum (ETH), there are various crypto currencies traded among different exchanges. While it's the common practice to trade one crypto currency with another, e.g. ETH-BTC, the ratio between two crypto currencies differs exchange by exchange. So it's totally possible for buy with a lower ratio from one exchange and then sell with a higher ratio to another exchange and thus benefiting from it.

## Tech Stack
- [React.js](https://reactjs.org/)
- [Next.js](https://nextjs.org/) React Framework
for Production
- [Ant Design](https://ant.design/) React UI library
With complex scenarios, designers and developers often need to respond fast due to frequent changes in product demands and concurrent R & D workflow. Many similar contents exist in the process. Through abstraction, developers could obtain some stable and highly reusable components and pages. On the other hand, with the trend of commercialization, more and more enterprise products begin to pursue better user experiences. Under this situation, Ant User-Experience Design Team builds a design system for enterprise products based on four design values of Natural, Certain, Meaningful, and Growing. It aims to uniform the user interface specs and reduce redundancies and excessive production costs, helping product designers to focus on better user experience.

This package mainly support all the UI design conponents for our website and also build up the general layout of our website under the react framework. 

- [Ant Design Charts](https://charts.ant.design/) Chart Library
"Ant Design Charts" is a simple and easy to use React chart library, which support for a full range of G2Plot charts with nearly simultaneous updates.

The candlestick chart for the cryptro is implemented based on this package.

- [CCXT](https://github.com/ccxt/ccxt) CryptoCurrency eXchange Trading Library
The CCXT library is used to connect and trade with cryptocurrency exchanges and payment processing services worldwide. It provides quick access to market data for storage, analysis, visualization, indicator development, algorithmic trading, strategy backtesting, bot programming, and related software engineering.
It is intended to be used by coders, developers, technically-skilled traders, data-scientists and financial analysts for building trading algorithms.
Current feature list:
1. support for many cryptocurrency exchanges — more coming soon
2. fully implemented public and private APIs
3. optional normalized data for cross-exchange analytics and arbitrage
4. an out of the box unified API that is extremely easy to integrate
5. works in Node 7.6+, Python 3, PHP 5.4+, and web browsers

- [Yarn](https://yarnpkg.com/) Project Manager
Fast, reliable, and secure dependency management.
1. Fast: Yarn caches every package it has downloaded, so it never needs to download the same package again. It also does almost everything concurrently to maximize resource utilization. This means even faster installs.
2. Reliable: Using a detailed but concise lockfile format and a deterministic algorithm for install operations, Yarn is able to guarantee that any installation that works on one system will work exactly the same on another system.
3. Secure: Yarn uses checksums to verify the integrity of every installed package before its code is executed.

- [Webpack](https://webpack.js.org/) Module Bundler

- [Vercel](https://vercel.com/) Deployment Platform
This is the deployment platform we utilized for our website. For development process, this package enable fast refresh, flexible data fetching and edge on localhost. For online deployment, this package makes it a collaborative experience with deploy previews for every code change, by seamlessly integrating with remote repository like Github and Gitlab. Moreover, this package enable merged changes instantly go live on the global edge network with delightful speed.