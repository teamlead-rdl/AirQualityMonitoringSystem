import "./BarChart.scss";
import MyResponsiveBar from './responsiveBarChart';

const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="chartWrapper">
      </div>
    </div>
  );
};

export default Chart;
