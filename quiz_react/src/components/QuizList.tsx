import React, { useState } from "react";

// Define the structure of a quiz object
interface Quiz {
  id: number;
  title: string;
  description: string; // Add other properties as needed
}

interface Props {
  items: Quiz[]; // Change to accept an array of Quiz objects
  onSelectItem: (item: Quiz) => void; // Change to accept a Quiz object
}

const QuizList: React.FC<Props> = ({ items, onSelectItem }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <h1>Kvizovi</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((quiz, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={quiz.id} // Use a unique key for each quiz
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(quiz); // Pass the entire quiz object
            }}
          >
            {quiz.title} {/* Display the quiz title */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default QuizList;
