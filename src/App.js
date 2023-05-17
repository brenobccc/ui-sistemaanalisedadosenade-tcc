import TelaPrincipal from "./components/TelaPrincipal/TelaPrincipal";
import './App.css';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
function App() {
  return (
    // <div className='app'>teste</div>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaPrincipal/>}></Route>
          <Route path="sobre" element={<h1>Página Sobre</h1>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
