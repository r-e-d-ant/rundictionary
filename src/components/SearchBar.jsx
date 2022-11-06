
import AutoComplete from './AutoComplete';
import { Search } from '../context/SearchContext';

const SearchBar = () => {
    const { setSearchKey, searchKey, setDisplayAutoComplete, searchInDictionary, loading } = Search();

    // This function will help to set a key entered by user
    // and also activate autocomplete box
    const settingSearchKey = (e) => {
        setSearchKey(e.target.value);
        setDisplayAutoComplete(true);
    }

    // This function is for searching in dictionary for the searched word
    const searchInDic = (e) => {
        e.preventDefault();
        searchInDictionary(searchKey)
        setDisplayAutoComplete(false);
    }
    
    return (
        <div>
            <form onSubmit={searchInDic}>
                <div className="form-control-container flex-d-col">
                    <label htmlFor="keyword-search" className="input-label">Search keyword</label>
                    <input
                        type="search"
                        disabled={loading}
                        autoFocus={!loading}
                        id="keyword-search"
                        className="form-control"
                        value={searchKey}
                        onChange={(e) => settingSearchKey(e)}
                    />
                    <AutoComplete />
                </div>
                <div className='form-control-cont flex-d-col'>
                    <button type="submit" className='btn submit-btn' disabled={loading || !searchKey.length}>Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
