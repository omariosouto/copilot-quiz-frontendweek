import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';

// slugify string
function slugify(text) {
  return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// 2 - create quiz question component
const QuizQuestion = ({ question }) => {
  const correctAnswer = question.correctAnswer;
  const [answer, setAnswer] = useState();
  const [isUsed, setUsedState] = useState(false);

  return (
    <div className="quiz-question">
      <h2>{question.title}</h2>
      <ul>
        {question.alternatives.map((alternative, alternativeIndex) => {
          const alternativeHtmlID = `question_${question.id}-alternative_${alternativeIndex}`;
          const alternativeName = `question_${question.id}` 
          return (
              <li key={alternativeIndex}>
                <input
                  disabled={isUsed}
                  type="radio"
                  id={alternativeHtmlID}
                  name={alternativeName}
                  // GitHub Copilot +1
                  onChange={() => {
                    setUsedState(true);
                    setAnswer(alternativeIndex);
                  }}
                />
                <label htmlFor={alternativeHtmlID}>
                  {alternative}
                </label>
              </li>
            )
        })}
      </ul>

      {
        (answer === correctAnswer)
        ? (
          <div className="correct">
            {isUsed && <h3>Correct!</h3>}
          </div>
        )
        : (
          <div className="incorrect">
            {isUsed && <h3>Incorrect!</h3>}
          </div>
        )
      }
      {/* <p>
        <strong>
          Você acertou!
        </strong>
      </p>
      <p>
        Copilot sugeriu :O
        Você pode continuar a pergunta ou ir para a próxima pergunta. Mas aqui <strong>você errou</strong>
      </p> */}
    </div>
  )
}

// 1 - create quiz component
const Quiz = ({ questions }) => {
  return (
    <div className="quiz">
      <h1>Quiz</h1>
      <div className="quiz-container">
        {questions.map(question => {
          return (
            <QuizQuestion key={question.id} question={question} />
          )
        })}
      </div>
    </div>
  )
}

const CSSResetSimple = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  // 3 - font reset
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }
`;

export default function Home() {
  const questions = [
    {
      id: 1,
      title: 'Qual o primeiro vídeo do Canal DevSoutinho?',
      alternatives: [
        "Konami Code",
        "Flappy Bird",
      ],
      correctAnswer: 0,
    },
    {
      id: 2,
      title: 'Pergunta numero 2',
      alternatives: [
        "Resposta 0",
        "Respostra 1",
      ],
      correctAnswer: 0,
    },
  ]

  return (
    <div>
      <CSSResetSimple />
      <h1>Copilot Quiz</h1>

      {/* // generate a quiz */}
      <Quiz questions={questions} />
    </div>
  )
}
