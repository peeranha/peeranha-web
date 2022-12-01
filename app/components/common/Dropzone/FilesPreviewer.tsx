import React from 'react';
import { Upload } from 'tus-js-client';

import { Files } from './Dropzone';
import FilePreviewer from './FilePreviewer';
import ScrollContainer from '../../../containers/ScrollContainer';

type FilesPreviewerProps = {
  files: Files;
  readAndUploadFile: (
    file: File,
    fileName: string,
    abortController?: AbortController | Upload,
  ) => void;
  removeFile: (fileName: string) => void;
  cancelUpload: (
    fileName: string,
    abortController?: AbortController | Upload,
  ) => void;
};

const FilesPreviewer: React.FC<FilesPreviewerProps> = ({
  files,
  readAndUploadFile,
  removeFile,
  cancelUpload,
}): JSX.Element => (
  <ScrollContainer className="mb12">
    <div className="df mb4">
      {Object.keys(files).map((fileName) => {
        const fileData = files[fileName];

        return (
          <FilePreviewer
            key={fileData.file.name}
            file={fileData.file}
            fileUrl={fileData.fileUrl}
            isUploading={fileData.isUploading}
            isUploaded={fileData.isUploaded}
            isFailedUpload={fileData.isFailedUpload}
            abortController={fileData.abortController}
            uploadProgress={fileData.uploadProgress}
            fileName={fileName}
            readAndUploadFile={readAndUploadFile}
            removeFile={removeFile}
            cancelUpload={cancelUpload}
          />
        );
      })}
    </div>
  </ScrollContainer>
);

export default FilesPreviewer;
