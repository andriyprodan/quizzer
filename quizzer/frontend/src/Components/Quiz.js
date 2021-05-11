import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";

import Question from "./Question"

export default function Quiz(props) {
    const [title, setTitle] = useState('')
    const [questionUrls, setQuestionUrls] = useState([])
    const [questions, setQuestions] = useState([])
    const [currQuestionKey, setCurrQuestionKey] = useState(0)

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
            let tmp = [...questions];
            tmp.push(data);
            setQuestions(tmp);
        });
    }, []);
    
    const currQuestion = questions[currQuestionKey];

    if (currQuestion === undefined) {
        return <>Still loading...</>;
    }

    function handleAnswerChoosing(answerKey){
        console.log(answerKey, currQuestionKey);
        let tmp = [...questions];
        tmp[currQuestionKey]['chosen_answer'] = parseInt(answerKey);
        setQuestions(tmp);
    }

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} align="center">
                <Typography variant="h2" compact="h2">
                    {title}
                </Typography>
            </Grid>
            <Question {...currQuestion} AnswerChoosingCallback={handleAnswerChoosing}/>
        </Grid>
    )
}