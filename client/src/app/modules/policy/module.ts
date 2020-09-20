import { NgModule } from '@angular/core';

import { PolicyComponent } from './components/item/policy.component';
import { PolicyListComponent } from './components/list/policy-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { SharedModule } from 'src/app/components/module';

@NgModule({
    declarations: [
        PolicyComponent,
        PolicyListComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
    ],
})
export class PolicyModule { }
