import { RouteObject } from 'react-router-dom'
import HomePage from '../layout/HomePage'
import Scenegraph from '../demos/scenegraph'
import Responsive from '../demos/responsive'

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <HomePage />
  }
  ,
  {
    path: "/demos/responsive",
    element: <Responsive />
  },
  {
    path: "/demos/scenegraph",
    element: <Scenegraph />
  }
]

export default routes
