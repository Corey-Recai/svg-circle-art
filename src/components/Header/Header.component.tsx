/** @format */

import React from "react";
import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <nav className={styles.nav}>
            <div className={`${styles["nav__wrapper"]} grid shadow-400`}>
                <div className={styles["img__container"]}>
                    <img src="/assets/logos/logo.png" alt="logo" />
                </div>
            </div>
        </nav>
    );
};
