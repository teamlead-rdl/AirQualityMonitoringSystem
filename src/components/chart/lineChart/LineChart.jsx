import "./LineChart.scss";
import MyResponsiveLine from './responsiveLineChart';
import { lineChartData } from './responsiveLineChartData';

const Chart = ({ aspect, title, data }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="chartWrapper">
        <MyResponsiveLine data={lineChartData}/>
      </div>
    </div>
  );
};

export default Chart;
