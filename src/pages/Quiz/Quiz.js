import { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import Question from "../../components/Question/Question";
import { useHistory } from "react-router";

const Quiz = ({
  name,
  score,
  questions,
  setScore,
  setQuestions
}) => {
  const history = useHistory();
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );

  }, [currQues, questions]);

  console.log(options)

  !name && history.push('/');

  const handleShuffle = (options) => {
    return options.sort(() => Math.random() - 0.5);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", gap: "20px" }}
    >
      {questions ? (
          <Question 
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
      ) : (
        <CircularProgress />
      )}
        
    </Grid>
  );
};

export default Quiz;
