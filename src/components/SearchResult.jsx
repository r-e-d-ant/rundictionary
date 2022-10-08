
import { Search } from '../context/SearchContext';
import parse from 'html-react-parser';

const SearchResult = () => {
    const { toTitleCase, activateSearchResultComponent, toSearchIn, searchResult, loading, loadingMessage, notFound } = Search();

    return (
        <div className="search-result-container">
            { loading && <p>Loading...</p> }
            { notFound && <p className='loading-message'>Sorry, No data found.</p> }
            { loadingMessage && <p className='loading-message'>Mmmm sorry! seems like it's taking long.<br/> Check your internet connection!</p> }

            { activateSearchResultComponent && 
            ( Object.keys(searchResult).length ?
                (
                    <div>
                        <span className='from-text'>{ toSearchIn === 'en2ru' ? toTitleCase(searchResult.en) : toTitleCase(searchResult.ki1) }</span>
                        <p className='to-text'>{ toSearchIn === 'en2ru' ? parse(`${searchResult.ki}`) : parse(`${searchResult.en}`) }</p>
                    </div>
                ) :
                (<span className='muted'>Word not found!</span>)
            )}
        </div>
    )
}

export default SearchResult
