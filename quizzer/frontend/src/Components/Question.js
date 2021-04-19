import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, Typography } from "@material-ui/core";

import Answer from "./Answer"

export default function Question(props) {
  const [isCreate, setIsCreate]  = useState(false);
  
  useEffect(()=> {
    if (props.isCreate) {
      setIsCreate(props.isCreate)
    }
  })

  function handleAnswerTextChange(answerId, answerText) {
    props.AnswerTextChangeCallback(props.id, answerId, answerText)
  }

  function handleAddAnswerButtonPressed() {
    props.AddAnswerButtonCallback(props.id)
  }

  function renderAnswersTitle() {
    return (
      <Grid item xs={8} align="center">
        <Typography variant='h6' compact='h6'>Answers:</Typography>
      </Grid>
    );
  }

  function handleTextChange(e) {
    props.TextChangeCallback(props.id, e.target.value);
  }

  function handleCorrectAnswerChange(answerId) {
    props.CorrectAnswerChangeCallBack(props.id, answerId);
  }

  const answerComponents = props.answers.length ? props.answers.map((value, key) => {
    return (
        <Answer
          key={key}
          id={key}
          {...value}
          TextChangeCallback={handleAnswerTextChange}
          CorrectAnswerChangeCallback={handleCorrectAnswerChange}
          isCreate={true}
        />
    )
  }) : []

  function renderCreateQuestionForm() {
    return (
      <>
        <Grid item xs={12} align="center">
          <Typography variant='h5' compact='h5'>Question #{props.id+1}:</Typography>
        </Grid>

        <Grid item xs={6} align="center">
          <TextField 
            name="question-text" 
            multiline 
            rows={3} 
            rowsMax={Infinity}
            fullWidth={true} 
            label="Question Text"
            variant="outlined"
            onChange={handleTextChange}
            error={ props.errors && props.errors.includes('question_text_error') }
            helperText={ props.errors && props.errors.includes('question_text_error') ? "Please, enter Question text" : '' }
          />
        </Grid>

        { props.answers.length ? renderAnswersTitle() : ""}
        
        <Grid
          container
          justify="space-around"
          name="correct-answer"
          className={
            props.errors &&
            (props.errors.includes('answers_number_error') || 
            props.errors.includes('correct_answer_error')) ? 
            "answers-container error" : 
            "answers-container"
          }
        >
          { answerComponents }
        </Grid>
        {props.errors && props.errors.includes('answers_number_error') ? (<Typography variant='h6' compact='h6' color="error">Please, enter at least 2 answers</Typography>) : ""}
        {props.errors && props.errors.includes('correct_answer_error') ? (<Typography variant='h6' compact='h6' color="error">Please, choose the correct answer</Typography>) : ""}
        
        <Grid item xs={12} align="center">
          <Button color="default" onClick={handleAddAnswerButtonPressed}>Add answer</Button>
        </Grid>
      </>
    );
  }

  return (
    <>
      { isCreate ? renderCreateQuestionForm() : ""}
    </>
  )
}