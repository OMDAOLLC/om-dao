import { FC, useState } from 'react';
import { BaseTokensForm } from '../../base-tokens-form';
import { observer } from 'mobx-react-lite';
import { FPFormLaunchStore } from '../model';

import { TokenAddButton } from '../../add-token-to-metamask';
import { useAccount } from 'wagmi';
import { useRootStore } from '../../../app/use-root-store';
import { useTranslation } from 'react-i18next';
import { ETokenSymbols } from '../../../shared/constants/blockchain';

export const FPFormLaunch: FC = observer(() => {
  const { t } = useTranslation();
  const rootStore = useRootStore();
  const dcon = useAccount();
  const { refCode } = useRootStore();
  const [store] = useState(
    () => new FPFormLaunchStore(rootStore, refCode, dcon.address)
  );
  const {
    isLoading,
    onSubmit,
    calculateDestinationAmount,
    swapStatus,
    maxCount,
    getupdateMaxCount,
  } = store;

  return (
    <>
      <BaseTokensForm
        title={t('common.purchaseToken', { symbol: ETokenSymbols.FP })}
        onSubmit={onSubmit}
        sourceContractSymbol={ETokenSymbols.OMD}
        destinationContractSymbol={ETokenSymbols.FP}
        calculateDestinationAmount={calculateDestinationAmount}
        swapStatus={swapStatus}
        isLoading={isLoading}
        maxCount={maxCount}
        getupdateMaxCount={getupdateMaxCount}
      />
      <TokenAddButton
        className="w-full"
        text={t('common.addToken', {
          symbol: ETokenSymbols.FP,
          walletName: 'MetaMask',
        })}
        tokenSymbol={ETokenSymbols.FP}
      />
    </>
  );
});
