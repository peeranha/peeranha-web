import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Upload } from 'tus-js-client';

import PlusWithoutCircleIcon from 'icons/PlusWithoutCircle';
import { styles } from './Dropzone.styled';
import FilesPreviewer from './FilesPreviewer';

type DropzoneProps = {
  config: Array<{
    types: Array<string>;
    maxFileSizeInBytes: number;
    uploadFile: (
      file: File,
      setMediaLink: (link: string) => void,
      setFileFailedUploadStatus: (fileName: string) => void,
      setFileSuccessfulUploadStatus: (
        fileName: string,
        fileUrl: string,
      ) => void,
      setFileAbortController: (
        fileName: string,
        abortController: AbortController | Upload,
      ) => void,
      setFileUploadingStatus?: (fileName: string) => void,
      setFileUploadProgress?: (
        fileName: string,
        uploadPercentage: string,
      ) => void,
    ) => Promise<void>;
    saveUploadedFileLink: (link: string) => void;
    showUploadProgress: boolean;
  }>;
  translations: {
    dragFiles: string;
    clickTo: string;
    attach: string;
    mediaRestrictions: string;
  };
  showToast?: (toastSettings: { type: string; text: string }) => void;
};

export type Files = {
  [P: string]: SingleFile;
};

type SingleFile = {
  file: File;
  fileUrl: string;
  isUploading: boolean;
  isUploaded: boolean;
  isFailedUpload: boolean;
  abortController?: AbortController | Upload;
  uploadProgress: string | null;
};

const Dropzone: React.FC<DropzoneProps> = ({
  config,
  translations,
  showToast,
}): JSX.Element => {
  const [files, setFiles] = useState<Files>({});

  const addNewFile = (file: File): void => {
    setFiles((state) => ({
      ...state,
      [file.name]: {
        file,
        fileUrl: '',
        isUploading: true,
        isUploaded: false,
        isFailedUpload: false,
        uploadProgress: null,
      },
    }));
  };
  const removeFile = (fileName: string): void => {
    delete files[fileName];
    setFiles({ ...files });
  };
  const setFileUploadingStatus = (fileName: string): void => {
    setFiles((state) => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        isUploading: true,
        isFailedUpload: false,
      },
    }));
  };
  const setFileSuccessfulUploadStatus = (
    fileName: string,
    fileUrl: string,
  ): void => {
    setFiles((state) => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        isUploading: false,
        isUploaded: true,
        fileUrl,
      },
    }));
  };
  const setFileFailedUploadStatus = (fileName: string): void => {
    setFiles((state) => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        isUploading: false,
        isFailedUpload: true,
      },
    }));
  };
  const setFileUploadProgress = (
    fileName: string,
    uploadProgress: string,
  ): void => {
    setFiles((state) => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        uploadProgress,
      },
    }));
  };
  const setFileAbortController = (
    fileName: string,
    abortController: AbortController | Upload,
  ): void => {
    setFiles((state) => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        abortController,
      },
    }));
  };
  const cancelUpload = (
    fileName: string,
    abortController?: AbortController | Upload,
  ): void => {
    if (abortController) abortController.abort();
    removeFile(fileName);
  };

  const readAndUploadFile = async (file: File) => {
    let isCorrectFile = false;

    config.forEach((element) => {
      const isPermittedFileType = element.types.find(
        (type) => type === file.type || type === file.type.split('/')[0],
      );

      if (isPermittedFileType && file.size < element.maxFileSizeInBytes) {
        addNewFile(file);
        isCorrectFile = true;

        element.uploadFile(
          file,
          element.saveUploadedFileLink,
          setFileFailedUploadStatus,
          setFileSuccessfulUploadStatus,
          setFileAbortController,
          element.showUploadProgress
            ? setFileUploadProgress
            : setFileUploadingStatus,
        );
      }
    });

    if (!isCorrectFile && showToast) {
      showToast({
        type: 'error',
        text: 'Incorrect file format!',
      });
    }
  };

  const getNewFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    if (newFiles) {
      for (let i = 0; i < newFiles.length; i++) {
        readAndUploadFile(newFiles[i]);
      }
    }
  };

  return (
    <div>
      <div className="pr df aic jcc mb12" css={css(styles.fileDropzone)}>
        <span className="df aic jcc" css={css(styles.plusIcon)}>
          <PlusWithoutCircleIcon fill="rgb(165, 188, 255)" size={[20, 20]} />
        </span>
        <div className="df jcc fdc">
          <span className="fz14 mb4 dn" css={css(styles.dragText)}>
            {translations.dragFiles}
          </span>
          <span className="fz14" css={css(styles.attachText)}>
            {translations.clickTo}
            <span>{translations.attach}</span>
          </span>
        </div>
        <input
          type="file"
          multiple={true}
          className="db full-width bd0 pa t0 b0 r0 l0 cup clarity"
          onChange={getNewFiles}
          title=""
          value=""
        />
      </div>
      <FilesPreviewer
        files={files}
        readAndUploadFile={readAndUploadFile}
        removeFile={removeFile}
        cancelUpload={cancelUpload}
      />
      <p className="fz12" css={css(styles.restrictionsText)}>
        {translations.mediaRestrictions}
      </p>
    </div>
  );
};

export default Dropzone;
