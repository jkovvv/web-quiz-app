import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button.tsx";
import QuizList from "../components/QuizList.tsx";

interface Quiz {
  id: number;
  title: string;
  description: string;
}

interface QuizAttempt {
  id: number;
  quiz_id: number;
  user_id: number;
  score: number;
  created_at: string;
  quiz: Quiz;
}

const HomePage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [funFact, setFunFact] = useState<string>("");
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const onQuizSelect = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/show-all-quizzes"
        );
        const data = await response.json();
        const quizzes = Array.isArray(data) ? data : [data];
        setQuizzes(quizzes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchFunFact = async () => {
      try {
        const response = await fetch(
          "https://uselessfacts.jsph.pl/random.json?language=en"
        );
        const data = await response.json();
        setFunFact(data.text);
      } catch (error) {
        console.error("Error fetching fun fact:", error);
      }
    };

    const fetchQuizAttempts = async (page = 1) => {
      if (user) {
        try {
          const response = await fetch(
            `http://localhost:8000/api/show-all-quiz-attempts-from-user/${user.id}?page=${page}`
          );
          const data = await response.json();
          setQuizAttempts(data.data);
          setTotalPages(data.last_page);
        } catch (error) {
          console.error("Error fetching quiz attempts:", error);
        }
      }
    };

    fetchData();
    fetchFunFact();
    fetchQuizAttempts(currentPage);
  }, [user, currentPage]);

  const handleButtonClick = () => {
    if (selectedQuiz) {
      console.log(`Odabran je:`, selectedQuiz);
      navigate("/quiz", { state: { selectedQuiz, user } });
    } else {
      console.log("Niste izabrali kviz");
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <ul className="list-group">
                <QuizList items={quizzes} onSelectItem={onQuizSelect} />
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <div className="card">
            <div className="card-body">
              <h1 className="display-4">Dobrodošli u kviz!</h1>
              <p className="lead">Testirajte svoje znanje!</p>
              <Button onClick={handleButtonClick}>Započni kviz!</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Zanimljiva Činjenica</h5>
              <p className="card-text">{funFact}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Moji Pokušaji Kvizova</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Kviz</th>
                    <th>Rezultat</th>
                    <th>Datum</th>
                  </tr>
                </thead>
                <tbody>
                  {quizAttempts.map((attempt) => (
                    <tr key={attempt.id}>
                      <td>{attempt.quiz.title}</td>
                      <td>{attempt.score}</td>
                      <td>
                        {new Date(attempt.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Prethodna
                </button>
                <span>
                  Stranica {currentPage} od {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Sledeća
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
