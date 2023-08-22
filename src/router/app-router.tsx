import { createBrowserRouter, Navigate, redirect } from 'react-router-dom';
import {
  ExchangePage,
  ProjectPage,
  ProjectsPage,
  RootLayout,
  ReferralPage,
  ReferralTransactionsPage,
} from '../pages';
import { PATHS } from './constants';
import React from 'react';

export const appRouter = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: PATHS.ROOT,
        element: <ExchangePage />,
      },
      {
        path: PATHS.PROJECTS,
        element: <ProjectsPage />,
      },
      {
        path: `${PATHS.PROJECTS}/:symbol`,
        element: <ProjectPage />,
        loader: async ({ params, request, context }) => {
          if(!params.symbol) {
            return redirect(PATHS.ROOT)
          }

          return null
        }
      },
      {
        path: `${PATHS.PROJECTS}/:symbol/:refcode`,
        element: <ProjectPage />,
        loader: async ({ params, request, context }) => {
          if(!params.symbol) {
            return redirect(PATHS.ROOT)
          }

          return null
        }
      },
      {
        path: `${PATHS.REFERRAL}/:refcode`,
        element: <ReferralPage />,
      },
      {
        path: `${PATHS.REFERRAL}/:refcode/:symbol`,
        element: <ReferralTransactionsPage />,
      },
      {
        path: '*',
        element: <Navigate to={PATHS.ROOT} replace />,
      },
    ],
  },
]);
