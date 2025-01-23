import React, { useState, useEffect } from "react";
import { FlashcardArray } from "react-quizlet-flashcard";
import vocabulary from "./vocabulary.json";
import { shuffleArray } from "./utils";

const App = () => {
  const [currentWords, setCurrentWords] = useState([]);
  const [chunkSize] = useState(50);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Shuffle vocabulary and set initial chunk
    const shuffled = shuffleArray(vocabulary);
    setCurrentWords(shuffled.slice(0, chunkSize));
  }, [chunkSize]);

  const handleNextChunk = () => {
    const newOffset = offset + chunkSize;
    if (newOffset < vocabulary.length) {
      setCurrentWords((prev) => [
        ...prev,
        ...vocabulary.slice(newOffset, newOffset + chunkSize),
      ]);
      setOffset(newOffset);
    }
  };

  // Map vocabulary into the required format
  const cards = currentWords.map((word, index) => ({
    id: index + 1,
    frontHTML: (
      <div className="front-content">
        <p>{word.word}</p>
      </div>
    ),
    backHTML: (
      <div className="back-content  p-2 flex flex-col items-center justify-center h-full text-center">
        <div className="pedagogy text-2xl font-bold italic text-blue-900 mb-4">
          {word.meaning}
        </div>
        <div className="meaning text-lg text-gray-700 mb-3 text-center">
          {word.formation}
        </div>
        <div className="sentence text-md text-pink-600">"{word.sentence}"</div>
      </div>
    ),
  }));

  return (
    <div className="app-container flex item-center justify-center ">
      <FlashcardArray
        cards={cards}
        controls={true}
        showCount={true}
        FlashcardArrayStyle={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
        frontCardStyle={{
          background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          color: "#fff",
          padding: "1.5rem",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
        backCardStyle={{
          background: "#f5f5f5",
          color: "#333",
          padding: "1.5rem",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1.2rem",
          lineHeight: "1.8",
        }}
        frontContentStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
        backContentStyle={{
          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
        }}
        onCardChange={(id, index) =>
          console.log(`Card Changed: ID=${id}, Index=${index}`)
        }
      />
      {offset + chunkSize < vocabulary.length && (
        <button className="load-more-btn" onClick={handleNextChunk}>
          Load More Words
        </button>
      )}
    </div>
  );
};

export default App;
