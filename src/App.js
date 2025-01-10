import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ESGAssessment from "./components/ESGAssessment";
import AssessmentComponent from "./components/AssessmentComponent";
function App() {


  return (
    <Router>
    <Routes>
      {/* Route for ESGAssessment */}
      <Route path="/assessment" element={<ESGAssessment />} />

      {/* Route for the main assessment with Sidebar and Content */}
      <Route path="/" element={<AssessmentComponent />} />
    </Routes>
  </Router>
   
  );
}

export default App;
