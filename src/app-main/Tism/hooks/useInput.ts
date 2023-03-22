import {useState} from "react";

export const useInput = () => {
  const [answerText, setAnswerText] = useState('');

  return {
    answerText,
    setAnswerText
  }
}
