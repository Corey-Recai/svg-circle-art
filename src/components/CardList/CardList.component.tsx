/** @format */

import { Card } from "components/Card";
import React from "react";
import styles from "./CardList.module.scss";
import LazyLoad from "react-lazyload";
type Props = {};

const Items = Array.from(Array(8).keys());
export const CardList = (props: Props) => {
    return (
        <div className={`${styles["card__list__wrapper"]} grid`}>
            {Items.map((item) => (
                <LazyLoad offset={12} key={item}>
                    <Card key={item} />
                </LazyLoad>
            ))}
        </div>
    );
};
