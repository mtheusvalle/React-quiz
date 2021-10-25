import React, {useEffect} from 'react';
import { Grid, Paper, Box, Typography, Button, TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import imgQuiz from "../../assets/quiz.png";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string("Please, enter your name").required("Name is required"),
  amount: yup
    .number("Please, enter amount questions")
    .positive()
    .min(1, "Amount should be of minimum 1")
    .required("Amount Questions is required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: 60,
    minHeight: 200,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backdropFilter: "opacity(1)",
    boxShadow: "0px 0px 8px -1px rgb(0 0 0 / 20%)",
  },
  imgQuiz: {
    width: "45%",
  }
}));

const Home = ({ name, setName, fetchQuestions, setScore }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    setScore(0);
    localStorage.removeItem('Username')
    localStorage.removeItem('answers')
    localStorage.removeItem('Score')
  }, [])

  const formik = useFormik({
    initialValues: {
      name: "Jãozin",
      amount: 1,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setName(values.name);
      localStorage.setItem('Username', values.name);
      fetchQuestions(values.amount);
      history.push("/quiz");
    }
  });

  return (
    
      <Paper className={classes.paper}>
        <img src={imgQuiz} alt="Quiz Logo" className={classes.imgQuiz} />
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Quiz Challenge
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              maxWidth: "100%",
              "& > :not(style)": { mt: 3 },
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              id="name"
              color="secondary"
              name="name"
              label="Your Name"
              placeholder="Please, insert your name"
              focused
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount Questions"
              type="number"
              focused
              color="secondary"
              placeholder="Please, insert amount questions"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    
  );
};

export default Home;
