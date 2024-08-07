import React, { useState } from 'react';
import { Upload } from 'tus-js-client';
import { css } from '@emotion/react';
import CloseRoundedIcon from 'icons/CloseRounded';
import DeleteIcon from 'icons/Delete';
import CopyLinkIcon from 'icons/CopyLink';
import Spinner from 'components/common/Spinner';
import VoteIcon from 'icons/Vote';
import CloseIcon from 'icons/Close';
import ReloadRoundedIcon from 'icons/ReloadRounded';
import Popover from 'components/common/Popover';
import { useTranslation } from 'react-i18next';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import AreYouSure from '../../../containers/ViewQuestion/AreYouSure';

import { styles } from './FilePreviewer.styled';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

type FilePreviewerProps = {
  file: File;
  fileUrl: string;
  isUploading: boolean;
  isUploaded: boolean;
  isFailedUpload: boolean;
  abortController?: AbortController | Upload;
  uploadProgress: string | null;
  fileName: string;
  readAndUploadFile: (
    file: File,
    fileName: string,
    abortController?: AbortController | Upload,
  ) => void;
  removeFile: (fileName: string) => void;
  cancelUpload: (fileName: string, abortController?: AbortController | Upload) => void;
};

const FilePreviewer: React.FC<FilePreviewerProps> = ({
  file,
  fileUrl,
  isUploading,
  isUploaded,
  isFailedUpload,
  abortController,
  uploadProgress,
  fileName,
  readAndUploadFile,
  removeFile,
  cancelUpload,
}): JSX.Element => {
  const { t } = useTranslation();

  const [isShown, setIsShown] = useState<boolean>(false);

  const copyFileUrl = () => {
    navigator.clipboard.writeText(fileUrl);
  };

  const cancelFileUpload = () => {
    cancelUpload(fileName, abortController);
  };
  const uploadFileAgain = () => readAndUploadFile(file, fileName, abortController);
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
      {file.type === 'video/mp4' ? (
        <video className="full-width full-height">
          <source src={URL.createObjectURL(file)} type="video/mp4" />
        </video>
      ) : (
        <img
          src={URL.createObjectURL(file)}
          alt={`file preview ${file.name}`}
          className="full-width full-height"
        />
      )}
      <div
        className="pa full-width full-height t0 l0"
        css={css({
          ...((isUploading || isFailedUpload) && styles.backgroundUploadingHover),
          ...(isUploaded && styles.backgroundUploadedHover),
        })}
      />
      <div className="cup pa" css={css(styles.topRightIconWrapper)}>
        {isUploading && uploadProgress !== '99' && (
          <CloseRoundedIcon
            size={[15, 15]}
            fill={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'}
            circleFill="rgba(118, 153, 255, 0.2)"
            fillOpacity="1"
            stroke={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'}
            onClick={cancelFileUpload}
          />
        )}
        {isUploaded && (
          <VoteIcon
            fillOpacity="1"
            stroke="rgb(87, 111, 237)"
            fill={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'}
          />
        )}
        {isFailedUpload && (
          <ReloadRoundedIcon
            fill={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'}
            stroke={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'}
            onClick={uploadFileAgain}
          />
        )}
      </div>
      <div
        className="pa full-width full-height bd0 l0 df jcc aic"
        css={css(styles.centerIconsContainer)}
      >
        {isUploading && (
          <>
            <Spinner />
            {uploadProgress && (
              <span className="pa fz10" css={css(styles.uploadProgress)}>
                {uploadProgress}%
              </span>
            )}
          </>
        )}
        {isFailedUpload && (
          <span className="df aic jcc" css={css(styles.failedUploadIcon)}>
            <CloseIcon fill={graphCommunity ? '#6F4CFF' : 'rgb(247, 111, 96)'} />
          </span>
        )}
        {!isUploading && !isFailedUpload && (
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
                  <DeleteIcon
                    stroke={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'}
                    fill={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'}
                  />
                </span>
              )}
            />
            <Popover event="click" placement="top">
              <Popover.Trigger>
                <span
                  className="df aic jcc"
                  onClick={copyFileUrl}
                  css={css({
                    ...styles.centerIcon,
                    ...(isShown && styles.showOnHover),
                  })}
                >
                  <CopyLinkIcon stroke={graphCommunity ? '#6F4CFF' : 'rgb(87, 111, 237)'} />
                </span>
              </Popover.Trigger>
              <Popover.Content>
                <div className="p12 df jcc" css={styles.tooltip}>
                  <p>{t('common.copied')}</p>
                </div>
              </Popover.Content>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
};

export default FilePreviewer;
