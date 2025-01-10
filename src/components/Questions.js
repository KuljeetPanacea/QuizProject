import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import FooterButtons from "./FooterButtons";
import SnackbarNotification from "./SnackbarNotification";

const options = ["Yes", "Not Sure", "No"];
const scores = { Yes: 5, "Not Sure": 2, No: 0 };

function Questions() {
  const { id } = useParams();
  const [questionsData, setQuestionsData] = useState([]);
  const [answers, setAnswers] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/category/${id}`
        );
        setQuestionsData(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [id]);

  const handleOptionChange = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = async () => {
    const answersPayload = questionsData.map((question, index) => ({
      questionId: question.id,
      score: scores[answers[index]] || 0,
    }));

    try {
      await axios.post("http://localhost:3000/api/category/save-answers", {
        answers: answersPayload,
      });
      setSnackbarMessage("Your answers have been submitted successfully!");
      setOpenSnackbar(true);
      setAnswers({});
    } catch (error) {
      console.error("Error submitting answers:", error);
      setSnackbarMessage("Error submitting answers. Please try again.");
      setOpenSnackbar(true);
    }
  };

  return (
    <div style={{ flex: 1, padding: "20px", position: "relative" }}>
      <Box sx={{ flex: 1, overflowY: "auto", marginBottom: "64px" }}>
        {questionsData.map((question, index) => (
          <Card key={index} sx={{ marginBottom: 2, padding: 2 }}>
            <CardContent>
              <Typography sx={{ marginBottom: 2 }}>
                {index + 1}. {question.text}
              </Typography>
              <RadioGroup
                value={answers[index] || ""}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                sx={{ display: "flex", flexDirection: "row", gap: 2 }}
              >
                {options.map((option, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </Box>

      <FooterButtons
        currentTopic={id}
        onSubmit={handleSubmit}
        onDiscard={() => {
          setAnswers({});
          setSnackbarMessage("Answers have been discarded.");
          setOpenSnackbar(true);
        }}
      />
      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        onClose={() => setOpenSnackbar(false)}
      />
    </div>
  );
}

export default Questions;
