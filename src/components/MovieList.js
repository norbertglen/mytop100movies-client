import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "./context/GlobalState";
import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import styles from "../styles/MovieList/MovieList.module.css";
import Button from "./UI/Button";
import Rating from "./UI/Rating";

const MovieList = () => {
    const { movies, deleteMovie, editMovie } = useContext(GlobalContext);

    return (
        <table className={styles["content-table"]}>
            <thead>
                <tr>
                    <th className={styles.title}>Movie Title</th>
                    <th className={styles.rating}>Rating</th>
                    <th className={styles.time}>Created</th>
                    <th className={styles.time}>Last Update</th>
                    <th className={styles.action}>Actions</th>
                </tr>
            </thead>
            {movies.length > 0 ? (
                <tbody>
                    {movies.map((movie) => {
                        return (
                            <tr key={movie.id}>
                                <td>{movie.title}</td>
                                <td><Rating value={movie.rating} onChange={(val) => editMovie({ ...movie, rating: val })} /></td>
                                <td>{new Date(movie.createdAt).toLocaleDateString("en-US")}</td>
                                <td>{new Date(movie.updatedAt).toLocaleDateString("en-US")}</td>
                                <td>
                                    <>
                                        <Link
                                            to={`/edit/${movie.id}`}
                                            id={styles.link}
                                            className={styles.link}
                                        >
                                            <BsPencil />
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() =>
                                                deleteMovie(movie.id)
                                            }
                                            className={styles.button}
                                        >
                                            <MdDeleteForever />
                                            Delete
                                        </Button>
                                    </>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            ) : (
                <tr><td colSpan={5}>No top movies added to this list yet. Please use the "Add Movie" button to add new movies.</td></tr>
            )}
        </table>
    );
};

export default MovieList;
