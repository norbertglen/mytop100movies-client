import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "./context/GlobalState";
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/EditMovie/EditMovie.module.css';
import Field from './UI/Field';
import Rating from './UI/Rating';
import Button from './UI/Button';

const EditMovie = (props) => {
    const navigate = useNavigate();
    const { id: currentMovieId } = useParams();
    const [selectedMovie, setSelectedMovie] = useState({
        title: '',
        rating: 0
    })
    const { movies, editMovie } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const selectedMovie = movies.find(movie => movie.id === Number(currentMovieId))
        setSelectedMovie(selectedMovie);
        setLoading(false)
    }, [currentMovieId, movies])

    const onSubmit = function (e) {
        editMovie(selectedMovie)
        navigate('/')
    }

    const onTitleChange = function (e) {
        setSelectedMovie({ ...selectedMovie, [e.target.name]: e.target.value })
    }

    const onRatingChange = function (rating) {
        setSelectedMovie({ ...selectedMovie, rating })
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <Field
                label="Movie Title"
                name="title"
                value={selectedMovie.title}
                type="text"
                placeholder="Title of the movie"
                onChange={onTitleChange}
            />

            <Rating name="rating" onChange={onRatingChange} value={selectedMovie.rating} />

            <div className={styles.buttons}>
                <Button type="submit" className={styles.edit_movie}> Done</Button>
                <Link to="/" className={styles.link}> Cancel</Link>
            </div>
        </form>
    )
}

export default EditMovie