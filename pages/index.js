import { Form, Select, InputNumber, Switch, Slider, Button} from 'antd'
import { Row, Col, Divider, Checkbox } from 'antd';
import { Radio, Space } from 'antd';
import React, {Fragment, useState, useEffect, Component } from 'react';
import Link from 'next/link'

const content = {
  marginTop: '100px',
}


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        crypo: "ETH-BTC",
        markets: ["0"],
        timeframe: "1m"
    }
  }
  onChangeCrypo = (val) => {
    console.log(Object.keys(val))
    console.log(val)
    this.setState({
      "crypo": val.target.value,
    })
  }

  onChangeMarkets = (val) => {
    this.setState({
      "markets": val.sort(),
    })
  }

  onChangeTimeframe = (val) => {
    this.setState({
      "timeframe": val.target.value
    })
  }

  render (){
    const {crypo, markets, timeframe} = this.state;
    let url = "/stock?"
    let searchParams = new URLSearchParams();
    searchParams.append("pair", crypo)
    searchParams.append("market", markets.join("-"))
    searchParams.append("timeframe", timeframe)
    url += searchParams.toString()
    console.log(url)
  return(
    <div style={content}>
    <Row justify="space-around" style={{fontSize:38, fontWeight:'bold', color:'Black', marginBottom: 24}}>View &amp; Compare Crypto Info</Row>
    <Divider style={{fontSize:24, fontWeight:'bold', color:'Black'}} plain>Crypto</Divider>
    <Row justify="space-around" style={{fontSize:16, marginTop: -15, marginBottom: 24}}>Please choose the crypto you want to view.</Row>
    <Row justify="space-around">
      <Radio.Group defaultValue="ETH-BTC" buttonStyle="solid" onChange={this.onChangeCrypo}>
      <Row style={{marginBottom:24}}>
        <Radio.Button value="ETH-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>ETH/BTC</Radio.Button>
        <Radio.Button value="ZEC-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>ZEC/BTC</Radio.Button>
        <Radio.Button value="LTC-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>LTC/BTC</Radio.Button>
        <Radio.Button value="LINK-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 80, textAlign:'center', fontWeight:'bold'}}>LINK/BTC</Radio.Button>
      </Row>
      <Row style={{marginBottom:24}}>
        <Radio.Button value="ALGO-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>ALGO/BTC</Radio.Button>
        <Radio.Button value="OMG-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>OMG/BTC</Radio.Button>
        <Radio.Button value="ATOM-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>ATOM/BTC</Radio.Button>
        <Radio.Button value="DASH-BTC" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 80, textAlign:'center', fontWeight:'bold'}}>DASH/BTC</Radio.Button>
      </Row>
      </Radio.Group>
    </Row>

    <Divider style={{fontSize:24, fontWeight:'bold', color:'Black'}} plain>Market</Divider>
    <Row justify="space-around" style={{fontSize:16, marginTop: -15, marginBottom: 24}}>Please choose markets you want to compare.</Row>
    <Row justify="space-around">
      <Checkbox.Group onChange={this.onChangeMarkets}>
        <Row style={{marginBottom:24}}>
          <Col><Checkbox value="0" style={{width: 300, height: 40, marginLeft: 80, marginRight: 15, fontSize: 20, fontWeight:'bold'}}>Binance</Checkbox></Col>
          <Col><Checkbox value="1" style={{width: 300, height: 40, marginLeft: 15, marginRight: 15, fontSize: 20, fontWeight:'bold'}}>Huobi Pro</Checkbox></Col>
          <Col><Checkbox value="2" style={{width: 300, height: 40, marginLeft: 15, marginRight: 15, fontSize: 20, fontWeight:'bold'}}>Coinbase Pro</Checkbox></Col>
          <Col><Checkbox value="3" style={{width: 300, height: 40, marginLeft: 15, marginRight: 80, fontSize: 20, fontWeight:'bold'}}>Kraken</Checkbox></Col>
        </Row>
      </Checkbox.Group>
    </Row>

    <Divider style={{fontSize:24, fontWeight:'bold', color:'Black'}} plain>Information</Divider>
    <Row justify="space-around" style={{fontSize:16, marginTop: -15, marginBottom: 24}}>Please choose how you want to view the information.</Row>
    <Row justify="space-around">
      <Radio.Group defaultValue="1m" buttonStyle="solid" onChange={this.onChangeTimeframe}>
      <Row style={{marginBottom:24}}>
        <Col><Radio.Button value="1m" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>1 min</Radio.Button></Col>
        <Col><Radio.Button value="5m" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>5 min</Radio.Button></Col>
        <Col><Radio.Button value="15m" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>15 min</Radio.Button></Col>
        <Col><Radio.Button value="1h" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 80, textAlign:'center', fontWeight:'bold'}}>1 hour</Radio.Button></Col>
      </Row>
      <Row style={{marginBottom:24}}>  
        <Col><Radio.Button value="1d" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>1 day</Radio.Button></Col>
      </Row>
      </Radio.Group>
    </Row>

    <Divider plain></Divider>
    <Row justify="space-around" style={{marginBottom:24}}>
      <Link href={url}>
    <Button type="primary" style={{width: 300, height: 40, fontSize: 20, textAlign:'center', fontWeight:'bold'}}>
      View
    </Button>
      </Link>
    </Row>
  </div>
  )
  }
}

export default Home