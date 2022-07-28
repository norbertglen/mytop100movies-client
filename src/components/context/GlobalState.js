import React, { createContext, useReducer, useEffect } from 'react';
import Axios from "axios";
import { AppReducer } from './AppReducer';

const initialState = {
    movies: []
}

const API_URL = `${process.env.REACT_APP_API_URL}/api`

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    useEffect(() => {
        Axios.get(`${API_URL}/movies?userId=1`)
            .then((response) => dispatch({ type: 'INITIALIZE_DATA', payload: response.data.payload }));
    }, []);

    const deleteMovie = async (id) => {
        try {
            await Axios.delete(`${API_URL}/movies/${id}`);
            dispatch({
                type: 'DELETE_MOVIE',
                payload: id
            })
        } catch (error) {
            console.error(error)
            dispatch({
                type: 'NOTIFY_ERROR',
                payload: error.message
            })
        }
    }

    const addMovie = async (movie) => {
        try {
            const res = await Axios.post(`${API_URL}/movies`, movie)
            dispatch({
                type: 'CREATE_MOVIE',
                payload: res.data.payload
            })
        } catch (error) {
            dispatch({
                type: 'NOTIFY_ERROR',
                payload: error.message
            })
        }

    }

    const editMovie = async (movie) => {
        try {
            await Axios.put(`${API_URL}/movies/${movie.id}`, movie);
            dispatch({
                type: 'UPDATE_MOVIE',
                payload: movie,
            })
        } catch (error) {
            dispatch({
                type: 'NOTIFY_ERROR',
                payload: error.message
            })
        }

    }

    return (
        <GlobalContext.Provider value={{
            movies: state.movies,
            deleteMovie,
            addMovie,
            editMovie,
        }}>
            {children}
        </GlobalContext.Provider>
    )
});