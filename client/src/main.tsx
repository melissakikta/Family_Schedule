import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Entry from './Pages/EntryPage'
import Login from './components/SignIn/Login'
import SignUp from './components/SignIn/Signup'
import ScheduleDisplay from './Pages/ScheduleDisplay'
import Form from './Pages/NewEvent.js'
import ErrorPage from './Pages/Error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Entry />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <SignUp />
      }, {
        path: '/schedule',
        element: <ScheduleDisplay />
      }, {
        path: '/form',
        element: <Form />
      }
    ]
  }, 
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
