import "./LineChart.scss";

const Chart = ({ aspect, title, data }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <div className="chartWrapper">
      </div>
    </div>
  );
};

export default Chart;
