import { useState } from "react";
import { quiz2 } from "../../../constants/quiz2";
import "../../../css/quiz.css";

const Quiz = () => {
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [showResult, setShowResult] = useState(false);
	const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
	const [result, setResult] = useState({
		score: 0,
		correctAnswers: 0,
		wrongAnswers: 0,
	});

	const { questions } = quiz2;
	const { question, choices, correctAnswer } = questions[activeQuestion];

	const onClickNext = () => {
		setSelectedAnswerIndex(null);
		setResult((prev) =>
			selectedAnswer
				? {
						...prev,
						score: prev.score + 5,
						correctAnswers: prev.correctAnswers + 1,
				}
				: { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
		);
		if (activeQuestion !== questions.length - 1) {
			setActiveQuestion((prev) => prev + 1);
		} else {
			setActiveQuestion(0);
			setShowResult(true);
		}
	};

	const onAnswerSelected = (answer, index) => {
		setSelectedAnswerIndex(index);
		if (answer === correctAnswer) {
			setSelectedAnswer(true);
		} else {
			setSelectedAnswer(false);
		}
	};

	const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);
	return (
		<div className="quiz-container ">
			{!showResult ? (
				<div>
					<div>
						<span className="active-question-no">
							{addLeadingZero(activeQuestion + 1)}
						</span>
						<span className="total-question">
							/{addLeadingZero(questions.length)}
						</span>
					</div>
					<h2>{question}</h2>
					<ul>
						{choices.map((answer, index) => (
							<li
								onClick={() => onAnswerSelected(answer, index)}
								key={answer}
								className={
									selectedAnswerIndex === index ? "selected-answer" : null
								}
							>
								{answer}
							</li>
						))}
					</ul>
					<div className="flex-right">
						<button
							onClick={onClickNext}
							disabled={selectedAnswerIndex === null}
						>
							{activeQuestion === questions.length - 1 ? "Finish" : "Next"}
						</button>
					</div>
				</div>
			) : (
				<div>
					<div className="result">
						<h3>Result</h3>
						<p>
							Total Question: <span>{questions.length}</span>
						</p>
						<p>
							Total Score:<span> {result.score}</span>
						</p>
						<p>
							Correct Answers:<span> {result.correctAnswers}</span>
						</p>
						<p>
							Wrong Answers:<span> {result.wrongAnswers}</span>
						</p>
						<br/>
						Correct Answers:
						{
							quiz2.questions.map((quiz, index)=>(
								<div key={index}>
									<p>{index+1}. {quiz.question} : {quiz.correctAnswer}</p>
								</div>
							))
						}
					</div>

				</div>
			)}
			<div className="hidden md:inline md:invisible">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aut
				repellendus consequatur, exercitationem dignissimos ducimus placeat?
				Blanditiis sint ducimus neque odio minus ipsa, ratione magnam modi quod
				doloribus quia sapiente?
			</div>
		</div>
	);
};

export default Quiz;
