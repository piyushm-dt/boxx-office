import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config';
import ShowGrid from '../components/show/ShowGrid';
import ActorGrid from '../components/actor/ActorGrid';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../components/CustomRadio';

function Home() {

    const [input, setInput] = useLastQuery();
    const [results, setResults] = useState(null);
    const [searchOption, setSearchOption] = useState('shows');
    const isShowsSearch = searchOption === 'shows';
    const isActorSearch = searchOption === 'people';


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
                results[0].show ? <ShowGrid data={results} /> : <ActorGrid data={results} />
            );
        }
        return null;
    };

    const onRadioChange = (ev) => {
        setSearchOption(ev.target.value);
    }

    return (
        <MainPageLayout>
            <SearchInput type="text" 
            plceholder="Search for "
            onChange={onInputChange} 
            onKeyDown={onKeyDown} 
            value={input} 
            />
            <RadioInputsWrapper>
                <div>
                <CustomRadio
                label="Shows"
                id="shows-search"
                value="shows"
                checked={isShowsSearch}
                onChange={onRadioChange} 
                />
                </div>
                <div>
                  <CustomRadio
                label="Actors"
                id="actors-search"
                value="people"
                checked={isActorSearch}
                onChange={onRadioChange} 
                />
                </div>
            </RadioInputsWrapper>
            <SearchButtonWrapper>
            <button type="button" onClick={onSearch} >
                Search
            </button>
            </SearchButtonWrapper>
            { renderResult() }
        </MainPageLayout>
    )
}

export default Home
