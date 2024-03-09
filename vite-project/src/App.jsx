import './App.css'
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { AuthProvider } from './context/auth-context';
import React from 'react';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
