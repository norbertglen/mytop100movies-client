import React from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import styles from "../styles/ActionBar/actionbar.module.css";

const ActionBar = () => {
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <ul>
                        <li>
                            <Link className={styles.link} to="/add">
                                <BiPlus />Add Movie
                            </Link>
                        </li>
                    </ul>

                </nav>
            </header>
        </>
    );
};

export default ActionBar;
