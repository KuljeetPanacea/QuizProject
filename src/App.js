import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";

const topicsData = [
  { name: "Governance", completed: false },
  { name: "Materiality Assessment", completed: false },
  { name: "ESG Strategy", completed: false },
  { name: "Climate: GHG", completed: false },
  { name: "People/Social", completed: false },
  { name: "Data, Processes, and Controls", completed: false },
  { name: "Reporting and Disclosure", completed: false },
];

const questionsData = [
  // Governance
  [
    {
      question: "What is ESG?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
    {
      question: "Why is Governance important?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
  ],
 
  [
    {
      question: "What is Climate: GHG?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    },
  ],
  
];


function App() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [topics, setTopics] = useState(topicsData);
  const [answers, setAnswers] = useState({});

  const handleTopicSelect = (index) => {
    setCurrentTopic(index);
  };

  const handleOptionChange = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    // Check if all questions are answered for the current topic
    const currentQuestions = questionsData[currentTopic];
    const allAnswered = currentQuestions.every(
      (question, index) => answers[index]
    );

    if (allAnswered) {
      // Mark the current topic as completed
      const updatedTopics = [...topics];
      updatedTopics[currentTopic].completed = true;
      setTopics(updatedTopics);
      setAnswers({});
      alert(`You have completed the topic: ${topics[currentTopic].name}`);
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar
          topics={topics}
          currentTopic={currentTopic}
          onSelectTopic={handleTopicSelect}
        />
        {/* Content */}
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <h1>{topics[currentTopic].name}</h1>
          <Box sx={{ padding: 2 }}>
            {questionsData[currentTopic].map((question, index) => (
              <Card key={index} sx={{ marginBottom: 2, padding: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {index + 1}. {question.question}
                  </Typography>
                  <RadioGroup
                    value={answers[index] || ""}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                  >
                    {question.options.map((option, idx) => (
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
    </div>
  );
}

export default App;
