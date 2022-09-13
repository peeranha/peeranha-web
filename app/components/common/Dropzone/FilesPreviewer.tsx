import React from 'react';

import { Files } from './Dropzone';
import FilePreviewer from './FilePreviewer';
import ScrollContainer from '../../../containers/ScrollContainer';

type FilesPreviewerProps = {
  files: Files;
  readAndUploadFile: (file: File, fileName: string) => void;
  removeFile: (fileName: string) => void;
};

const FilesPreviewer: React.FC<FilesPreviewerProps> = ({
  files,
  readAndUploadFile,
  removeFile,
}): JSX.Element => (
  <ScrollContainer className="mb12">
    <div className="df mb4">
      {Object.keys(files).map(fileName => {
        const fileData = files[fileName];
        return (
          <FilePreviewer
            key={fileData.file.name}
            file={fileData.file}
            fileUrl={fileData.fileUrl}
            isUploading={fileData.isUploading}
            isUploaded={fileData.isUploaded}
            isFailedUpload={fileData.isFailedUpload}
            fileName={fileName}
            readAndUploadFile={readAndUploadFile}
            removeFile={removeFile}
          />
        );
      })}
    </div>
  </ScrollContainer>
);

export default FilesPreviewer;
