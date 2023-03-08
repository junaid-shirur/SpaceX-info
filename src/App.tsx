import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from './pages/Home';
import Capsules from './pages/Capsules';

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/capsules/:page' element={<Capsules/>} />
      </Routes>
    </>
  );
}


export default App;
