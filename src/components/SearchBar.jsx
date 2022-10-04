
import { useState } from 'react';
import { Search } from '../context/SearchContext';

const SearchBar = () => {
    const [searchKey, setSearchKey] = useState('');
    const { searchInDictionary, loading } = Search();

    const searchInDic = (e) => {
        e.preventDefault();
        searchInDictionary(searchKey)
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
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                </div>
                <div className='form-control-cont flex-d-col'>
                    <button type="submit" className='btn submit-btn' disabled={loading || !searchKey.length}>Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
