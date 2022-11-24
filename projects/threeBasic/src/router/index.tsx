import { RouteObject } from 'react-router-dom'
import HomePage from '../layout/HomePage'
import Scenegraph from '../demos/scenegraph'

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/demos/scenegraph",
    element: <Scenegraph />
  }
]

export default routes
