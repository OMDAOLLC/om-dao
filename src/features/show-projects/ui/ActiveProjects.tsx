import { FC, useMemo } from 'react';
import { Project } from './Project';

import { useTranslation } from 'react-i18next';
import {
  COMMON_AG_DATA,
  COMMON_LED_DATA,
  COMMON_TIGR_DATA,
  ETokenSymbols,
} from '../../../shared/constants/blockchain';

const DEFAULT_ACTIVE_PROJECTS = [
  {
    title: COMMON_TIGR_DATA.title,
    symbol: COMMON_TIGR_DATA.symbol,
    href: COMMON_TIGR_DATA.herf,
  },
  {
    title: COMMON_LED_DATA.title,
    symbol: COMMON_LED_DATA.symbol,
    href: COMMON_LED_DATA.herf,
  },
  {
    title: COMMON_AG_DATA.title,
    symbol: COMMON_AG_DATA.symbol,
    href: COMMON_AG_DATA.herf,
  },
];

export const ActiveProjects: FC = () => {
  const { t } = useTranslation();

  const activeProjects = useMemo(() => {
    return DEFAULT_ACTIVE_PROJECTS.map((project) => {
      if (project.symbol === ETokenSymbols.ARAORIG) {
        return { ...project, buttonName: t('common.swap') };
      }

      return project;
    });
  }, [t]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {activeProjects.map((project) => (
        <Project key={project.symbol} {...project} />
      ))}
    </div>
  );
};
