import PracticeMaths from "./app-main/PracticeMaths";
import {CenterContent} from "./app-main/TrickyWords";

function Subtraction() {
  return (
    <div className="App">
      <header className="App-header">
        <CenterContent>
          <h1>Star Division</h1>
        </CenterContent>

      </header>
      <div>
        <PracticeMaths
          doDivision={true}
          doAddition={true}
        />
      </div>
    </div>
  )
}

export default Subtraction;
