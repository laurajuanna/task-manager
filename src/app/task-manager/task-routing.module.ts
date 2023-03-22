import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { ProjectsComponent } from './pages/projects/projects.component';



const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'calendar',
                component: HomeComponent
            },
            {
                path: 'projects',
                component: ProjectsComponent
            },
            { path: '**', redirectTo: 'notFound' }
        ]
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TaskRoutingModule { }
