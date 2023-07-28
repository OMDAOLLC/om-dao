import { FC, useMemo } from 'react';
import { IProjectProps, Project } from './Project';

import { useTranslation } from 'react-i18next';
import {
  COMMON_CHAI_DATA,
  COMMON_CONS_DATA,
  COMMON_CONT_DATA,
  COMMON_CRB_DATA,
  COMMON_CRC_DATA,
  COMMON_DELC_DATA,
  COMMON_MS_DATA,
} from '../../../shared/constants/blockchain';
import { TFunction } from 'i18next';

const getAwaitingProjects = (t: TFunction): IProjectProps[] => {
  const projects: IProjectProps[] = [
    {
      buttonName: t('common.show'),
      title: COMMON_CRB_DATA.title,
      symbol: COMMON_CRB_DATA.symbol,
      href: COMMON_CRB_DATA.herf,
    },
    {
      buttonName: t('common.show'),
      title: COMMON_CONS_DATA.title,
      symbol: COMMON_CONS_DATA.symbol,
      href: COMMON_CONS_DATA.herf,
    },
    {
      buttonName: t('common.show'),
      title: COMMON_CONT_DATA.title,
      symbol: COMMON_CONT_DATA.symbol,
      href: COMMON_CONT_DATA.herf,
    },
    {
      buttonName: t('common.show'),
      title: COMMON_DELC_DATA.title,
      symbol: COMMON_DELC_DATA.symbol,
      href: COMMON_DELC_DATA.herf,
    },
    {
      buttonName: t('common.show'),
      title: COMMON_CHAI_DATA.title,
      symbol: COMMON_CHAI_DATA.symbol,
      href: COMMON_CHAI_DATA.herf,
    },
    {
      buttonName: t('common.show'),
      title: COMMON_MS_DATA.title,
      symbol: COMMON_MS_DATA.symbol,
      href: COMMON_MS_DATA.herf,
    },
    {
      buttonName: t('common.show'),
      title: COMMON_CRC_DATA.title,
      symbol: COMMON_CRC_DATA.symbol,
      href: COMMON_CRC_DATA.herf,
    },
  ];

  return projects;
};

export const WaitingProjects: FC = () => {
  const { t } = useTranslation();

  const awaitingProjects = useMemo(() => getAwaitingProjects(t), [t]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {awaitingProjects.map((project) => (
        <Project key={project.symbol} {...project} />
      ))}
    </div>
  );
};
