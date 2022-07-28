import React, { useState, useContext, useReducer, useEffect } from "react";
import { GlobalContext } from "./context/GlobalState";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/AddNewMovie/AddNewMovie.module.css";
import Button from "./UI/Button";
import Field from "./UI/Field";
import Rating from "./UI/Rating";

const NewMovie = () => {
    const { addMovie } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);

    // title
    const [title, dispatchTitle] = useReducer(
        (state, action) => {
            if (action.type === "FIELD_UPDATE") {
                return { value: action.val, isValid: action.val.length > 5 }
            }

            return { value: "", isValid: false }
        },
        { value: "", isValid: null }
    )

    // rating
    const [rating, dispatchRating] = useReducer(
        (state, action) => {
            if (action.type === 'FIELD_UPDATE') {
                return { value: action.val, isValid: action.val !== '' }
            }

            return { value: '', invalid: false }
        },
        { value: '', isValid: false }
    )

    const { isValid: titleIsValid } = title;
    const { isValid: ratingIsValid } = rating;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFormValid(
                titleIsValid && ratingIsValid !== false
            );
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [titleIsValid, ratingIsValid]);


    const onSubmit = function (e) {
        e.preventDefault()
        if (isFormValid !== true) return

        const movie = {
            title: title.value,
            rating: rating.value,
            userId: 1, // to be removed after auth is implemented
        };
        addMovie(movie);
        navigate("/");
    };

    const onTitleChange = function (e) {
        dispatchTitle({ type: "FIELD_UPDATE", val: e.target.value })
    };

    const onRatingChange = function (val) {
        dispatchRating({ type: "FIELD_UPDATE", val });
    };

    return (
        <form onSubmit={onSubmit} className={`${styles.form}`}>
            <Field
                label="Movie Title"
                value={title.value}
                type="text"
                placeholder="Search for your favorite movie"
                onChange={onTitleChange}
                className={`${title.isValid === false ? styles.invalid : ''}`}
            />

            <Rating onChange={onRatingChange} />

            <div className={styles.buttons}>
                <Button type="submit" className={`${isFormValid ? styles.submit : styles.disabled}`}>
                    Submit
                </Button>
                <Link to="/" className={styles.link}>
                    Cancel
                </Link>
            </div>
        </form>
    );
};

export default NewMovie;
