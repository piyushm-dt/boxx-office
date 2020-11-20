/* eslint-disable no-underscore-dangle */
import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../components/show/Cast';
import Details from '../components/show/Details';
import Seasons from '../components/show/Seasons';
import ShowMainData from '../components/show/ShowMainData';
import { apiGet } from '../misc/config';


const reducer = (prevState, action) => {
    switch(action.type){

        case 'FETCH_SUCCESS' : {
            return {isLoading: false, error: null, show: action.show};
        }
        case 'FETCH_FAILED' : {
            return {...prevState, isLoading: false, error: action.error };
        }
        default: return prevState
    }
}

const initialState = {
    show: null,
    isLoading: true,
    error: null
}

function Show() {

    const { id } = useParams();

    const [{ show, isLoading, error }, dispatch] = useReducer(reducer, initialState );

    
    useEffect( () => {

        let isMounted = true;

        apiGet(`/show/${id}?embed[]=cast`)
        .then(res => {
                if(isMounted){
                    dispatch( { type: 'FETCH_SUCCESS', show: res } )
                }
        }).catch(err => {
            if(isMounted){
            dispatch( { type: 'FETCH_FAILED', error: err.message } )
            }
        });

        return () => { isMounted = false; }
    }, [id] );


    if(isLoading) {
        return <div>Loading ....</div>
    }
    if(error) {
        return <div>Error occurred {error} </div>
    }
    return (
        <div>
            <ShowMainData 
            image={show.image}
            name={show.name}
            rating={show.rating}
            summary={show.summary}
            tags={show.genres}
            />
            <div>
                <h2>Details</h2>
                <Details
                status={show.status}
                network={show.network}
                premiered={show.premiered}
                 />
            </div>
            <div>
                <h2>Seasons</h2>
                <Seasons 
                seasons={show._embedded.seasons}
                />
            </div>
            <div>
                <h2>Cast</h2>
                <Cast 
                cast={show._embedded.cast}
                />
            </div>
        </div>
    )
}

export default Show
