
import { createContext, useContext, useEffect, useState } from "react";
import { ref, child, get } from "firebase/database";
import { database } from "../firebase";

import latinize from 'latinize'; // package to transform accented letter into normal form

const SearchContext = createContext();

export const ContextProvider = ({ children }) => {
    const [searchKey, setSearchKey] = useState(''); // state to track search key inputs
    const [displayAutoComplete, setDisplayAutoComplete] = useState(false) // state to hide/show auto complete box
    const [searchResult, setSearchResult] = useState({}); // to hold search word
    const [toSearchIn, setToSearchIn] = useState('en2ru'); // to hold a lang to transform from then to
    const [loading, setLoading] = useState(false); // state for tracking loading data from firebase when not in localStorage
    const [notFound, setNotFound] = useState(false); // state for tracking if data is available from firebase available
    const [activateSearchResultComponent, setActivateSearchResultComponent] = useState(false); // state to activate searc result box

    // function to query from firebase
    const fetchFromFirebase = (resourceToQueryFrom, localStorageNameToSaveIn) => {
        setLoading(true);
        get(child(ref(database), resourceToQueryFrom)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                window.localStorage.setItem(localStorageNameToSaveIn,  JSON.stringify(data)); // we use 'JSON.stringify()' because local storage can only save string type value
                setLoading(false);
            } else {
                console.log("No data available");
                setNotFound(true)
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(() => {
        // '''
        // Check from local storage if all the languages data are there
        // if are not there fetch them from Firebase and save them locally
        // else if are there skip fetching from Firebase
        // then it will be fetched locally
        // '''
        if (!window.localStorage.getItem('localEn2Ru')) {
            fetchFromFirebase(`0/en2ru`, "localEn2Ru")
        }
        if (!window.localStorage.getItem('localRu2En')) {
            fetchFromFirebase(`1/ru2en`, "localRu2En")
        }
    }, [])
    
    const searchInDictionary = (searchK) => {
        // restore languages
        const localEn2Ru = window.localStorage.getItem('localEn2Ru');
        const localRu2En = window.localStorage.getItem('localRu2En');

        // Parse them in Object type
        const en2ru = JSON.parse(localEn2Ru);
        const ru2en = JSON.parse(localRu2En);

        let found;

        // Check to language to translate from and change accordingly
        if (toSearchIn === 'ru2en') {
            // latinize the words by removing accents
            // remove all dashes between word
            // then search by the keyword entered by user
            found = ru2en.find(e => latinize(e.ki1.replace(/-/g, '')).toLowerCase() === searchK.toLowerCase());
        } else if (toSearchIn === 'en2ru') {
            // remove all dashes between word
            // then search by the keyword entered by user
            found = en2ru.find(e => e.en.replace(/-/g, '').toLowerCase() === searchK.toLowerCase());
        } else {
            setNotFound(true);
        }

        // activate search result component
        setActivateSearchResultComponent(true)

        if (found) {
            setSearchResult(found);
        } else {
            setSearchResult({});
        }
    }

    // Function to tranform words into title case
    function toTitleCase(str) {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }

    return (
        <SearchContext.Provider value={{ toTitleCase, setSearchKey, searchKey, setDisplayAutoComplete, displayAutoComplete, searchInDictionary, setToSearchIn, toSearchIn, setActivateSearchResultComponent, activateSearchResultComponent, searchResult, loading, notFound }}>
            { children }
        </SearchContext.Provider>
    )
}

export const Search = () => {
    return useContext(SearchContext)
}
