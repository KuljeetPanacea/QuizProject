import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
const AssessmentComponent = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(0);
  const [answers, setAnswers] = useState({});
  const [data, setData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const options = ["Yes", "Not Sure", "No"];
  const scores = { Yes: 5, "Not Sure": 2, No: 0 };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.233.196.139:3000/api/category"
        );
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
        `http://13.233.196.139:3000/api/category/${topicId}`
      );
      setQuestionsData(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleConfirmSubmit = () => {
    setIsModalOpen(false);
    navigate("/assessment"); // Redirect to the assessment page
  };

  const handleTopicSelect = (index) => {
    setCurrentTopic(index);
    fetchTopicData(data[index].id);
  };

  const handleOptionChange = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentTopic]: {
        ...prevAnswers[currentTopic],
        [questionIndex]: value,
      },
    }));
  };

  const handlePrevious = () => {
    if (currentTopic > 0) {
      handleTopicSelect(currentTopic - 1);
    }
  };

  const handleDiscard = () => {
    data[currentTopic].isCompleted = true;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentTopic]: {},
    }));

    if (currentTopic < data.length - 1) {
      handleTopicSelect(currentTopic + 1);
    }
  };

  const handleSubmit = async () => {
    const answersPayload = questionsData.map((question, index) => ({
      questionId: question.id,
      score: scores[answers[currentTopic]?.[index]] || 0, // Use answers for the current topic
    }));

    try {
      await axios.post("http://13.233.196.139:3000/api/category/save-answers", {
        answers: answersPayload,
      });
      setSnackbarMessage("Your answers have been submitted successfully!");
      setOpenSnackbar(true);

      // Clear answers for the current topic after submission
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentTopic]: {},
      }));
    } catch (error) {
      console.error("Error submitting answers:", error);
      setSnackbarMessage("Error submitting answers. Please try again.");
      setOpenSnackbar(true);
    }
    if (currentTopic < data.length - 1) {
      handleTopicSelect(currentTopic + 1);
    }
    if (currentTopic === data.length - 1) {
      setIsModalOpen(true);
    }
  };
  return (
    <div>
      <Header />
      <div style={{ height: "100vh", display: "flex" }}>
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
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            overflowY: "auto",
            maxHeight: "100vh",
          }}
        >
          <Box sx={{ flex: 1, overflowY: "auto", marginBottom: "64px" }}>
            {questionsData.map((question, index) => (
              <Card key={index} sx={{ marginBottom: 2, padding: 2 }}>
                <CardContent>
                  <Typography sx={{ marginBottom: 2 }}>
                    {index + 1}. {question.text}
                  </Typography>
                  <RadioGroup
                    value={answers[currentTopic]?.[index] || ""} // Access answers for the current topic
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

          {/* Fixed Buttons */}
          <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: "267px", // Offset to ensure it doesn't overlap with the sidebar
              right: 0,
              backgroundColor: "white",
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
              boxShadow: "0 -2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Box>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrevious}
                disabled={currentTopic === 0}
                sx={{ marginRight: 2 }}
              >
                Previous
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleDiscard}
                sx={{ marginRight: 2 }}
              >
                Exclude this topic
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save & continue
              </Button>
              <Dialog open={isModalOpen} onClose={handleModalClose}>
                <DialogTitle>Submit Assessment</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    You have completed all the questions. Are you sure you want
                    to submit?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleModalClose} color="secondary">
                    No
                  </Button>
                  <Button onClick={handleConfirmSubmit} color="primary">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>

          {/* Snackbar */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
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
      </div>
    </div>
  );
};

export default AssessmentComponent;
