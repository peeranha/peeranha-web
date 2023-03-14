import { useState } from 'react';
import { uploadImagesToIpfs, uploadVideoToLivepeer } from 'utils/uploadFiles';

import Dropzone from './Dropzone';

const Store = {
  component: Dropzone,
  title: 'Components/Dropzone',
};

export const Base = () => {
  const [mediaLinks, setMediaLink] = useState('');

  const config = [
    {
      types: ['image'],
      maxFileSizeInBytes: 5 * 1000 * 1000,
      uploadFile: uploadImagesToIpfs,
      saveUploadedFileLink: setMediaLink,
      showUploadProgress: false,
    },
    {
      types: ['video/mp4'],
      maxFileSizeInBytes: 1000 * 1000 * 1000,
      uploadFile: uploadVideoToLivepeer,
      saveUploadedFileLink: setMediaLink,
      showUploadProgress: true,
    },
  ];

  return (
    <div>
      <div style={{ padding: 10 }}>
        <Dropzone config={config} />
      </div>
      <div style={{ padding: 10 }}>{mediaLinks}</div>
    </div>
  );
};

export default Store;
