import "./BarChart.scss";
import MyResponsiveBar from './responsiveBarChart';
import { barChartData } from './responsiveBarChartData';

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="chartWrapper">
        <MyResponsiveBar data={barChartData}/>
      </div>
    </div>
  );
};

export default Chart;
