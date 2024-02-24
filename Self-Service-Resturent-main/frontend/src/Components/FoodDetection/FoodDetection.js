import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import TotalBill from '../TotalBill/TotalBill';
import './FoodDetection.css';

const FoodDetection = ({ capturedImage }) => {
    const [detectedObjects, setDetectedObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTotalBill, setShowTotalBill] = useState(false);
    const [objectQuantity, setObjectQuantity] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const detectObjects = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load your custom pre-trained model
                const model = await tf.loadGraphModel('path_to_your_model/model.json');

                // Create an image element from the captured image
                const imageElement = document.createElement('img');
                imageElement.src = capturedImage;

                // Make predictions on the image
                const predictions = await model.predict(tf.browser.fromPixels(imageElement));

                // Process predictions as needed
                // For example, extract class names from predictions
                const detectedObjects = processPredictions(predictions);

                // Set detected objects
                setDetectedObjects(detectedObjects);

                // Count object quantity
                const objectQuantity = countObjectQuantity(detectedObjects);
                setObjectQuantity(objectQuantity);

                setLoading(false);

                // Show detected objects for a short duration before showing total bill
                setTimeout(() => {
                    setShowTotalBill(true);
                }, 10000); // Adjust the duration (in milliseconds) as needed

                // Log detected objects to the console
                console.log('Detected objects:', detectedObjects);
            } catch (error) {
                setError('Error detecting objects');
                setLoading(false);
            }
        };

        // Call detectObjects when capturedImage changes
        if (capturedImage) {
            detectObjects();
        }
    }, [capturedImage]);

    // Function to process predictions as needed
    const processPredictions = (predictions) => {
        // Implement your processing logic here
    };

    // Function to count the occurrences of each detected object
    const countObjectQuantity = (detectedObjects) => {
        const objectQuantity = {};
        detectedObjects.forEach(object => {
            objectQuantity[object] = (objectQuantity[object] || 0) + 1;
        });
        return objectQuantity;
    };

    return (
        <div className='capture-image-container'>
            {showTotalBill ? (
                <TotalBill detectedObjects={detectedObjects} objectQuantity={objectQuantity} />
            ) : (
                <div className="capture-form">
                    {loading ? (
                        <div className="loading-container">
                            <h1 className="loading-text">Detecting Food Items</h1>
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" />
                        </div>
                    ) : error ? (
                        <div className="error-container">
                            <p>{error}</p>
                        </div>
                    ) : (
                        <>
                            {capturedImage && (
                                <div className="webcam-container">
                                    <h2 className="header">Your Food Tray</h2>
                                    <img src={capturedImage} alt="Captured" className="webcam" />
                                </div>
                            )}
                            <h2 className="header">Detected Food Items</h2>
                            <ul className="object-list">
                                {Object.entries(objectQuantity).map(([object, quantity]) => (
                                    <li key={object} className="object-list-item">
                                        {object} - Quantity: {quantity}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default FoodDetection;