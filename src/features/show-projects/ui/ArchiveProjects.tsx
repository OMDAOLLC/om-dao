import { FC } from "react";
import { Project } from "./Project";
import {COMMON_TIGR_DATA} from "../../../shared/constants/blockchain";

export const ArchiveProjects: FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Project title={COMMON_TIGR_DATA.title} symbol={COMMON_TIGR_DATA.symbol} href={COMMON_TIGR_DATA.herf} />
    </div>
  );
};
