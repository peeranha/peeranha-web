import React from 'react';

const BANNER_WIDTH = 1360;
const BANNER_HEIGTH = 120;

const BannerLoader = ({ input, onBeforeFileLoad, setIsCorrectResolution }) => {
  const onFileLoad = e => {
    e.preventDefault();
    onBeforeFileLoad(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = e => {
      const im = new Image();
      im.onload = function() {
        console.log(this.width);
        console.log(this.height);
        if (this.width !== BANNER_WIDTH || this.height !== BANNER_HEIGTH) {
          setIsCorrectResolution(true);
        } else {
          input.onChange(e.target.result);
          setIsCorrectResolution(false);
          setIsCorrectResolution(false);
        }
      };
      im.src = e.target.result;
    };
  };

  return (
    <div>
      <input
        type={'file'}
        onChange={e => onFileLoad(e)}
        accept={'image/jpeg,image/png'}
      />
    </div>
  );
};

export default React.memo(BannerLoader);
