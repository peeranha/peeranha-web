import { useTranslation } from 'react-i18next';

import { SendTokens } from 'components/icons';
import { styles } from './TransactionBanner.styled';
import { singleCommunityColors } from 'utils/communityManagement';

interface Props {
  // transactionHash: string;
}

const colors = singleCommunityColors();

export const TransactionBanner = ({}: Props) => {
  const { t } = useTranslation();
  return (
    <div css={styles.container}>
      <SendTokens stroke={colors.linkColor || '#A5BCFF'} />
      <div css={styles.mainBlock}>
        <div css={styles.mainBlockTitleWrapper}>
          <span css={styles.mainBlockTitle}>{t('common.transactionInProgress')}</span>
          {/*<SingleCommunity stroke={colors.linkColor || '#576FED'} size={[14, 14]} className={'cup'}/>*/}
        </div>
        <p css={styles.mainBlockText}>{t('common.canWork')}</p>
        <span css={styles.loader}></span>
      </div>
    </div>
  );
};
