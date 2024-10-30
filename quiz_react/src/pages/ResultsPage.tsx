import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../components/Button.tsx";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, points, maxPoints } = location.state || { score: 0 };

  const calculateResults = (points: number, maxPoints: number) => {
    let normalizedScore = (points * 100) / maxPoints;
    normalizedScore = parseFloat(normalizedScore.toFixed(2));
    return normalizedScore;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="display-4">Broj tačnih odgovora: {score}</h1>
              <h1 className="display-4">
                Tvoj rezultat: {calculateResults(points, maxPoints)}%
              </h1>
              <Button onClick={() => navigate("/")}>Igraj ponovo!</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
