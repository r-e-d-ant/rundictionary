
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { BsArrowLeftRight } from 'react-icons/bs';
import { Search } from '../context/SearchContext';

const SwitchLangs = () => {
    const { setActivateSearchResultComponent, setToSearchIn, toSearchIn } = Search();

    const switchLang = () => {
        if (toSearchIn === 'en2ru') {
            setToSearchIn('ru2en')
            setActivateSearchResultComponent(false)
        } else if (toSearchIn === 'ru2en') {
            setToSearchIn('en2ru')
            setActivateSearchResultComponent(false)
        } else {
            setToSearchIn('en2ru')
            setActivateSearchResultComponent(false)
        }
    }
    return (
        <div className="lang-switch-container" onClick={switchLang}>
            <span className={`fi ${toSearchIn === 'en2ru' ? 'fi-gb' : 'fi-bi'}`}></span>
            <BsArrowLeftRight />
            <span className={`fi ${toSearchIn === 'en2ru' ? 'fi-bi' : 'fi-gb'}`}></span>
        </div>
    )
}

export default SwitchLangs
