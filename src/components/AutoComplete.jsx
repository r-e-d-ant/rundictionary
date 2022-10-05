
import { Search } from '../context/SearchContext';
import latinize from 'latinize';

const AutoComplete = () => {
    // restore languages
    const localEn2Ru = window.localStorage.getItem('localEn2Ru');
    const localRu2En = window.localStorage.getItem('localRu2En');

    // Parse them in Object type
    const en2ru = JSON.parse(localEn2Ru);
    const ru2en = JSON.parse(localRu2En);

    const { toTitleCase, searchInDictionary, setDisplayAutoComplete, displayAutoComplete, toSearchIn, setSearchKey, searchKey } = Search();

    // This function will set a selected word to be searched in dictionary
    // Add the selected word into search input
    // and hide autocomplete box
    const selectOption = (selectedKey) => {
        searchInDictionary(selectedKey);
        setSearchKey(selectedKey);
        setDisplayAutoComplete(false);
    }

    return (
        <div>
            {
                toSearchIn === 'en2ru' ?
                (
                    <div>
                        { searchKey.length > 0 && displayAutoComplete && (
                            <div className='autocomplete-result-container'>
                                {en2ru.filter(({en}) => en.indexOf(searchKey.toLowerCase()) > -1).map((e) => (
                                    <div className='option' key={e.id} onClick={() => selectOption(e.en)} tabIndex="0">
                                        <div>{ toTitleCase(e.en) }</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
                :
                (
                    <div>
                        { searchKey.length > 0 && displayAutoComplete && (
                            <div className='autocomplete-result-container'>
                                {ru2en.filter(({ki1}) => latinize(ki1.replace(/-/g, '')).indexOf(searchKey.toLowerCase()) > -1).map((e) => (
                                    <div className='option' key={e.id} onClick={() => selectOption(latinize(e.ki1.replace(/-/g, '')))} tabIndex="0">
                                        <div>{ toTitleCase(e.ki1) }</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default AutoComplete
