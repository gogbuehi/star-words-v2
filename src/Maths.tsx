import PracticeMaths from "./app-main/PracticeMaths";
import {CenterContent} from "./app-main/TrickyWords";

function Maths() {
  return (
    <div className="App">
      <header className="App-header">
        <CenterContent>
          <h1>Star Maths</h1>
        </CenterContent>

      </header>
      <div>
        <PracticeMaths
          doDivision={false}
          doAddition={false}
        />
      </div>
    </div>
  )
}

export default Maths;
