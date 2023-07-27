import { FC, useState } from "react";
import { BaseTokensForm } from "../../base-tokens-form";
import { observer } from "mobx-react-lite";
import { ARAFormLaunchStore } from "../model";

import { TokenAddButton } from "../../add-token-to-metamask";
import { useAccount } from "wagmi";
import { useRootStore } from "../../../app/use-root-store";
import { useTranslation } from 'react-i18next';
import {TOKEN_SYMBOLS} from "../../../shared/constants/blockchain";

export const ARAFormLaunch: FC = observer(() => {
  const { t } = useTranslation();
  const rootStore = useRootStore()
  const dcon = useAccount();
  const { refCode } = useRootStore();
  const [store] = useState(
    () => new ARAFormLaunchStore(rootStore, refCode, dcon.address)
  );
  const { isLoading, onSubmit, calculateDestinationAmount, swapStatus, maxCount, getupdateMaxCount } = store;

  return (
    <>
      <BaseTokensForm
        title={t("common.purchaseToken", { symbol: TOKEN_SYMBOLS.ARA })}
        onSubmit={onSubmit}
        sourceContractSymbol={TOKEN_SYMBOLS.OMD}
        destinationContractSymbol={TOKEN_SYMBOLS.ARA}
        calculateDestinationAmount={calculateDestinationAmount}
        swapStatus={swapStatus}
        isLoading={isLoading}
        maxCount={maxCount}
        getupdateMaxCount={getupdateMaxCount}
      />
      <TokenAddButton
        className="w-full"
        text={t("common.addToken", {
          symbol: TOKEN_SYMBOLS.ARA,
          walletName: "MetaMask",
        })}
        tokenSymbol={TOKEN_SYMBOLS.ARA}
      />
    </>
  );
});
