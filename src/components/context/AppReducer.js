export const AppReducer = (state, action) => {

    switch (action.type) {
        case 'INITIALIZE_DATA':
            const movies = []
            console.log(action)
            action.payload.forEach((app) => movies.unshift(app))
            return {
                movies
            }

        case 'DELETE_MOVIE':
            return {
                movies: state.movies.filter(movie => movie.id !== action.payload)
            }
        case 'CREATE_MOVIE':
            return {
                movies: [action.payload, ...state.movies]
            }

        case 'UPDATE_MOVIE':
            const { payload } = action;
            const updatedMovies = state.movies.map(movie => movie.id === payload.id ? payload : movie)
            return {
                movies: updatedMovies
            }
        default:
            return state
    }
}; 