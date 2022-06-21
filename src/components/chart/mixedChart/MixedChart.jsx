import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function MixedChart({ data }) {
  const [labels, setLabels] = useState([]);
  const [avgData, setAvgData] = useState([]);
  const [lastData, setLastData] = useState([]); 
  const [warningLevel, setWarningLevel] = useState([]);
  const [criticalLevel,setCriticalLevel] = useState([]);
  const [alertColor,setAlertColor] = useState([]); 

  useEffect(() => {
    setLabels(data.labels);
    setAvgData(data.avgData);
    setLastData(data.lastData);    
    setWarningLevel(data.warningLevel);
    setCriticalLevel(data.criticalLevel);   
    setAlertColor(data.colors);

  }, [data]);

  const graphData = {
    labels,
    datasets: [
      {
        label: 'Avg',
        type: 'line',
        borderColor: '#66a3ff',
        backgroundColor: '#4d94ff',
        data: avgData,
        fill: false,
      },
      {
        label: 'Last',
        type: 'bar',
        borderColor: 'red',
        backgroundColor:alertColor,
        data: lastData,
        fillColor: 'blue',

      },      
      {
        label: 'Warning',
        type: 'line',
        backgroundColor: '#ffeb3b',
        borderColor: '#ffeb3b',
        data: warningLevel,
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Critical',
        type: 'line',
        backgroundColor: '#d50000',
        borderColor: '#d50000',
        data: criticalLevel,
        fill: false,
        pointRadius: 0,
      },         
    ],
  };

  return (
    <Bar
      data={graphData}
      height={80}
    />

  );
}

export default MixedChart;
