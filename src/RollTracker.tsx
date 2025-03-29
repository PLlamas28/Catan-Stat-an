import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TooltipItem } from 'chart.js';
import './RollTracker.css'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define an interface for the Roll Tracker component props
interface RTProps {
    setLatestRoll: React.Dispatch<React.SetStateAction<number>>;
    setTriggerRoll: React.Dispatch<React.SetStateAction<boolean>>;
    
}

const RollTracker: React.FC<RTProps> = ({ setLatestRoll, setTriggerRoll }) => {

    const [rollArray, setRollArray] = useState([0,0,0,0,0,0,0,0,0,0,0]);

    function calcPercentage(barIndex: number){
        let sum = 0;
        for (let i = 0; i < 11; i++){
            
            //console.log(rollArray[i]);
            sum += rollArray[i];
        }
        //console.log("Sum: " + sum);
        //console.log(rollArray[barIndex]/sum);
        return rollArray[barIndex] + "/" + sum + " = " + Math.round(rollArray[barIndex]/sum * 10000)/100 + "%";
    }

    const updateCount = (index: number) => {
        //setter((prevCount) => prevCount + change);
        const newNumbers = [...rollArray];
        newNumbers[index] += 1;
        setRollArray(newNumbers);
        setLatestRoll(index+2);
        setTriggerRoll(prev => !prev);
        //console.log(newNumbers[0]);
      };

    const data = {
        labels: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'Rolls',
            data: rollArray,
            borderColor: 'rgba(33, 103, 255, 0.81)',
            backgroundColor: 'rgb(156, 206, 249)',
            borderWidth: 2,
            
            
          },
        //   {
        //     label: 'Dataset 2',
        //     data: [28, 48, 40, 19, 86, 27, 90],
        //     backgroundColor: 'rgba(153, 102, 255, 0.6)',
        //     barThickness: 12,
        //   },
        ],
    };
    
    const options = {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
        //aspectRatio: 30,
        categoryPercentage: .6,
        plugins: {
            legend: {
                position: 'top' as const,
                color: 'black',
            },
            title: {
                display: true,
                text: 'Roll Chart',
                color: 'black',
                
            },
            tooltip: {
                callbacks: {
                  label: function (context: TooltipItem<'bar'>) {
                    // let label = context.dataIndex || '';
                    // if (label) {
                    //   label += ': ';
                    // }
                    
                    // if (context.parsed.y !== null) {
                    //   label += context.parsed.y;
                    // }
                    return 'Percentage: ' + calcPercentage(context.dataIndex); // Customize this text as needed
                  },
                },
              },
        },
        
    };

    
    return (
        <div className='RTdiv'>
            
            <div id = 'barwrapper'>
                <Bar data={data} options={options}/>
            </div>

            <button onClick={() => updateCount(0)}>2</button>
            <button onClick={() => updateCount(1)}>3</button>
            <button onClick={() => updateCount(2)}>4</button>
            <button onClick={() => updateCount(3)}>5</button>
            <button onClick={() => updateCount(4)}>6</button>
            <button onClick={() => updateCount(5)}>7</button>
            <button onClick={() => updateCount(6)}>8</button>
            <button onClick={() => updateCount(7)}>9</button>
            <button onClick={() => updateCount(8)}>10</button>
            <button onClick={() => updateCount(9)}>11</button>
            <button onClick={() => updateCount(10)}>12</button>
            
        
        </div>
        
    )
}

export default RollTracker;