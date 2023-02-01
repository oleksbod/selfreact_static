import React, { Component } from "react";
import ReactDOM from "react-dom";

import FineUploaderTraditional from "fine-uploader-wrappers";
import  FileInput from "react-fine-uploader";


const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true
        },
        deleteFile: {
            enabled: true,
            endpoint: "/uploads"
        },
        request: {
            endpoint: "/uploads"
        },
        retry: {
            enableAuto: true
        }
    }
});

class UploadComponent extends Component {
    render() {
        return (
            <FileInput  accept='image/*' uploader={ uploader }>

            </FileInput>
        );
    }
}

export default UploadComponent;