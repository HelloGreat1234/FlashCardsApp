import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Admin from './pages/Admin';
import HomePage from './pages/User';


function App() {
  return (
    // <div className="App">
    // </div>
    <Router>
      <Routes>
        <Route path='/admin' element={<Admin/>} />
        <Route path='/' element={<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
