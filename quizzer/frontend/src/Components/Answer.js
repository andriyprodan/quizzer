import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";

export default function Answer(props) {

  function handleTextChange(e) {
    props.TextChangeCallback(props.id, e.target.value);
  }

  function handleCorrectAnswerChange() {
    props.CorrectAnswerChangeCallback(props.id)
  }

  function renderCreateAnswerForm() {
    return (
      <Grid item xs={5} align="center">
        <TextField 
          name="answer-text" 
          multiline
          rows={3} 
          rowsMax={Infinity}
          fullWidth={true}
          value={props.text}
          label="Answer Text"
          variant="outlined"
          onChange={handleTextChange}
        />
        {/* For correct answer */}
        <input 
          name={"q" + props.questionId + "-correct-answer"}
          type="radio"
          value={props.id}
          onChange={handleCorrectAnswerChange}
        />
      </Grid>
    );
  }

  function renderAnswer() {
    return (
      <Grid item xs={5} align="center">
        <Button variant="outlined" disableElevation>
          {props.text}
        </Button>
      </Grid>
    );
  }

  return (
    <>
      { props.isCreate ? renderCreateAnswerForm() : renderAnswer()}
    </>
  )
}