import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Box, Button, Snackbar, Alert } from "@mui/material";

function App() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const options = ["Yes", "Not Sure", "No"];
  const scoreMapping = {
    Yes: 5,
    "Not Sure": 2,
    No: 0,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/category");
        setData(response.data);

        if (response.data.length > 0) {
          fetchTopicData(response.data[0].id);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchTopicData = async (topicId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/category/${topicId}`
      );
      setQuestionsData(response.data);
      console.log("setQuestionsData", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleTopicSelect = (index) => {
    setCurrentTopic(index);
    const selectedTopicId = data[index].id;
    fetchTopicData(selectedTopicId);
  };

  const handleOptionChange = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = async () => {
    // Build the payload to send in the required format
    const answersPayload = questionsData.map((question, index) => {
      return {
        questionId: question.id, // Assuming each question has a unique 'id'
        score: scoreMapping[answers[index]] || 0, // Set score based on the option selected
      };
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/category/save-answers",
        {
          answers: answersPayload,
        }
      );
      console.log("Response from API:", response.data);
      setSnackbarMessage("Your answers have been submitted!");
      setOpenSnackbar(true);
      // Reset answers and topics after successful submission
      // setAnswers({});
      // const updatedTopics = [...topics];
      // // updatedTopics[currentTopic].completed = true;
      // setTopics(updatedTopics);
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("Error submitting answers. Please try again.");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", height: "100%" }}>
        {/* Sidebar */}
        <Sidebar
          topics={data}
          currentTopic={currentTopic}
          onSelectTopic={handleTopicSelect}
        />
        {/* Content */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            maxHeight: "calc(100vh - 64px)",
          }}
        >
          <Box sx={{ padding: 2 }}>
            {questionsData.length > 0 ? (
              questionsData.map((question, index) => (
                <Card key={index} sx={{ marginBottom: 2, padding: 2 }}>
                  <CardContent>
                    <Typography sx={{ marginBottom: 2 }}>
                      {index + 1}. {question.text}
                    </Typography>
                    <RadioGroup
                      value={answers[index] || ""}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
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
              ))
            ) : (
              <Typography>No questions available for this topic.</Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ marginTop: 2 }}
            >
              Submit
            </Button>
          </Box>
        </div>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} // Automatically close after 3 seconds
        onClose={() => setOpenSnackbar(false)} // Close Snackbar when done
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarMessage.includes("Error") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
