export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const loadUsedWords = () => {
  return new Set(JSON.parse(localStorage.getItem("usedWords")) || []);
};

export const saveUsedWords = (wordId) => {
  const usedWords = loadUsedWords();
  usedWords.add(wordId);
  localStorage.setItem("usedWords", JSON.stringify([...usedWords]));
};
