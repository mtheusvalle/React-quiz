import React, { useState } from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

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
  const classes = useStyles();
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  const handleSelected = (answer) => {
    if (selected === answer && selected === correct) {
      return "select";
    } else if (selected === answer && selected !== correct) {
      return "wrong";
    } else if (answer === correct) {
        return 'select';
    }
  };

  const handleCheck = (answer) => {
      setSelected(answer);
      if(answer === correct) setScore(score++);
      setError(false);
      console.log(score)
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
              className={`SingleOption ${selected && handleSelected(answers)}`}
              onClick={() => {
                handleCheck(answers);
              }}
              key={index}
              disabled={selected}
            >
              <Paper className={classes.paper}>{answers}{index}</Paper>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Question;
