import React, { useState, useEffect } from 'react';
import './Images.css'

function Images() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Fetch images from the backend when the component mounts
        fetch('http://localhost:5000/api/images')
            .then(response => response.json())
            .then(data => setImages(data))
            .catch(error => console.error('Error fetching images:', error));
    }, []);

    return (
        <div>
            <h1>Saved Images with Dates</h1>
            <ul>
                {images.map((image, index) => (
                    <li key={index}>
                        <img src={`data:${image.contentType};base64,${image.data}`} alt={`Image ${index}`} />
                        <p>Upload Date: {new Date(image.uploadDateTime).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Images;


