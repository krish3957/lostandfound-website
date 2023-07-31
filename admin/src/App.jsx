import './App.css';
import Home from './Pages/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Items from './Pages/Items';
import { useSelector } from 'react-redux';
import Item from './Pages/Item';

function App() {
  const admin = useSelector(state => state.admin).isAdmin;
  return (
    <Router>
      <Routes>
        <Route path='/' element={admin ? <Navigate to={'/items'} /> : <Home/>} />
        <Route path='/items' element={admin ? <Items/> : <Navigate to={'/'} />} />
        <Route path='/item/:id' element={admin ? <Item/> : <Navigate to={'/'}/> } />
      </Routes>
    </Router>
  );
}

export default App;
