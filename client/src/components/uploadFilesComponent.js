//Este código define un componente de React basado en clases llamado UploadFiles, 
// que permite a los usuarios seleccionar y subir archivos a un servidor. 
// También muestra una lista de archivos subidos.

import React, { Component } from "react";
import UploadFilesService from "../services/uploadFilesService.js";

export default class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",

            fileInfos: [],
        };
    }

    componentDidMount() {
        UploadFilesService.getFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        UploadFilesService.upload(currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
        .then((response) => {
            this.setState({
                message: response.data.message,
            });
            return UploadFilesService.getFiles();
        })
        .then((files) => {
            this.setState({
                fileInfos: files.data,
            });
        })
        .catch(() => {
            this.setState({
                progress: 0,
                message: "Could not upload the file!",
                currentFile: undefined,
            });
        });

        this.setState({
            selectedFiles: undefined,
        });
    }

    render() {
        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            fileInfos,
        } = this.state;

        return (
            <div>
                {/* Interfaz gráfica */}
                {currentFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                )}

                {/* Botón de selección de archivo */}
                <label className="btn btn-default">
                    <input type="file"  onChange={this.selectFile} />
                </label>

                {/*Botón para subir el archivo */}
                <button 
                    className="btn btn-success" 
                    disabled={!selectedFiles}
                    onClick={this.upload}
                    >
                    Subir
                </button>

                {/*Mostrar mensajes de éxito o error */}
                <div className="alert alert-light" role="alert">
                    {message}
                </div>

                {/*Mostrar la lista de archivos subidos */}
                <div className="card">
                    <div className="card-header">Lista de Archivos</div>
                    <ul className="list-group list-group-flush">
                    {fileInfos &&
                        fileInfos.map((file, index) => (
                        <li className="list-group-item" key={index}>
                            <a href={file.url}>{file.name}</a>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
        );
    }

}


