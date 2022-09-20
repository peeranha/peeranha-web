import React, { useState } from 'react';
import { css } from '@emotion/react';
import * as tus from 'tus-js-client';

import PlusIcon from 'icons/Plus';
import { styles } from './Dropzone.styled';
import FilesPreviewer from './FilesPreviewer';
import { getFileUrl, saveDataIpfsS3 } from '../../../utils/ipfs';
import { livepeerAPI } from '../../../services/livepeer-service';

type DropzoneProps = {
  setMediaLinks: (links: string[]) => void;
  maxImageFileSizeInBytes?: number;
  maxVideoFileSizeInBytes?: number;
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
  abortController: AbortController;
  uploadProgress: string | null;
};

const Dropzone: React.FC<DropzoneProps> = ({
  setMediaLinks,
  maxImageFileSizeInBytes = 5 * 1000 * 1000,
  maxVideoFileSizeInBytes = 1000 * 1000 * 1000,
}): JSX.Element => {
  const [files, setFiles] = useState<Files>({});

  const addNewFile = (file: File, abortController: AbortController): void => {
    setFiles(state => ({
      ...state,
      [file.name]: {
        file,
        fileUrl: '',
        isUploading: true,
        isUploaded: false,
        isFailedUpload: false,
        abortController,
        uploadProgress: null,
      },
    }));
  };

  const removeFile = (fileName: string): void => {
    delete files[fileName];
    setFiles({ ...files });
  };

  const setFileUploadingStatus = (fileName: string): void => {
    setFiles(state => ({
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
    setFiles(state => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        fileUrl,
        isUploading: false,
        isUploaded: true,
      },
    }));
  };

  const setFileFailedUploadStatus = (fileName: string): void => {
    setFiles(state => ({
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
    setFiles(state => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        uploadProgress,
      },
    }));
  };

  const cancelUpload = (abortController: AbortController): void => {
    abortController.abort();
  };

  const uploadImage = async (
    fileContent: string | ArrayBuffer | null,
    fileName: string,
    abortController: AbortController,
  ): Promise<void> => {
    try {
      if (typeof fileContent === 'string') {
        setFileUploadingStatus(fileName);

        const imageData = fileContent.replace(/^data:image\/\w+;base64,/, '');
        const content = Buffer.from(imageData, 'base64');

        const result = await saveDataIpfsS3(
          { content, encoding: 'base64' },
          abortController.signal,
        );
        const fileUrl = getFileUrl(result.body.cid);

        setFileSuccessfulUploadStatus(fileName, fileUrl);
        setMediaLinks([`![](${fileUrl})`]);
      }
    } catch (e) {
      if (e.name === 'AbortError') {
        removeFile(fileName);
      } else {
        setFileFailedUploadStatus(fileName);
      }
    }
  };

  const uploadVideo = async (file: File): Promise<void> => {
    const response = await livepeerAPI.generateUrl(file.name);

    const upload = new tus.Upload(file, {
      endpoint: response.data.tusEndpoint, // URL from `tusEndpoint` field in the `/request-upload` response
      metadata: {
        filename: file.name,
        filetype: 'video/mp4',
      },
      uploadSize: file.size,
      onError(err) {
        setFileFailedUploadStatus(file.name);
      },

      onProgress(bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed();
        setFileUploadProgress(file.name, percentage);
      },
      onSuccess() {
        const playbackId = upload.url.substr(upload.url.lastIndexOf('/') + 1);
        const videoUrl = `<iframe src="https://lvpr.tv?v=${playbackId}"></iframe>`;
        setFileSuccessfulUploadStatus(file.name, upload.url);
        setMediaLinks([videoUrl]);
      },
    });

    upload.start();
  };

  const readAndUploadFile = async (file: File) => {
    const abortController = new AbortController();
    addNewFile(file, abortController);

    if (
      file.type.split('/')[0] === 'image' &&
      file.size < maxImageFileSizeInBytes
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        await uploadImage(reader.result, file.name, abortController);
      };
    }

    if (file.type === 'video/mp4') {
      await uploadVideo(file);
    }
  };

  const getNewFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    if (newFiles) {
      for (let i = 0; i < newFiles.length; i++) {
        if (newFiles[i].size < maxVideoFileSizeInBytes) {
          readAndUploadFile(newFiles[i]);
        }
      }
    }
  };

  return (
    <div>
      <div className="pr df aic jcc mb12" css={css(styles.fileDropzone)}>
        <span className="df aic jcc" css={css(styles.plusIcon)}>
          <PlusIcon fill="rgb(165, 188, 255)" size={[20, 20]} />
        </span>
        <div className="df jcc fdc">
          <span className="fz14 mb4 dn" css={css(styles.dragText)}>
            Drag files
          </span>
          <span className="fz14" css={css(styles.attachText)}>
            Click to <span>attach</span>
          </span>
        </div>
        <input
          type="file"
          accept=".jpeg,.jpg,.png,.gif"
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
        Image (jpeg, jpg, png, and gif image formats. Max file size 5Mb). Video
        (mp4 and aac. Max file size 1Gb)
      </p>
    </div>
  );
};

export default Dropzone;
