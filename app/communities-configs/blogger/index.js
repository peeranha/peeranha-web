import React from 'react';

import CustomSubHeader from 'components/CustomSubHeaders/CustomSubHeader';
import CustomMobileSubHeader from 'components/CustomSubHeaders/CustomMobileSubHeader';

import bannerImage from './images/ivan-chai.jpg';

export const CustomSubHeaderConfig = {
  design: 'blogger_style',
  styles: {
    bg: {
      header: '#305d6e',
      burgerHeader: '#ffffff',
    },
  },
  links: {
    facebook: '',
    instagram: '',
    youtube: '',
    pinterest: '',
  },
  banner: bannerImage,
  description: (
    <div>
      <p>
        Музыкант, композитор и основатель онлайн музыкальной школы "Хочу петь".
      </p>
      <br />
      <p>Слушайте мой новый альбом "Встречай 2021"</p>
      <p>
        <img src="http://fourmusic.7uptheme.com/wp-content/uploads/2019/08/ft1-img5.jpg" />
      </p>
      <br />
      <p>Instagram: @IvanChai</p>
      <p>Facebook: @IvanChai</p>
      <p>Youtube: @IvanChai</p>
    </div>
  ),
};

export const BloggerStyles = {
  withoutCopyright: true,
  withoutSubHeader: true,
  poweredByPeeranha: true,
  withoutAdditionalLinks: true,
  mobileSubHeader: (
    <CustomMobileSubHeader config={CustomSubHeaderConfig} />
  ),
  customSubHeader: <CustomSubHeader config={CustomSubHeaderConfig} />,
  withoutFAQ: true,
  headerHeight: 190,
  customSubHeaderConfig: CustomSubHeaderConfig,
};
