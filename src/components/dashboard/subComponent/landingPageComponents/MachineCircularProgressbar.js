import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ValueProvider from "./ValueProvider";

const MachineCircularProgressbar = (props) => {
    const { score, color } = props;
    
    
    const calcColor = (parent, start, end) => {
        let a = parent / 100,
            b = (end - start) * a,
            c = b + start;   
        
        return color;
    }
    return (
        <ValueProvider valueStart={0} valueEnd={score}>
            {(value) => (<CircularProgressbar
                value={value}
                text={`${value} mg/m3`}                
                circleRatio={0.7}
                styles={{
                    trail: {
                        strokeLinecap: "but",
                        transform: "rotate(-126deg)",
                        transformOrigin: 'center center',
                    },
                    path: { 
                        strokeLinecap: 'butt',
                        transform: "rotate(-126deg)",
                        transformOrigin: 'center center',
                        stroke: calcColor(value, 0, 120),
                    },
                    text: {
                        fill: "#003380",    
                        fontSize: '16px',                  
                    },                   
                }}
                strokeWidth={10}
            />)}
        </ValueProvider>
    )
}

export default MachineCircularProgressbar