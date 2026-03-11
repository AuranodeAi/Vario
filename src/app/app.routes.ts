import { Routes } from '@angular/router';
import { Login } from '../core/login/login';
import { Base } from '../core/base/base';
import { Dashboard } from '../core/dashboard/dashboard';
import { Toolboard } from '../Feature/toolboard/toolboard';
import { Billing } from '../Feature/billing/billing';
import { Category } from '../Feature/category/category';

export const routes: Routes = [
    { path: '', component: Login },          // default route
    {
        path: '',
        component: Base,
        children: [
            { path: 'dashboard', component: Dashboard },
            {
                path: 'toolboard', component: Toolboard,
                children: [
                    {
                        path: 'toolboard/Billing',
                        component: Billing
                    },
 {
                        path: 'toolboard/Category',
                        component: Category
                    },

                ]
            },
        ]
    },
    { path: '**', redirectTo: '' }                   // wildcard route
];

