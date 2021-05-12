import React from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";

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
          name={"q" + props.questionKey + "-correct-answer"}
          type="radio"
          value={props.id}
          onChange={handleCorrectAnswerChange}
        />
      </Grid>
    );
  }

  function handleChooseAnswerBtnClick(e) {
    if (!props.chosenAnswer) {
      props.ChooseAnswerBtnClickCallback(e.currentTarget.id)
    }
  }

  function renderAnswer() {
    let isChosen = props.chosenAnswer == props.id;
    let isCorrect = props.correctAnswer == props.id;

    let className = isChosen ? "answer chosen" : undefined;
    className = isCorrect ? "answer correct" : className;
    return (
      <Grid item xs={5} align="center">
        <Box my=".5em">
          <Button
            id={props.id}
            variant={ (isChosen || isCorrect) ? "contained" :  "outlined"}
            className={className}
            disableElevation={!(isChosen || isCorrect)}
            fullWidth
            onClick={ handleChooseAnswerBtnClick }
          >
            {props.text}
          </Button>
        </Box>
      </Grid>
    );
  }

  return (
    <>
      { props.isCreate ? renderCreateAnswerForm() : renderAnswer()}
    </>
  )
}