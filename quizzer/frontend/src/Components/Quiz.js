import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@material-ui/core";

import Question from "./Question"

export default function Quiz(props) {
    const [title, setTitle] = useState('')
    const [questionUrls, setQuestionUrls] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [currQuestion, setCurrQuestion] = useState()

    let { id } = useParams();

    useEffect(() => {
        let requestOptions = {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        }
        fetch(`/api/quizzes/${id}`, requestOptions).then((response) => {
            if (!response.ok) {
                props.history.push('/');
            }
            return response.json(); 
        }).then((data) => {
            setTitle(data.title)
            setQuestionUrls(data.questions)

            // get first question
            return fetch(data.questions[0], requestOptions)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            setCurrQuestion(data);
        });
    }, []);
    
    if (currQuestion === undefined) {
        return <>Still loading...</>;
    }

    function handleAnswerChoosing(answerId){
        let chosen_answer = parseInt(answerId);
        let requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
        fetch(`/api/get-correct-answer?question_id=${currQuestion.id}`, requestOptions)
        .then((response) => {
            return response.json();
        }).then((data) => {
            let correct_answer = data['correct_answer'];
            setCurrQuestion({...currQuestion, 'chosen_answer': chosen_answer, 'correct_answer': correct_answer});
        })
    }

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} align="center">
                <Typography variant="h2" compact="h2">
                    {title}
                </Typography>
            </Grid>
            <Question {...currQuestion} AnswerChoosingCallback={handleAnswerChoosing}/>
            
            <Grid item xs={12} align="center">
                <Box mt="1.5em">
                    { currQuestion['chosen_answer'] && (questionUrls.length-1 !== currQuestion.id) ? <Button variant="contained" color="primary">Next Question</Button> : ""}
                </Box>
            </Grid>
        </Grid>
    )
}