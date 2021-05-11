import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";

import Question from "../Components/Question"

export default function CreateQuizPage(props) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ 'text': '', 'answers': [{'text': ''}, {'text': ''}], 'errors': [] }]);

  function handleQuizTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAddQuestionButtonPressed() {
    setQuestions(questions.concat({ 'text': '', 'answers': [{'text': ''}, {'text': ''}], 'errors': [] }));
  }

  function handleAddAnswerButtonPressed(questionKey) {
    let tmp = [...questions];
    tmp[questionKey]['answers'].push({'text': ''});
    setQuestions(tmp);
  }

  function handleQuestionTextChange(questionKey, questionText) {
    let tmp = [...questions];
    tmp[questionKey]['text'] = questionText
    setQuestions(tmp);
  }

  function handleAnswerTextChange(questionKey, answerKey, answerText) {
    let tmp = [...questions];
    tmp[questionKey]['answers'][answerKey]['text'] = answerText
    setQuestions(tmp);
  }

  function handleCorrectAnswerChange(questionKey, answerKey) {
    let tmp = [...questions];
    tmp[questionKey]['correct_answer'] = answerKey
    setQuestions(tmp);
  }

  function addOrRemoveError(errors, errorType, addError) {
    if (addError) {
      if (!errors.includes(errorType)) {
        errors.push(errorType);
      } 
    } else if (errors.includes(errorType)) {
      for (var i = errors.length-1; i >= 0; i--) {
        if (errors[i] === errorType) {
          errors.splice(i, 1)
        }
      }
    }
  }

  function validateInput() {
    let isAnyErrors = false
    questions.map((question, index) => {
      let tmp = [...questions];
      let errors = tmp[index]['errors'];
      
      addOrRemoveError(errors, 'question_text_error', !question['text'])
      
      let numOfAnswersWithText = 0
      question['answers'].map(answer => {
        if (answer['text'] !== '') {
          numOfAnswersWithText++;
        }
      })
      addOrRemoveError(errors, 'answers_number_error', numOfAnswersWithText < 2)
      
      addOrRemoveError(errors, 'correct_answer_error', question['correct_answer'] == null)

      tmp[index]['errors'] = errors;
      setQuestions(tmp);
      
      if (errors.length) {
        isAnyErrors = true
      }
    })
    return !isAnyErrors;
  }

  function handleCreateQuizButtonPressed() {
    if (validateInput()) {
      let tmp = [...questions];
      for (var i = 0; i < tmp.length; i++) {
        delete tmp[i]['errors'];
      }
      setQuestions(tmp);

      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title,
          questions: questions
        })
      };
      fetch('/api/create-quiz', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          props.history.push(`/quiz/${data.question_id}`)
        });
    }
  }

  const questionComponents = questions.length ? questions.map((value, key) => {
    return (
      <Question
        key={key}
        id={key}
        {...value}
        isCreate={true}
        TextChangeCallback={handleQuestionTextChange}
        AnswerTextChangeCallback={handleAnswerTextChange}
        AddAnswerButtonCallback={handleAddAnswerButtonPressed}
        CorrectAnswerChangeCallBack={handleCorrectAnswerChange}
      />
    )
  }) : []

  function renderQuestionsTitle() {
    return (
      <Grid item xs={8} align="center">
        <Typography variant='h3' compact='h3'>Questions:</Typography>
      </Grid>
    );
  }

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={7} align="center">
        <TextField
          name="quiz-title"
          multiline
          rows={4}
          fullWidth={true}
          rowsMax={Infinity}
          inputProps={{ style: { textAlign: 'center' } }}
          label="Quiz Title"
          value={title}
          variant="filled"
          onChange={handleQuizTitleChange}
        />
      </Grid>
      { questions.length ? renderQuestionsTitle() : ""}
      { questionComponents}
      <Grid item xs={12} align="center">
        <Button color="primary" onClick={handleAddQuestionButtonPressed}>Add Question</Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" onClick={handleCreateQuizButtonPressed}>Create Quiz</Button>
      </Grid>
    </Grid>
  )
}