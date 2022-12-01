import { useState } from 'react';
import { uploadImagesToIpfs, uploadVideoToLivepeer } from 'utils/uploadFiles';

import Dropzone from './Dropzone';
import { translations } from './translations';

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
        <Dropzone config={config} translations={translations('en')} />
      </div>
      <div style={{ padding: 10 }}>{mediaLinks}</div>
    </div>
  );
};

export default Store;
