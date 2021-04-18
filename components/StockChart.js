import Stock from '@ant-design/charts/lib/stock';
import  { Fragment} from 'react';
const StockChart = (config) => {
      return (
        <Fragment>
            <Stock {...config} />
        </Fragment>
        )
}

export default StockChart;