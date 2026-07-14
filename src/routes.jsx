import Layout from './components/Layout.jsx'
import { projects } from './data/projects.js'
import { articles } from './data/articles.js'

// Rutas de la aplicación — prerenderizadas a HTML estático por vite-react-ssg.
// Cada página se carga de forma diferida (code-splitting) mapeando el export
// default a `Component`, la convención de React Router para rutas lazy.

const page = (loader) => async () => ({ Component: (await loader()).default })

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, lazy: page(() => import('./pages/Home.jsx')), entry: 'src/pages/Home.jsx' },
      {
        path: 'proyectos/:slug',
        lazy: page(() => import('./pages/ProjectDetail.jsx')),
        getStaticPaths: () => projects.map((p) => `/proyectos/${p.slug}`),
      },
      { path: 'articulos', lazy: page(() => import('./pages/Articulos.jsx')) },
      {
        path: 'articulos/:slug',
        lazy: page(() => import('./pages/Articulo.jsx')),
        getStaticPaths: () => articles.map((a) => `/articulos/${a.slug}`),
      },
      // Genera dist/404.html (Vercel lo sirve con status 404 en rutas desconocidas)
      { path: '404', lazy: page(() => import('./pages/NotFound.jsx')) },
      { path: '*', lazy: page(() => import('./pages/NotFound.jsx')) },
    ],
  },
]
