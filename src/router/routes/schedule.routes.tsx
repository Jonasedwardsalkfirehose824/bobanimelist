import type { RouteObject } from 'react-router';
import React from 'react';
import { ErrorPage } from '../../pages/error-page';

const SchedulePage = React.lazy(() => import('../../pages/schedule-page'));

export const scheduleRoutes: RouteObject = {
	path: 'schedule',
	element: <SchedulePage />,
	errorElement: <ErrorPage />,
};
