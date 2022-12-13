import { useState } from "react";

export const ImageToBase64 = (props) => {
    const {
        url, width, height, alt, title
    } = props;

    var imageBase64 = '';

    const [data, setData] = useState(url);

 fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                imageBase64 = reader.result.split(',')[1];
                setData("data:image/png;base64," + imageBase64);
            };
        }).catch(error => {
            // element.parentElement.innerHTML = `Error: ${error}`;
            console.error('There was an error!', error);
        });

    return (
        <img
            src={data}
            width={width}
            height={height}
            alt={alt}
            title={title}
        ></img>
    );
}