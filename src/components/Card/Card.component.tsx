/** @format */

import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Card.module.scss";
type Props = {};

export const Card = (props: Props) => {
    const [svgWidth, setSvgWidth] = useState(0);
    const [svgHeight, setSvgHeight] = useState(0);
    const [totalPixels, setTotalPixels] = useState(0);

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const changeTime = 25 * 1000;

        generateImage();

        animateImage();

        const animationTimer = setTimeout(() => animateImage(), changeTime);

        return () => clearTimeout(animationTimer);
    }, [svgWidth, svgHeight, setSvgWidth, setSvgHeight]);

    const getRandomNumber = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min)) + min;

    const getRandomRgbValue = () => Math.floor(Math.random() * 255) + 1;

    const getRandomColor = () =>
        `rgba(${getRandomRgbValue()}, ${getRandomRgbValue()}, ${getRandomRgbValue()}, ${Math.random()})`;

    const animateImage = () => {
        d3.select(svgRef.current)
            .selectAll("circle")
            .each(function () {
                d3.select(this)
                    .attr("fill", getRandomColor())
                    .attr("r", `${Math.random()}em`);
            });
    };

    const generateImage = () => {
        const svg = d3.select(svgRef.current);
        setSvgWidth(parseFloat(svg.style("width")));
        setSvgHeight(parseFloat(svg.style("height")));
        setTotalPixels(getRandomNumber(10, 125));

        const pixelGroup = svg.append("g");

        for (let i = 0; i < totalPixels; i++) {
            pixelGroup
                .append("circle")
                .attr("r", `${Math.random()}em`)
                .attr("fill", getRandomColor())
                .attr("cx", getRandomNumber(32, svgWidth - 32))
                .attr("cy", getRandomNumber(32, svgHeight - 32));
        }

        svg.style("background-color", getRandomColor());
    };

    return (
        <div className={`${styles["card__wrapper"]} shadow-600`}>
            <svg ref={svgRef}></svg>
        </div>
    );
};
