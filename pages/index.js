import { Form, Select, InputNumber, Switch, Slider, Button} from 'antd'
import { Row, Col, Divider, Checkbox } from 'antd';
import { Radio, Space } from 'antd';

// Custom DatePicker that uses Day.js instead of Moment.js
import DatePicker from '../components/DatePicker'

import { SmileFilled } from '@ant-design/icons'

import Link from 'next/link'

const FormItem = Form.Item
const Option = Select.Option

const content = {
  marginTop: '100px',
}

export default function Home() {
  return (
    <div style={content}>
      <Row justify="space-around" style={{fontSize:38, fontWeight:'bold', color:'Black', marginBottom: 24}}>View &amp; Compare Crypto Info</Row>
      <Divider style={{fontSize:24, fontWeight:'bold', color:'Black'}} plain>Crypto</Divider>
      <Row justify="space-around" style={{fontSize:16, marginTop: -15, marginBottom: 24}}>Please choose the crypto you want to view.</Row>
      <Row justify="space-around">
        <Radio.Group defaultValue="a" buttonStyle="solid">
        <Row style={{marginBottom:24}}>
          <Radio.Button value="a" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>BTC / USDT</Radio.Button>
          <Radio.Button value="b" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>BNB / BUSD</Radio.Button>
          <Radio.Button value="c" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>ETH / BUSD</Radio.Button>
          <Radio.Button value="d" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 80, textAlign:'center', fontWeight:'bold'}}>ZRP / Ripple</Radio.Button>
        </Row>
        <Row style={{marginBottom:24}}>
          <Radio.Button value="e" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>BTC / USDT</Radio.Button>
          <Radio.Button value="f" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>BNB / BUSD</Radio.Button>
          <Radio.Button value="g" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>ETH / BUSD</Radio.Button>
          <Radio.Button value="h" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 80, textAlign:'center', fontWeight:'bold'}}>ZRP / Ripple</Radio.Button>
        </Row>
        </Radio.Group>
      </Row>

      <Divider style={{fontSize:24, fontWeight:'bold', color:'Black'}} plain>Market</Divider>
      <Row justify="space-around" style={{fontSize:16, marginTop: -15, marginBottom: 24}}>Please choose markets you want to compare.</Row>
      <Row justify="space-around">
        <Checkbox.Group onChange={onChange}>
          <Row style={{marginBottom:24}}>
            <Col><Checkbox value="A" style={{width: 300, height: 40, marginLeft: 80, marginRight: 15, fontSize: 20, fontWeight:'bold'}}>Market 1</Checkbox></Col>
            <Col><Checkbox value="B" style={{width: 300, height: 40, marginLeft: 15, marginRight: 15, fontSize: 20, fontWeight:'bold'}}>Market 2</Checkbox></Col>
            <Col><Checkbox value="C" style={{width: 300, height: 40, marginLeft: 15, marginRight: 15, fontSize: 20, fontWeight:'bold'}}>Market 3</Checkbox></Col>
            <Col><Checkbox value="D" style={{width: 300, height: 40, marginLeft: 15, marginRight: 80, fontSize: 20, fontWeight:'bold'}}>Market 4</Checkbox></Col>
          </Row>
        </Checkbox.Group>
      </Row>

      <Divider style={{fontSize:24, fontWeight:'bold', color:'Black'}} plain>Information</Divider>
      <Row justify="space-around" style={{fontSize:16, marginTop: -15, marginBottom: 24}}>Please choose how you want to view the information.</Row>
      <Row justify="space-around">
        <Radio.Group defaultValue="a" buttonStyle="solid">
        <Row style={{marginBottom:24}}>
          <Col><Radio.Button value="a" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>1 min</Radio.Button></Col>
          <Col><Radio.Button value="b" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>15 min</Radio.Button></Col>
          <Col><Radio.Button value="c" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>1 hour</Radio.Button></Col>
          <Col><Radio.Button value="d" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 80, textAlign:'center', fontWeight:'bold'}}>4 hour</Radio.Button></Col>
        </Row>
        <Row style={{marginBottom:24}}>  
          <Col><Radio.Button value="e" style={{width: 300, height: 40, fontSize: 20, marginLeft: 80, marginRight: 15, textAlign:'center', fontWeight:'bold'}}>1 day</Radio.Button></Col>
          <Col><Radio.Button value="f" style={{width: 300, height: 40, fontSize: 20, marginLeft: 15, marginRight: 80, textAlign:'center', fontWeight:'bold'}}>1 week</Radio.Button></Col>
        </Row>
        </Radio.Group>
      </Row>

      <Divider plain></Divider>
      <Row justify="space-around" style={{marginBottom:24}}>
      <Button type="primary" style={{width: 300, height: 40, fontSize: 20, textAlign:'center', fontWeight:'bold'}}>
        View
      </Button>
      </Row>
    </div>
  )
}

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}