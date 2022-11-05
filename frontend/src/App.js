import './App.css';
import Header from './components/Header';
import Filters from './components/Filters';
import Items from './components/Items';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className="content">
        <Filters/>
        <Items/>
      </div>
    </div>
  );
}

export default App;
