import * as tus from 'tus-js-client';
import { getFileUrl, saveDataIpfsS3 } from 'utils/ipfs';
import { Upload } from 'tus-js-client';
import { livepeerAPI } from '../services/livepeer';

export const uploadImagesToIpfs = async (
  file: File,
  setMediaLink: (link: string) => void,
  setFileFailedUploadStatus: (fileName: string) => void,
  setFileSuccessfulUploadStatus: (fileName: string, fileUrl: string) => void,
  setFileAbortController: (
    fileName: string,
    abortController: AbortController,
  ) => void,
  setFileUploadingStatus: (fileName: string) => void,
): Promise<void> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    try {
      const abortController = new AbortController();
      setFileAbortController(file.name, abortController);

      if (typeof reader.result === 'string') {
        setFileUploadingStatus(file.name);

        const imageData = reader.result.replace(/^data:image\/\w+;base64,/, '');
        const content = Buffer.from(imageData, 'base64');

        const result = await saveDataIpfsS3(
          { content, encoding: 'base64' },
          abortController.signal,
        );
        const fileUrl = getFileUrl(result.body.cid);

        setFileSuccessfulUploadStatus(file.name, fileUrl);
        setMediaLink(`![](${fileUrl})`);
      }
    } catch (e) {
      if (e.name !== 'AbortError') {
        setFileFailedUploadStatus(file.name);
      }
    }
  };
};

export const uploadVideoToLivepeer = async (
  file: File,
  setMediaLink: (link: string) => void,
  setFileFailedUploadStatus: (fileName: string) => void,
  setFileSuccessfulUploadStatus: (fileName: string, fileUrl: string) => void,
  setFileAbortController: (fileName: string, abortController: Upload) => void,
  setFileUploadProgress: (fileName: string, uploadPercentage: string) => void,
): Promise<void> => {
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
            setFileSuccessfulUploadStatus(
              file.name,
              `https://lvpr.tv?v=${playbackId}&autoplay=0`,
            );
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
