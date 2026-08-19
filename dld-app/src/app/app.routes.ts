import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Dubai Land Department',
  },
  {
    path: 'about-dld',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/about/about.component').then(m => m.AboutComponent),
        title: 'Who We Are | Dubai Land Department',
      },
      {
        path: 'leadership',
        loadComponent: () =>
          import('./features/about/leadership/leadership.component').then(
            m => m.LeadershipComponent
          ),
        title: 'Leadership & Organization | Dubai Land Department',
      },
      {
        path: 'partnerships',
        loadComponent: () =>
          import('./features/about/partnerships/partnerships.component').then(
            m => m.PartnershipsComponent
          ),
        title: 'Partnership & International Relations | Dubai Land Department',
      },
    ],
  },
  {
    path: 'news',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/news/news.component').then(m => m.NewsComponent),
        title: 'News and Media | Dubai Land Department',
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/news/article-detail/article-detail.component').then(
            m => m.ArticleDetailComponent
          ),
        title: 'Article | Dubai Land Department',
      },
    ],
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Services | Dubai Land Department',
  },
  {
    path: 'trainings',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Trainings & Programs | Dubai Land Department',
  },
  {
    path: 'open-data',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Open Data & Insights | Dubai Land Department',
  },
  {
    path: 'help',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Help & Support | Dubai Land Department',
  },
  {
    path: 'auth',
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: 'Sign In | Dubai Land Department',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: 'Register | Dubai Land Department',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page Not Found | Dubai Land Department',
  },
];
