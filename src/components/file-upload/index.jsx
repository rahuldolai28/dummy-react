import { useState, useRef } from "react";
import "./upload.css";

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const uploadReference = useRef();
    const progressReference = useRef();
    const statusReference = useRef();
    const loadingReference = useRef();

    function handleUploadFile(e) {
        const file = uploadReference.current.files[0]; // get the first file
        //array used for multiple file upload
        setFile(URL.createObjectURL(file)); // create a url for the file
        let formData = new FormData(); // create a form data object
        formData.append("image", file);
        let xhr = new XMLHttpRequest();
        xhr.upload.addEventListener("progress", handleProgress);
        xhr.addEventListener("load", handleSuccess);
        xhr.addEventListener("error", handleError);
        xhr.addEventListener("abort", handleAbort);

        xhr.open("POST", "https://v2.convertapi.com/upload");
        xhr.send(formData); // send the form data to the server
    }

    function handleProgress(e) {
        loadingReference.current.innerHTML = `Uploaded ${e.loaded} bytes of ${e.total}`;
        const percentage = (e.loaded / e.total) * 100;
        progressReference.current.value = Math.round(percentage);
        statusReference.current.innerHTML = `${Math.round(
            percentage
        )} % uploaded...`;
    }

    function handleSuccess(e) {
        statusReference.current.innerHTML = e.target.responseText;
        progressReference.current.value = 0;
    }

    function handleError() {
        statusReference.current.innerHTML =
            "Upload failed! Please try again...";
    }

    function handleAbort() {
        statusReference.current.innerHTML =
            "Upload aborted! Please try again...";
    }

    return (
        <div className="file-upload-container">
            <h1 className="title">10. File Upload</h1>
            <input
                type="file"
                // multiple
                name="file"
                ref={uploadReference}
                onChange={handleUploadFile}
            />
            <label htmlFor="">
                File progess:
                <progress ref={progressReference} value={"0"} max={"100"} />
            </label>
            <p ref={statusReference}></p>
            <p className="status" ref={loadingReference}></p>

            <div
                className="image-preview"
                style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    backgroundImage: file ? `url(${file})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "10px 0",
                    color: "#999",
                    fontSize: "18px",
                    marginBottom: "30px",
                }}>
                {!file && "Upload image"}
            </div>
        </div>
    );
}
