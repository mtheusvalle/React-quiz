import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";
import axios from "axios";

export default function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (amount) => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&type=multiple`
    );

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh", gap: "20px" }}
        >
          <Route path="/" exact>
            <Home
              name={name}
              setName={setName}
              fetchQuestions={fetchQuestions}
              setScore={setScore}
            />
          </Route>
          <Route path="/quiz" exact>
            <Quiz
              name={name}
              questions={questions}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
            />
          </Route>
          <Route path="/result" exact>
            <Result questions={questions} name={name} score={score} />
          </Route>
        </Grid>
      </Switch>
    </BrowserRouter>
  );
}
