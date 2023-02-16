import styled from "styled-components";
import {useState} from "react";

type FractionCircleProps = {
  radius: number;
  divisions: number;
  activeIndex: number;
}
const FractionCircle = (props: FractionCircleProps) => {
  const {radius, divisions, activeIndex} = props;
  const [numerator, setNumerator] = useState(0);
  const diameter = 10 + radius * 2;
  const strokeWidth = 2;
  const center = radius + strokeWidth / 2;
  const angle = 360 / divisions;
  const circleClick = (currentNumerator: number) => () => {
    console.log(`clicking: ${currentNumerator} to ${(currentNumerator+1)%(divisions + 1)}`);
    setNumerator((currentNumerator+1)%(divisions + 1))

  }

  return (
    <FractionCircleContainer>
      <svg width={diameter} height={diameter}
      onClick={circleClick(numerator)}
      >
        <circle
          onClick={circleClick(numerator)}
          cx={center} cy={center} r={radius} fill="transparent" stroke="black" strokeWidth={strokeWidth} />
        {Array.from({ length: divisions }, (_, index) => {
          const startAngle = (index * angle * Math.PI) / 180;
          const endAngle = ((index + 1) * angle * Math.PI) / 180;
          const isIndexActive = index < numerator;
          const fillColor = isIndexActive ? '#a090f0' : 'transparent';

          return (
            <path
              key={index}
              d={`M ${center},${center} L ${center + radius * Math.cos(startAngle)},${center + radius * Math.sin(startAngle)} A ${radius},${radius} 0 0,1 ${center + radius * Math.cos(endAngle)},${center + radius * Math.sin(endAngle)} Z`}
              fill={fillColor}
              stroke="black"
              strokeWidth={strokeWidth}
            />
          );
        })}
      </svg>
    </FractionCircleContainer>
  );
};

export default FractionCircle;

const FractionCircleContainer = styled.div`
  padding: 5px;
  border: solid 1px green;
`;
