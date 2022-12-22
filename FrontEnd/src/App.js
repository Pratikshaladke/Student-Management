import logo from './logo.svg';
import './App.css';
import { Routes, Route} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddStud from './pages/Addstud';
import Delete from './pages/Delete';
import Update from './pages/Update';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="Home" element={<Home />} /> 
        <Route path="Login" element={<Login />} /> 
        <Route path="Dashboard" element={<Dashboard />} /> 
        <Route path="AddStud" element={<AddStud />} />
        <Route path="Update" element={<Update />} />
        <Route path="Delete" element={<Delete />} />


      </Routes>
    </div>
  );
}

export default App;
