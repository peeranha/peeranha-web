import React from 'react';

import { Files } from './Dropzone';
import FilePreviewer from './FilePreviewer';

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
  <div className="df mb12">
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
);

export default FilesPreviewer;
