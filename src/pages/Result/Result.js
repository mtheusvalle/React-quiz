import makeStyles from "@mui/styles/makeStyles";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItemText,
  Button
} from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: 10,
    minHeight: 70,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    "&:first-child": {
      marginTop: 25,
    },
  },
  questions: {
    "&:not(first-child)": {
      marginTop: 20,
      borderBottom: '1px solid #9dbaed'
    },
  },
  answer: {
    backgroundColor: "#e57373",
    borderRadius: '4px'
  },
  correct_answer: {
    backgroundColor: "#66bb6a",
    borderRadius: '4px'
  },
}));

const Result = (questions, name, score) => {
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!name) {
      history.push("/");
    }
  }, []);

  return (
    <>
      <Paper className={classes.paper} sx={{ textAlign: "center" }}>
        <Typography variant="h5">
          Congratulations {localStorage.getItem("Username")} !!! 🥳
        </Typography>
        <Box>
          <Typography variant="h5">Score</Typography>
          <Typography variant="h1">{localStorage.getItem("Score")} </Typography>
          <Typography variant="h6">Answers corrects</Typography>
        </Box>
      </Paper>

      <Button
        variant="contained"
        size="large"
        onClick={() => {
          history.push("/");
        }}
        sx={{
          width: "50%",
          margin: 1
        }}
      >
        Play Again
      </Button>

      <Paper className={classes.paper}>
        {questions &&
          questions.questions.map((res, index) => {
            return (
              <>
                <Box key={index} className={classes.questions}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h5">{res.question}</Typography>
                  </Box>
                  <List sx={{ margin: "0 100px 0 100px" }}>

                  {[res?.correct_answer, ...res?.incorrect_answers].map(
                    (option) => {
                      return (
                        <>
                          <ListItemText
                          sx={{padding: '3px 10px'}}
                            className={`
                              ${
                                option ===
                                JSON.parse(localStorage.getItem("answers"))[
                                  index
                                ][2]
                                  ? classes.answer
                                  : ""
                              }
                              ${
                                option === res?.correct_answer
                                  ? classes.correct_answer
                                  : ""
                              }
                              `}
                          >
                            {option}
                          </ListItemText>
                          <p>
                            {console.log(
                              JSON.parse(localStorage.getItem("answers"))[
                                index
                              ][2],
                              index
                            )}
                          </p>
                        </>
                      );
                    }
                  )}
                  </List>
                </Box>

                <ul>
                  
                </ul>
              </>
            );
          })}
      </Paper>
      <Button
        variant="contained"
        size="large"
        onClick={() => {
          history.push("/");
        }}
        sx={{
          width: "50%",
          marginBottom: 10
        }}
      >
        Play Again
      </Button>
    </>
  );
};

export default Result;
