import { FC } from "react";
import { Project } from "./Project";

import { useTranslation } from 'react-i18next';
import {COMMON_AG_DATA, COMMON_LED_DATA, COMMON_TIGR_DATA} from "../../../shared/constants/blockchain";


export const ActiveProjects: FC = () => {
  const { t } = useTranslation()
  
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={COMMON_TIGR_DATA.title} symbol={COMMON_TIGR_DATA.symbol} href={COMMON_TIGR_DATA.herf} />
      <Project title={COMMON_LED_DATA.title} symbol={COMMON_LED_DATA.symbol} href={COMMON_LED_DATA.herf} />
      <Project buttonName={t("common.swap")} title={COMMON_AG_DATA.title} symbol={COMMON_AG_DATA.symbol} href={COMMON_AG_DATA.herf} />
    </div>
  );
};
