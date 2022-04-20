import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';


import store from './store';
import { Login } from './components/Owner';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Provider store={store}>
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route
              path="restaurants"
              element={
                <ProtectedRoute>
                  <h1>Hey there</h1>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </Provider>
  );
}

export default App;
