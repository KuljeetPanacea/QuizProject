import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";

const topicsData = [
  { id: 1, name: "Governance", completed: false },
  { id: 2, name: "Materiality Assessment", completed: false },
  { id: 3, name: "ESG Strategy", completed: false },
  { id: 4, name: "Climate: GHG", completed: false },
  { id: 5, name: "People/Social", completed: false },
  { id: 6, name: "Data, Processes, and Controls", completed: false },
  { id: 7, name: "Reporting and Disclosure", completed: false },
];

function App() {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [topics, setTopics] = useState(topicsData);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions(topics[currentTopic].id);
  }, [currentTopic]);

  const fetchQuestions = async (topicId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/questions?topic=${topicId}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicSelect = (index) => {
    setCurrentTopic(index);
    setAnswers({}); // Reset answers when switching topics
  };

  const handleOptionChange = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    const allAnswered = questions.every(
      (question, index) => answers[index] !== undefined
    );

    if (allAnswered) {
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
        <Sidebar
          topics={topics}
          currentTopic={currentTopic}
          onSelectTopic={handleTopicSelect}
        />
        <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          <h1>{topics[currentTopic].name}</h1>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box sx={{ padding: 2 }}>
              {questions.map((question, index) => (
                <Card key={index} sx={{ marginBottom: 2, padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      {index + 1}. {question.question}
                    </Typography>
                    <RadioGroup
                      value={answers[index] || ""}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
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
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
