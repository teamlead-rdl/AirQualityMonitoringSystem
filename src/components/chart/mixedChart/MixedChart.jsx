import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function MixedChart({data}){   
    const [labels, setLabels] = useState([]);
    const [avgData,setAvgData] = useState([]);
    const [lastData,setLastData] = useState([]);
    const [minData, setMinData] = useState([]);
    const [maxData, setMaxData] = useState([]);

    useEffect(() => {
        setLabels(data.labels);
        setAvgData(data.avgData);
        setLastData(data.lastData);
        setMinData(data.minData);
    },[data]);

    // const data = {
    //   labels: ["2:15", "2:30", "2:45", "3:00"],
    //   datasets: [{
    //       label: "Avg",
    //       type: "bar",
    //       borderColor: "#8e5ea2",
    //       data: [408,547,675,734],
    //       fill: false
    //     },
    //     {
    //       label: "Min",
    //       type: "line",
    //       borderColor: "#3e95cd",
    //       data: [133,221,783,2478],
    //       fill: false
    //     },
    //     {
    //       label: "Last",
    //       type: "line",
    //       borderColor: "red",
    //       data: [145,190,250,956],
    //       fill: false
    //     }, 
    //     {
    //       label: "Max",
    //       type: "bar",
    //       backgroundColor: "#ff1a75",
    //       data: [408,547,675,734],
    //     },
    //   ]
    // };

    
    //const labels = ["2022-05-17 11:48:00", "2022-05-17 12:00:00", "2022-05-17 13:00:00", "2022-05-17 14:02:00"]; 
    // const avgData =  [408,547,675,734];
    // const lastData = [145,190,250,956];



    const graphData = {
      "labels": labels,
      "datasets": [
        {
          "label": "Avg",
          "type": "line",
          "borderColor": "#66a3ff",
          "backgroundColor": "#4d94ff",
          "data":avgData,
          "fill":false
        },
        {
          "label": "Last",
          "type": "bar",         
          "borderColor": "red",
          "backgroundColor": ["purple"],
          "data": lastData,        
          "fillColor": "blue"
        },
        {
          "label": "Min",
          "type": "line",
          "backgroundColor": "yellow",
          "borderColor": "red",
          "data": minData,
          "fill": false
        }
      ]
    };   
     

    
    return (      
        <Bar
            data={graphData}  
            height={50}               

        />
     
    );
  };

  export default MixedChart; 