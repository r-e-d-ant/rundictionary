
import { ContextProvider } from './context/SearchContext';
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import SwitchLangs from './components/SwitchLangs';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <NavBar />
        <div className='myApp'>
          <div className='dic-body'>
            <SwitchLangs />
            <SearchBar />
            <SearchResult />
          </div>
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
