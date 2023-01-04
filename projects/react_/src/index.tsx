import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
// import App from './App'
// import HooksApp from './HooksApp'
import TodoApp from './todos/TodoApp'

const root = createRoot(document.getElementById('app')!)
root.render(
    <Router>
        {/* <App /> */}
        {/* <HooksApp /> */}
        <TodoApp />
    </Router>
)