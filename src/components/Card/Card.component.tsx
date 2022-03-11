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
        const imageTimer = generateImage();
        return () => clearTimeout(imageTimer);
    }, [svgWidth, svgHeight, setSvgWidth, setSvgHeight]);

    const getRandomNumber = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min)) + min;

    const getRandomRgbValue = () => Math.floor(Math.random() * 255) + 1;

    const getRandomColor = () =>
        `rgba(${getRandomRgbValue()}, ${getRandomRgbValue()}, ${getRandomRgbValue()}, ${Math.random()})`;

    const generateImage = (): NodeJS.Timeout => {
        const svg = d3.select(svgRef.current);
        setSvgWidth(parseFloat(svg.style("width")));
        setSvgHeight(parseFloat(svg.style("height")));
        setTotalPixels(getRandomNumber(10, 125));

        svg.attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

        svg.select("rect")
            .attr("x", 0)
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .attr("rx", "1em")
            .attr("fill", getRandomColor());

        for (let i = 0; i < totalPixels; i++) {
            const circle = svg.select("g").append("circle");
            circle
                .attr("r", `${Math.random()}em`)
                .attr("fill", getRandomColor())
                .attr("cx", getRandomNumber(32, svgWidth - 32))
                .attr("cy", getRandomNumber(32, svgHeight - 32));

            const colorValues = Array.from({ length: 60 }, () =>
                getRandomColor()
            );

            const radiusValues = Array.from(
                { length: 60 },
                () => `${Math.random()}em`
            );

            const xValues = Array.from({ length: 60 }, () =>
                getRandomNumber(32, svgWidth - 32)
            );

            const yValues = Array.from({ length: 60 }, () =>
                getRandomNumber(32, svgHeight - 32)
            );

            circle
                .append("animate")
                .attr("attributeName", "fill")
                .attr("values", colorValues.join(";"))
                .attr("dur", "60s")
                .attr("repeatCount", "indefinite")
                .attr("calcMode", "paced");

            circle
                .append("animate")
                .attr("attributeName", "r")
                .attr("values", radiusValues.join(";"))
                .attr("dur", "60s")
                .attr("repeatCount", "indefinite")
                .attr("calcMode", "paced");

            circle
                .append("animate")
                .attr("attributeName", "cx")
                .attr("values", xValues.join(";"))
                .attr("dur", "60s")
                .attr("repeatCount", "indefinite")
                .attr("calcMode", "paced");

            circle
                .append("animate")
                .attr("attributeName", "cy")
                .attr("values", yValues.join(";"))
                .attr("dur", "60s")
                .attr("repeatCount", "indefinite")
                .attr("calcMode", "paced");
        }
        return setTimeout(() => {
            reset();
            generateImage();
        }, 60000);
    };

    const reset = () => {
        const svg = d3.select(svgRef.current);
        svg.select("g").selectAll("circle").remove();
    };

    const saveImage = () => {
        const svgData = svgRef.current?.outerHTML;
        const svgBlob = new Blob([svgData as string], {
            type: "image/svg+xml",
        });

        const downloadLink = document.createElement("a");
        downloadLink.style.visibility = "hidden";
        const url = URL.createObjectURL(svgBlob);
        downloadLink.href = url;
        downloadLink.download = "circles.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        setTimeout(function () {
            document.body.removeChild(downloadLink);
            window.URL.revokeObjectURL(url);
        }, 0);
    };

    return (
        <div
            onClick={saveImage}
            className={`${styles["card__wrapper"]} shadow-600`}
        >
            <svg
                ref={svgRef}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <rect />
                <g></g>
            </svg>
        </div>
    );
};
