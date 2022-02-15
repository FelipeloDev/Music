import "./App.css";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? (
    <Home code={code} />
  ) : (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
