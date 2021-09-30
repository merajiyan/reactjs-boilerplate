import HomePage from 'pages/home/Home';

interface Route {
  path: string;
  component: React.ComponentClass | React.FunctionComponent;
  isPrivate: boolean;
}

export const routes: Route[] = [
  {
    path: '/',
    component: HomePage,
    isPrivate: false,
  },
];
