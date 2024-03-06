
import { UploadButton } from "react-uploader";

const options = {
    apiKey: "free",
    maxFileCount: 10
};
export const MyUploadButton = ({setFiles}) =>
    <UploadButton options={options}
                  onComplete={setFiles}>
        {({onClick}) =>
            <button onClick={onClick}>
                Upload a file...
            </button>
        }
    </UploadButton>


// -----------------------------
// Display the uploaded files...
// -----------------------------

export const MyUploadedFiles = ({files}) => files.map(file => {
    // Save 'filePath' to your DB, and construct URLs using UrlBuilder:
    return (
        <p>
            <a>{files}</a>
        </p>
    );
})