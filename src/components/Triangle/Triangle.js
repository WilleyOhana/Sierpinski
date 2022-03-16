import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import './Triangle.css';

const Triangle = () => {
    const [coords, setCoords] = useState(() => {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;

        return [x, y];
    })

    const container = useRef(null);


    const calcRGB = () => {
        let bottomLeft = getCornerCoords(1);
        let topMid = getCornerCoords(2);
        let bottomRight = getCornerCoords(3);

        let r = calcR(bottomLeft);
        let g = calcG(topMid);
        let b = calcB(bottomRight);

        return [r,g,b];
    }

    const calcR = (cornerCoords) => {
        let xDiff = coords[0] - cornerCoords[0];
        let yDiff = coords[1] - cornerCoords[1];

        let c = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
        let { right } = container.current.getBoundingClientRect();
        
        return 255 * (c / right);
    }

    const calcG = (cornerCoords) => {
        let xDiff = Math.abs(coords[0] - cornerCoords[0]);
        let yDiff = Math.abs(coords[1] - cornerCoords[1]);

        let c = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
        let { bottom } = container.current.getBoundingClientRect();

        return 255 * (c / bottom);
    }

    const calcB = (cornerCoords) => {
        let xDiff = Math.abs(coords[0] - cornerCoords[0]);
        let yDiff = Math.abs(coords[1] - cornerCoords[1]);

        let c = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
        let { left } = container.current.getBoundingClientRect();

        return 255 * (c / left);
    }

    const getCornerCoords = (cornerNum) => {
        const { bottom, left, right, top } = container.current.getBoundingClientRect();

        let cornerX, cornerY;
        switch(cornerNum) {
            case 1:
                cornerX = left;
                cornerY = bottom;
                break;
            case 2:
                cornerX = (left + right) / 2;
                cornerY = top;
                break;
            case 3:
                cornerX = right;
                cornerY = bottom;
                break;
            default:
                return;
        }

        return [cornerX, cornerY];
    }

    useEffect(() => {

        const interval = setInterval(() => {
            const randomCorner = Math.ceil(Math.random() * 3);

            const cornerCoords = getCornerCoords(randomCorner);
            
            setCoords((prevCoords) => {
                let newX = (prevCoords[0] + cornerCoords[0]) / 2;
                let newY = (prevCoords[1] + cornerCoords[1]) / 2;
                
                return [newX, newY];
            });
        }, 1);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const newDot = document.createElement('div');
        newDot.className = "dot";
        newDot.style.left = `${coords[0]}px`;
        newDot.style.top = `${coords[1]}px`;

        let rgb = calcRGB();

        newDot.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`

        container.current.appendChild(newDot);

    }, [coords]);

    

    return (
        <div id="triangle" className="Triangle" ref={container}>
            
        </div>
    )
}

export default Triangle;