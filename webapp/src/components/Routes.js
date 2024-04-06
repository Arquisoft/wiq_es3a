import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./login/AuthProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "./Home";
import Inicio from './Inicio';
import Primera from './Primera';
import Game from './QuizGame';
import Statistics from './Statistics';

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Primera />,
    },
    {
      path: "/login",
      element: <Inicio />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          element: <Primera />,
        },
        {
          path: "/game",
          element: <Game />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/statistics", 
          element: <Statistics />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router}> </RouterProvider>
  ;
};

export default Routes;