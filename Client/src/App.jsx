
import './App.css';
import Home from './pages/Home';
import NewItem from './pages/newItem';
import Items from './pages/Items';
import Item from './pages/Item';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



function App() {
  return (
    
      <Router>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/add' Component={NewItem}/>
          <Route path='/items' Component={Items} />
          <Route path='/items/:category' Component={Items} />
          <Route path='/item/:id' Component={Item} />
        </Routes>
      </Router>
    
  );
}

export default App;
