import "./App.css";

import Home from "./components/Home";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/subcomponents/Header/Header";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header className="header"></Header>
        <Home></Home>
      </BrowserRouter>
    </div>
  );
}

export default App;
