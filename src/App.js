import { Routes, Route } from "react-router-dom";
import CoinDetails from './components/coinDetails/index';
import Dashboard from './components/dashboard';
import Header from './components/header';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Dashboard />}/>
        <Route exact path="/market" element={<CoinDetails />}/>
      </Routes>
    </div>
  );
}

export default App;
