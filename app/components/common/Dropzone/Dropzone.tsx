import React, { useState } from 'react';
import { css } from '@emotion/react';

import PlusIcon from 'icons/Plus';
import { styles } from './Dropzone.styled';
import FilesPreviewer from './FilesPreviewer';
import { getFileUrl, saveDataIpfsS3 } from '../../../utils/ipfs';

type DropzoneProps = {
  setMediaLinks: (links: string[]) => void;
  maxImageFileSizeInBytes?: number;
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
};

const Dropzone: React.FC<DropzoneProps> = ({
  setMediaLinks,
  maxImageFileSizeInBytes = 5 * 1000 * 1000,
}): JSX.Element => {
  const [files, setFiles] = useState<Files>({});

  const removeFile = (fileName: string) => {
    delete files[fileName];
    setFiles({ ...files });
  };

  const cancelUpload = (abortController: AbortController) => {
    abortController.abort();
  };

  const uploadImg = async (
    img: string | ArrayBuffer | null,
    signal: AbortSignal,
  ) => {
    const data = img.replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(data, 'base64');

    const result = await saveDataIpfsS3(
      { content: buf, encoding: 'base64' },
      signal,
    );

    const imgUrl = getFileUrl(result.body.cid);
    return { imgUrl };
  };

  const uploadFile = (
    reader: FileReader,
    fileName: string,
    abortController: AbortController,
  ) => {
    setFiles({
      ...files,
      [fileName]: {
        ...files[fileName],
        isUploading: true,
        isFailedUpload: false,
      },
    });

    uploadImg(reader.result, abortController.signal)
      .then(res => {
        setMediaLinks([`![](${res.imgUrl})`]);
        files[fileName] = {
          ...files[fileName],
          fileUrl: res.imgUrl,
          isUploading: false,
          isUploaded: true,
        };
        setFiles({
          ...files,
        });
      })
      .catch(e => {
        if (e.name === 'AbortError') {
          removeFile(fileName);
        } else {
          setFiles({
            ...files,
            [fileName]: {
              ...files[fileName],
              isUploading: false,
              isFailedUpload: true,
            },
          });
        }
      });
  };

  const readAndUploadFile = (
    file: File,
    fileName: string,
    abortController: AbortController,
  ) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      uploadFile(reader, fileName, abortController);
    };
  };

  const getNewFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = e.target;
    if (newFiles) {
      for (let i = 0; i < newFiles.length; i++) {
        if (newFiles[i].size < maxImageFileSizeInBytes) {
          const abortController = new AbortController();

          files[newFiles[i].name] = {
            file: newFiles[i],
            fileUrl: '',
            isUploading: true,
            isUploaded: false,
            isFailedUpload: false,
            abortController,
          };
          setFiles({
            ...files,
          });

          readAndUploadFile(newFiles[i], newFiles[i].name, abortController);
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
