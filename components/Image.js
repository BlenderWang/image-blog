import NextImage from "next/image";
import { getStrapiMedia } from "../lib/media";

const Image = ({ image }) => {
    const { alternativeText, width, height } = image.data.attributes;

    return (
        <NextImage
            layout="responsive"
            width={width || "200px"}
            height={height || "200px"}
            objectFit="contain"
            src={getStrapiMedia(image)}
            alt={alternativeText || ""}
        />
    );
};

export default Image;
