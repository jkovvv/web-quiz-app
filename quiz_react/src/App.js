import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import ResultsPage from "./pages/ResultsPage.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import LoginPage from "./pages/LoginPage.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Toolbar from "./components/Toolbar.tsx";

import "./App.css";

axios.defaults.withCredentials = true;

const App = () => {
  const backgroundStyle = {
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    margin: 0,
  };

  const getCsrfToken = async () => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  useEffect(() => {
    getCsrfToken();
  }, []);

  return (
    <div style={backgroundStyle}>
      <AuthProvider>
        <Router>
          <Toolbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz"
              element={
                <PrivateRoute>
                  <QuizPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/results"
              element={
                <PrivateRoute>
                  <ResultsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
