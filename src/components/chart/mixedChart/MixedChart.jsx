import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function MixedChart({ data }) {
  const [labels, setLabels] = useState([]);
  /* eslint-disable-next-line */
  const [avgData, setAvgData] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [warningLevelMin, setWarningLevelMin] = useState([]);
  const [criticalLevelMin, setCriticalLevelMin] = useState([]);
  const [warningLevelMax, setWarningLevelMax] = useState([]);
  const [criticalLevelMax, setCriticalLevelMax] = useState([]);
  const [alertColor, setAlertColor] = useState([]);

  useEffect(() => {
    setLabels(data.labels);
    setAvgData(data.avgData);
    setLastData(data.lastData);
    setWarningLevelMin(data.warningLevelMin);
    setCriticalLevelMin(data.criticalLevelMin);
    setWarningLevelMax(data.warningLevelMax);
    setCriticalLevelMax(data.criticalLevelMax);
    setAlertColor(data.colors);
  }, [data]);

  const graphData = {
    labels,
    datasets: [
      {
        label: 'Last',
        type: 'line',
        borderColor: 'grey',
        backgroundColor: alertColor,
        data: lastData,
        fillColor: 'blue',
        pointRadius: 3.8,
      },
      {
        label: 'Warning Min',
        type: 'line',
        backgroundColor: '#ffeb3b',
        borderColor: '#ffeb3b',
        data: warningLevelMin,
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Warning Max',
        type: 'line',
        backgroundColor: '#ffeb3b',
        borderColor: '#ffeb3b',
        data: warningLevelMax,
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Critical Min',
        type: 'line',
        backgroundColor: '#d50000',
        borderColor: '#d50000',
        data: criticalLevelMin,
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Critical Max',
        type: 'line',
        backgroundColor: '#d50000',
        borderColor: '#d50000',
        data: criticalLevelMax,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  return (
    <Line
      data={graphData}
      height={80}
    />

  );
}

export default MixedChart;
