import React, { useState } from "react";
import { Grid, Paper, Typography, Box, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: 10,
    minHeight: 70,
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
  },
}));

const Question = ({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  score,
  setScore,
  setQuestions,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleCheck = (answer) => {
    setSelected(answer);
    if (answer === correct) setScore(score + 1);
    console.log(score)
    setError(false);
    saveLocalStorage(answer);
    
    nextQuestion();
  };

  const saveLocalStorage = (answer) => {
    var arrayAnswers = JSON.parse(localStorage.getItem("answers") || "[]");
    var answerResponse = [(questions[currQues].question), correct, answer];
    arrayAnswers.push(answerResponse)
    localStorage.setItem("answers", JSON.stringify(arrayAnswers));
  }

  function nextQuestion() {
    if (currQues + 1 === questions.length) {
      localStorage.setItem('Score', score);
      history.push("/result");
    } else {
      setCurrQues(currQues + 1);
    }
  }

  return (
    <>
      <Paper className={classes.paper}>
        <Typography variant="h4">Question {currQues + 1}</Typography>
        <Box
          sx={{
            m: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{questions[currQues].question}</Typography>
        </Box>
      </Paper>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {error && <h1>{error}</h1>}
        {options &&
          options.map((answers, index) => (
            <Grid
              item
              xs={6}
              sx={{
                textAlign: "center",
                "& > :hover": { opacity: 0.9, cursor: "pointer" },
              }}
              onClick={() => {
                handleCheck(answers);
              }}
              key={index}
              disabled={selected}
            >
              <Paper className={classes.paper}>{answers}</Paper>
            </Grid>
          ))}
      </Grid>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          history.push("/");
        }}
        sx={{
          width: "50%",
        }}
      >
        Quit
      </Button>
    </>
  );
};

export default Question;
