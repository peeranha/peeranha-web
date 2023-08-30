import { WalletContextState } from '@suiet/wallet-kit';
import { achievementLib, handleMoveCall, mintUserNFT } from 'utils/sui/sui';

export const mintSuiAchievement = async (
  wallet: WalletContextState,
  userId: string,
  suiAchievementId: number,
) =>
  handleMoveCall(wallet, achievementLib, mintUserNFT, [
    process.env.ACHIEVEMENT_COLLECTION,
    userId,
    [suiAchievementId],
  ]);
