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
import RestaurantHome from './components/Restaurant/RestaurantHome';
import ProtectedRoute from './components/ProtectedRoute';
import NewRestaurant from './components/Restaurant/NewRestaurant';


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
                  <RestaurantHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="new-restaurant"
              element={
                <ProtectedRoute>
                  <NewRestaurant />
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
