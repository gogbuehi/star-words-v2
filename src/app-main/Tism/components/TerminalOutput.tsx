import {OutputEntry, OutputEntryPast} from "../TismStyled";
import {LineItem} from "../MathDevice";

type TerminalOutputProps = {
  lines: LineItem[];
}
const TerminalOutput = (props: TerminalOutputProps) => {
  const { lines } = props;
  return (
    <div className="terminal">
      {lines.map((lineItem, index) => {
        const {line, color}  = lineItem;
        const colorToUse = color ? 'greenyellow' : 'red';
        const OutputComponent = index === 0 ? OutputEntry : OutputEntryPast;
        return (
        <OutputComponent key={index} className="terminal-line" color={colorToUse}>| {line}</OutputComponent>
      )
      })
      }
    </div>
  );
};

export default TerminalOutput;
