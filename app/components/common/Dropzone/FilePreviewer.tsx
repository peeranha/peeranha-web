import React, { useState } from 'react';
import { css } from '@emotion/react';
import CloseRoundedIcon from 'icons/CloseRounded';
import DeleteIcon from 'icons/Delete';
import CopyLinkIcon from 'icons/CopyLink';
import Spinner from 'components/common/Spinner';
import VoteIcon from 'icons/Vote';
import CloseIcon from 'icons/Close';
import ReloadRoundedIcon from 'icons/ReloadRounded';
import AreYouSure from '../../../containers/ViewQuestion/AreYouSure';

import { styles } from './FilePreviewer.styled';

type FilePreviewerProps = {
  file: File;
  fileUrl: string;
  isUploading: boolean;
  isUploaded: boolean;
  isFailedUpload: boolean;
  abortController: AbortController;
  fileName: string;
  readAndUploadFile: (
    file: File,
    fileName: string,
    abortController: AbortController,
  ) => void;
  removeFile: (fileName: string) => void;
  cancelUpload: (abortController: AbortController) => void;
};

const FilePreviewer: React.FC<FilePreviewerProps> = ({
  file,
  fileUrl,
  isUploading,
  isUploaded,
  isFailedUpload,
  abortController,
  fileName,
  readAndUploadFile,
  removeFile,
  cancelUpload,
}): JSX.Element => {
  const [isShown, setIsShown] = useState<boolean>(false);

  const copyFileUrl = () => {
    navigator.clipboard.writeText(fileUrl);
  };

  const cancelFileUpload = () => {
    cancelUpload(abortController);
  };
  const uploadFileAgain = () =>
    readAndUploadFile(file, fileName, abortController);
  const deleteFile = () => removeFile(fileName);
  const showCenterIcons = () => setIsShown(true);
  const hideCenterIcons = () => setIsShown(false);

  return (
    <div
      className="mr12 pr df jcc aic cup"
      css={css(styles.filePreviewContainer)}
      onMouseOver={showCenterIcons}
      onMouseLeave={hideCenterIcons}
    >
      <img
        src={URL.createObjectURL(file)}
        alt={`file preview ${file.name}`}
        className="full-width full-height"
      />
      <div
        className="pa full-width full-height t0 l0"
        css={css({
          ...((isUploading || isFailedUpload) && styles.backgroundHover),
        })}
      />
      <div className="cup pa" css={css(styles.topRightIconWrapper)}>
        {isUploading && (
          <CloseRoundedIcon
            fill="rgb(87, 111, 237)"
            circleFill="rgba(118, 153, 255, 0.2)"
            fillOpacity="1"
            stroke="rgb(87, 111, 237)"
            onClick={cancelFileUpload}
          />
        )}
        {isUploaded && (
          <VoteIcon fillOpacity="1" stroke="#FFF" fill="rgb(87, 111, 237)" />
        )}
        {isFailedUpload && (
          <ReloadRoundedIcon
            fill="rgb(87, 111, 237)"
            stroke="rgb(87, 111, 237)"
            onClick={uploadFileAgain}
          />
        )}
      </div>
      <div
        className="pa full-width full-height bd0 l0 df jcc aic"
        css={css(styles.centerIconsContainer)}
      >
        {isUploading && <Spinner />}
        {isFailedUpload && (
          <span className="df aic jcc" css={css(styles.failedUploadIcon)}>
            <CloseIcon fill="rgb(247, 111, 96)" />
          </span>
        )}
        {!isUploading &&
          !isFailedUpload && (
            <>
              <AreYouSure
                submitAction={deleteFile}
                Button={({ onClick }) => (
                  <span
                    className="mr16 df aic jcc"
                    onClick={onClick}
                    css={css({
                      ...styles.centerIcon,
                      ...styles.leftCenterIcon,
                      ...(isShown && styles.showOnHover),
                    })}
                  >
                    <DeleteIcon stroke="rgb(87, 111, 237)" />
                  </span>
                )}
              />
              <span
                className="df aic jcc"
                onClick={copyFileUrl}
                css={css({
                  ...styles.centerIcon,
                  ...(isShown && styles.showOnHover),
                })}
              >
                <CopyLinkIcon stroke="rgb(87, 111, 237)" />
              </span>
            </>
          )}
      </div>
    </div>
  );
};

export default FilePreviewer;
