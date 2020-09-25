import { Routes } from '@angular/router';

import { routes as itemRoutes } from './components/item/routes';
import { routes as listRoutes } from './components/list/routes';

export const routes: Routes = [
    {
        path: 'policies',
        children: [
            ...listRoutes,
            ...itemRoutes,
        ],
    }
];
