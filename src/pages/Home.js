import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config';

function Home() {

    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const isShowsSearch = searchOption === 'shows';


    const onInputChange = (ev) => {
        setInput(ev.target.value);
    };

    const onSearch = () => {
        apiGet(`/search/${searchOption}?q=${input}`).then(res => {
            setResults(res);
        });
    };

    const onKeyDown = (ev) => {
        if(ev.keyCode === 13)
            onSearch();
    };

    const renderResult = () => {
        if(results && results.length === 0) {
            return <div>
                No results !
            </div>
        }
        if(results && results.length > 0){
            return (
                results[0].show ?  results.map( item => (
                            <div key={item.show.id} >{item.show.name}</div>
                        )) :  results.map( item => (
                            <div key={item.person.id} >{item.person.name}</div>
                        ))
            );
        }
        return null;
    };

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }

    return (
        <MainPageLayout>
            <input type="text" 
            plceholder="Search for "
            onChange={onInputChange} 
            onKeyDown={onKeyDown} 
            value={input} 
            />
            <div>
                <label htmlFor="shows-search">
                    Shows
                    <input id="shows-search" type="radio" value="shows" checked={isShowsSearch} onChange={onRadioChange} />
                </label>
                 <label htmlFor="actors-search">
                     Actors
                    <input id="actors-search" type="radio" value="people" checked={!isShowsSearch} onChange={onRadioChange} />
                </label>
            </div>
            <button type="button" onClick={onSearch} >
                Search
            </button>
            { renderResult() }
        </MainPageLayout>
    )
}

export default Home
