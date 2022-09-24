import React, { useState } from 'react';
import { css } from '@emotion/react';
import * as tus from 'tus-js-client';
import { Upload } from 'tus-js-client';

import { FormattedMessage } from 'react-intl';
import PlusIcon from 'icons/Plus';
import { styles } from './Dropzone.styled';
import FilesPreviewer from './FilesPreviewer';
import { getFileUrl, saveDataIpfsS3 } from '../../../utils/ipfs';
import { livepeerAPI } from '../../../services/livepeer-service';
import messages from '../../QuestionForm/messages';

type DropzoneProps = {
  setMediaLink: (link: string) => void;
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
  abortController?: AbortController | Upload;
  uploadProgress: string | null;
};

const Dropzone: React.FC<DropzoneProps> = ({
  setMediaLink,
  maxImageFileSizeInBytes = 5 * 1000 * 1000,
  maxVideoFileSizeInBytes = 1000 * 1000 * 1000,
}): JSX.Element => {
  const [files, setFiles] = useState<Files>({});

  const addNewFile = (file: File): void => {
    setFiles(state => ({
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
    setFiles(state => ({
      ...state,
      [fileName]: {
        ...state[fileName],
        isUploading: true,
        isFailedUpload: false,
      },
    }));
  };

  const setFileSuccessfulUploadStatus = (fileName: string): void => {
    setFiles(state => ({
      ...state,
      [fileName]: {
        ...state[fileName],
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

  const setFileAbortController = (
    fileName: string,
    abortController: AbortController | Upload,
  ): void => {
    setFiles(state => ({
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

        setFileSuccessfulUploadStatus(fileName);
        setMediaLink(`![](${fileUrl})`);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        setFileFailedUploadStatus(fileName);
      }
    }
  };

  const uploadVideo = async (file: File): Promise<void> => {
    try {
      const response = await livepeerAPI.generateUrl(file.name);

      const upload = new tus.Upload(file, {
        endpoint: response.data.tusEndpoint, // URL from `tusEndpoint` field in the `/request-upload` response
        metadata: {
          filename: file.name,
          filetype: 'video/mp4',
        },
        uploadSize: file.size,
        onError() {
          setFileFailedUploadStatus(file.name);
        },

        onProgress(bytesUploaded, bytesTotal) {
          const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed();
          setFileUploadProgress(
            file.name,
            percentage === '100' ? '99' : percentage,
          );
        },

        onSuccess() {
          const { playbackId, id } = response.data.asset;

          const getAssetInfoInterval = setInterval(async () => {
            const assetInfo = await livepeerAPI.getAssetInfo(id);
            if (assetInfo.data.status.phase !== ('processing' || 'waiting')) {
              setFileUploadProgress(file.name, '100');
              clearInterval(getAssetInfoInterval);
              setFileSuccessfulUploadStatus(file.name);
              setMediaLink(
                `<br><iframe src="https://lvpr.tv?v=${playbackId}&autoplay=0" allowfullscreen style="min-width:50%;"></iframe><br>`,
              );
            }
          }, 5000);
        },
      });

      setFileAbortController(file.name, upload);
      upload.start();
    } catch (e) {
      setFileFailedUploadStatus(file.name);
    }
  };

  const readAndUploadFile = async (file: File) => {
    addNewFile(file);

    if (
      file.type.split('/')[0] === 'image' &&
      file.size < maxImageFileSizeInBytes
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const abortController = new AbortController();
        setFileAbortController(file.name, abortController);

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
            <FormattedMessage id={messages.dragFiles.id} />
          </span>
          <span className="fz14" css={css(styles.attachText)}>
            <FormattedMessage id={messages.clickTo.id} />
            <span>
              <FormattedMessage id={messages.attach.id} />
            </span>
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
        <FormattedMessage id={messages.mediaRestrictions.id} />
      </p>
    </div>
  );
};

export default Dropzone;
