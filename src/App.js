
import { ContextProvider } from './context/SearchContext';
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import SwitchLangs from './components/SwitchLangs';

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <div>
          <SwitchLangs />
          <SearchBar />
          <SearchResult />
        </div>
      </ContextProvider>
    </div>
  );
}

export default App;
