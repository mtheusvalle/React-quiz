import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Quiz from "./pages/Quiz/Quiz";
import Result from "./pages/Result/Result";
import api from "./providers/api";
import axios from 'axios'

export default function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (amount) => {
    const { data } = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple`);

    setQuestions(data.results);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home name={name} setName={setName} fetchQuestions={fetchQuestions} />
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
          <Result />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
