import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.jsx'
import './index.css'

// Entry de vite-react-ssg: prerenderiza cada ruta a HTML estático en build
// e hidrata en el cliente. Sustituye al antiguo ReactDOM.createRoot + BrowserRouter.
export const createRoot = ViteReactSSG({ routes })
