import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";

export default function Answer(props) {
  const [isCreate, setIsCreate]  = useState(false);
  
  useEffect(()=> {
    if (props.isCreate) {
      setIsCreate(props.isCreate)
    }
  })

  function handleTextChange(e) {
    props.TextChangeCallback(props.id, e.target.value);
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
      </Grid>
    );
  }

  return (
    <>
      { isCreate ? renderCreateAnswerForm() : ""}
    </>
  )
}