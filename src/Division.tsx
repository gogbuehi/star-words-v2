import PracticeMaths from "./app-main/PracticeMaths";
import {CenterContent} from "./app-main/TrickyWords";

function Division() {
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
        />
      </div>
    </div>
  )
}

export default Division;
