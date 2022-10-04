
import { Search } from '../context/SearchContext';
import parse from 'html-react-parser';

const SearchResult = () => {
    const { activateSearchResultComponent, toSearchIn, searchResult, loading } = Search();

    return (
        <div className="search-result-container">
            { loading && <p>Loading...</p> }

            { activateSearchResultComponent && 
            ( Object.keys(searchResult).length ?
                (
                    <div>
                        <span className='from-text'>{ toSearchIn === 'en2ru' ? searchResult.en : searchResult.ki1 }</span>
                        <p className='to-text'>{ toSearchIn === 'en2ru' ? parse(`${searchResult.ki}`) : parse(`${searchResult.en}`) }</p>
                    </div>
                ) :
                (<span className='muted'>Word not found!</span>)
            )}
        </div>
    )
}

export default SearchResult
