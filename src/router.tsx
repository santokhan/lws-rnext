import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Index'
import BlogPage from './pages/Blog';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import RootLayout from './pages/Root';
import CreateBlog from './pages/CreateBlog';
import LogoutPage from './pages/Logout';
import ProtectedRoute from './components/ProtectedRouter';
import UpdateBlog from './pages/UpdateBlog';
import ProfileIndividual from './pages/SingleProfile';
import ProfileRoot from './pages/ProfileRoot';

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        )
      },
      {
        path: "/blog/:id",
        element: (
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <LoginPage />
        )
      },
      {
        path: "/logout",
        element: (
          <ProtectedRoute>
            <LogoutPage />
          </ProtectedRoute>
        )
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfileRoot />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: (
              <ProfilePage />
            ),
          },
          {
            path: ":id",
            element: (
              <ProfileIndividual />
            ),
          },
        ]
      },
      {
        path: "/create-blog",
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        )
      },
      {
        path: "/update-blog/:id",
        element: (
          <ProtectedRoute>
            <UpdateBlog />
          </ProtectedRoute>
        )
      },
      {
        path: "*",
        element: `Page does not exists`
      },
    ]
  },
]);

export default router;