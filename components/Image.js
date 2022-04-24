import NextImage from "next/image";
import { getStrapiMedia } from "../lib/media";

const Image = ({ image }) => {
    const { alternativeText, width, height } = image.data.attributes;

    return (
        <>
            {image && (
                <NextImage
                    priority
                    as={"image"}
                    layout="responsive"
                    width={width || "300px"}
                    height={height || "200px"}
                    objectFit="contain"
                    src={getStrapiMedia(image)}
                    alt={alternativeText || ""}
                />
            )}
        </>
    );
};

export default Image;
