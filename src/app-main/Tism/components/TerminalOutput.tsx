import {OutputEntry, OutputEntryPast} from "../TismStyled";

type TerminalOutputProps = {
  lines: string[];
}
const TerminalOutput = (props: TerminalOutputProps) => {
  const { lines } = props;
  return (
    <div className="terminal">
      {lines.map((line, index) => {
        const OutputComponent = index === 0 ? OutputEntry : OutputEntryPast;
        return (
        <OutputComponent key={index} className="terminal-line">| {line}</OutputComponent>
      )
      })
      }
    </div>
  );
};

export default TerminalOutput;
