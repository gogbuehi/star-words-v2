import {OutputEntry, OutputEntryPast} from "../TismStyled";
import {LineItem} from "../MathDevice";
import {TerminalOutputContainer} from "../star-maths/layout/TerminalOutput.styled";

type TerminalOutputProps = {
  lines: LineItem[];
}
const TerminalOutput = (props: TerminalOutputProps) => {
  const { lines } = props;
  return (
    <TerminalOutputContainer>
      {lines.map((lineItem, index) => {
        const {line, color}  = lineItem;
        const colorToUse = color ? 'greenyellow' : 'red';
        const OutputComponent = index === 0 ? OutputEntry : OutputEntryPast;
        return (
        <OutputComponent key={index} color={colorToUse}>| {line}</OutputComponent>
      )
      })
      }
    </TerminalOutputContainer>
  );
};

export default TerminalOutput;
