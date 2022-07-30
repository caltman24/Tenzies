import "./assets/App.css";
import Tenzies from "./components/Tenzies/Tenzies";
import GameHeader from "./components/GameHeader";

function App() {
  return (
    <div className="App">
      <div className="container">
        <GameHeader />
        <Tenzies />
      </div>
    </div>
  );
}

export default App;
