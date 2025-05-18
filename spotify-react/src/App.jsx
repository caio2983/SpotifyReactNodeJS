import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <Header className="header"></Header>
      <BrowserRouter>
        <Home></Home>
      </BrowserRouter>
    </div>
  );
}

export default App;
