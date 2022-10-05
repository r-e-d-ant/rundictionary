
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
    const [notFound, setNotFound] = useState(true); // state for tracking if searched word is available
    const [activateSearchResultComponent, setActivateSearchResultComponent] = useState(false); // state to activate searc result box

    // function to query from firebase
    const fetchFromFirebase = (resourceToQueryFrom, localStorageNameToSaveIn) => {
        get(child(ref(database), resourceToQueryFrom)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                window.localStorage.setItem(localStorageNameToSaveIn,  JSON.stringify(data)); // we use 'JSON.stringify()' because local storage can only save string type value
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    useEffect(() => {
        setLoading(true);
        // '''
        // Check from local storage if all the languages data are there
        // if are not there fetch them from Firebase and save them locally
        // else if are there skip fetching from Firebase
        // then it will be fetched locally
        // '''
        if (!window.localStorage.getItem('localEn2Ru')) {
            fetchFromFirebase(`0/en2ru`, "localEn2Ru")
            setLoading(false);
        } else {
            setLoading(false);
        }
        if (!window.localStorage.getItem('localRu2En')) {
            fetchFromFirebase(`1/ru2en`, "localRu2En")
            setLoading(false);
        } else {
            setLoading(false);
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

        // Check to language to tranalate from and change accordingly
        if (toSearchIn === 'ru2en') {
            console.log(ru2en);
            found = ru2en.find(e => latinize(e.ki1.replace(/-/g, '')) === searchK);
        } else if (toSearchIn === 'en2ru') {
            console.log(en2ru);
            found = en2ru.find(e => e.en.replace(/-/g, '') === searchK);
        } else {
            setNotFound(true);
        }

        // activate search result component
        setActivateSearchResultComponent(true)

        if (found) {
            console.log(found);
            setSearchResult(found);
            setNotFound(false);
        } else {
            setNotFound(true);
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
