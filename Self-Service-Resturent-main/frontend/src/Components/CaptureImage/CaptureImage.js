// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import './CaptureImage.css'; // Import the CSS file for styling
// import ObjectDetection from '../ObjectDetection/ObjectDetection';

// const CaptureImage = () => {
//     const webcamRef = useRef(null);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [showObjectDetection, setShowObjectDetection] = useState(false);



//     const capture = async () => {
//         setLoading(true);
//         //const imageSrc = webcamRef.current.getScreenshot();
//         const imageSrc = '/f3.jpg';
//         setCapturedImage(imageSrc);
//         setLoading(false);
//         setShowObjectDetection(true); // Show the second screen
//     };

//     return (
//         <div className="capture-image-container">
//             {showObjectDetection ? (
//                 <ObjectDetection capturedImage={capturedImage} />
//             ) : (
//                 <div className="capture-form">
//                     <h1 className="welcome-message">Welcome!</h1>
//                     <h2 className="header">Webcam Image Capture</h2>
//                     <h3 className="instruction">Put Your Tray Here</h3>
//                     <div className="webcam-container">
//                         <Webcam
//                             audio={false}
//                             ref={webcamRef}
//                             screenshotFormat="image/jpeg"
//                             className="webcam"
//                         />
//                     </div>
//                     {loading ? (
//                         <p className="loading-text">Capturing image...</p>
//                     ) : (
//                         <button className="capture-button" onClick={capture}>Capture Image</button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CaptureImage;







// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';
// import './CaptureImage.css'; // Import the CSS file for styling
// import ObjectDetection from '../ObjectDetection/ObjectDetection';

// const CaptureImage = () => {
//     const webcamRef = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const [showObjectDetection, setShowObjectDetection] = useState(false);
//     const [capturedImage, setCapturedImage] = useState(null);
   

//     const capture = async () => {
//         setLoading(true);
//         const imageSrc = webcamRef.current.getScreenshot();
//         //const imageSrc = '/f3.jpg';
//         setCapturedImage(imageSrc);
//         const formData = new FormData();
//         formData.append('image', dataURItoBlob(imageSrc)); // Convert data URI to blob
//         try {
//             const response = await fetch('http://localhost:5000/api/upload', {
//                 method: 'POST',
//                 body: formData
//             });
//             if (response.ok) {
//                 const responseData = await response.json();
          
//                 console.log(responseData)
                
//                 setLoading(false);
//                 setShowObjectDetection(true); // Show the second screen
//             } else {
//                 throw new Error('Failed to upload image');
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             setLoading(false);
//         }
//     };

//     // Convert data URI to blob
//     const dataURItoBlob = (dataURI) => {
//         const byteString = atob(dataURI.split(',')[1]);
//         const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     };

//     return (
//         <div className="capture-image-container">
//             {showObjectDetection ? (
//                 <ObjectDetection   capturedImage={capturedImage}
//                />
               
//             ) : (
//                 <div className="capture-form">
//                     <h1 className="welcome-message">Welcome!</h1>
//                     <h2 className="header">Webcam Image Capture</h2>
//                     <h3 className="instruction">Put Your Tray Here</h3>
//                     <div className="webcam-container">
//                         <Webcam
//                             audio={false}
//                             ref={webcamRef}
//                             screenshotFormat="image/jpeg"
//                             className="webcam"
//                         />
//                     </div>
//                     {loading ? (
//                         <p className="loading-text">Capturing image...</p>
//                     ) : (
//                         <button className="capture-button" onClick={capture}>Capture Image</button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CaptureImage;


import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './CaptureImage.css'; // Import the CSS file for styling
import ObjectDetection from '../ObjectDetection/ObjectDetection';

const CaptureImage = () => {
    const webcamRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [showObjectDetection, setShowObjectDetection] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);

    const capture = async () => {
        setLoading(true);
        const imageSrc = webcamRef.current.getScreenshot();
        //const imageSrc = '/f3.jpg';
        setCapturedImage(imageSrc);
        const formData = new FormData();
        formData.append('image', dataURItoBlob(imageSrc)); // Convert data URI to blob
        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                setLoading(false);
                setShowObjectDetection(true); // Show the second screen
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    // Convert data URI to blob
    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div className="capture-image-container">
            {showObjectDetection ? (
                <ObjectDetection capturedImage={capturedImage} />
            ) : (
                <div className="capture-form">
                    <h1 className="welcome-message">Welcome!</h1>
                    <h2 className="header">Webcam Image Capture</h2>
                    <h3 className="instruction">Put Your Tray Here</h3>
                    <div className="webcam-container">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="webcam"
                        />
                    </div>
                    {loading ? (
                        <p className="loading-text">Capturing image...</p>
                    ) : (
                        <button className="capture-button" onClick={capture}>Capture Image</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default CaptureImage;