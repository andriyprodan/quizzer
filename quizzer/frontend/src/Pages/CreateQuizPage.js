import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";

import Question from "../Components/Question"

export default function CreateQuizPage(props) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ 'text': '', 'answers': ['', ''], 'errors': [] }]);

  function handleQuizTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAddQuestionButtonPressed() {
    setQuestions(questions.concat({ 'text': '', 'answers': ['', ''], 'errors': [] }));
  }

  function handleAddAnswerButtonPressed(questionId) {
    let tmp = [...questions];
    tmp[questionId]['answers'].push('');
    setQuestions(tmp);
  }

  function handleQuestionTextChange(questionId, questionText) {
    let tmp = [...questions];
    tmp[questionId]['text'] = questionText
    setQuestions(tmp);
  }

  function handleAnswerTextChange(questionId, answerId, answerText) {
    let tmp = [...questions];
    tmp[questionId]['answers'][answerId] = answerText
    setQuestions(tmp);
  }

  function validateInput() {
    let isAnyErrors = false
    questions.map((question, index) => {
      let tmp = [...questions];
      let errors = tmp[index]['errors'];
      
      if (!question['text']) {
        if (!errors.includes('question_text_error')) {
          errors.push('question_text_error');
        }
      } else if (errors.includes('question_text_error')) {
        errors = errors.filter(e => e !== 'question_text_error')
      }

      let numOfAnswersWithText = 0
      question['answers'].map(answer => {
        if (answer !== '') {
          numOfAnswersWithText++;
        }
      })
      if (numOfAnswersWithText < 2) {
        if (!errors.includes('answers_number_error')) {
          errors.push('answers_number_error');
        }
      } else if (errors.includes('answers_number_error')) {
        errors = errors.filter(e => e !== 'answers_number_error')
      }
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
      console.log(questions)
      const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: title,
          questions: questions
        })
      }
      fetch('/api/create-quiz', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log('success'))
    }
  }

  const questionComponents = questions.length ? questions.map((value, key) => {
    return (
      <Question
        key={key}
        id={key}
        text={value['text']}
        answers={value['answers']}
        errors={value['errors'] ? value['errors'] : ""}
        isCreate={true}
        TextChangeCallback={handleQuestionTextChange}
        AnswerTextChangeCallback={handleAnswerTextChange}
        AddAnswerButtonCallback={handleAddAnswerButtonPressed}
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