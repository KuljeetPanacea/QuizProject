import React, { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";

const ESGAssessment = () => {
  const [activeHeading, setActiveHeading] = useState("Governance");
  const [totalScore, setTotalScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [categoryScore, setCategoryScore] = useState([]);

  useEffect(() => {
    const fetchTotalScore = async () => {
      const response = await axios.get(
        "http://13.233.196.139:3000/api/results/scores"
      );
      const totalQuestions = await axios.get(
        "http://13.233.196.139:3000/api/category/questions/total"
      );
      setTotalQuestions(totalQuestions.data.totalQuestions);
      setTotalScore(response.data.totalScore);
    };
    fetchTotalScore();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get("http://13.233.196.139:3000/api/category");
        const catScore = await axios.get(
          `http://13.233.196.139:3000/api/results/categories/scores`
        );
        setCategoryScore(catScore.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const radarData = categoryScore.map((item) => ({
    subject: item.categoryName, // Rename 'data' to 'category'
    value: item.score,
    fullMark: 100, // Keep the 'value' field
  }));

  const pieData = [
    {
      name: "GHG Emissions",
      value: Math.floor(
        Math.min((totalScore / (totalQuestions * 5)) * 100, 100)
      ),
    },
    {
      name: "Other Factors",
      value:
        100 -
        Math.floor(Math.min((totalScore / (totalQuestions * 5)) * 100, 100)),
    },
  ];

  const COLORS = ["orange", "#d0d0d0"];

  // Content related to each heading
  const contentMap = {
    Governance: {
      text: "Governance involves the policies and practices that ensure your company is led effectively and responsibly.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Transparency in decision making" },
        { title: "Key Principle 2", value: "Strong ethical standards" },
        { title: "Key Principle 3", value: "Effective board oversight" },
        {
          title: "Key Principle 4",
          value: "Accountability for management actions",
        },
      ],
      resultBreakdown: {
        title: "Result breakdown",
        well: {
          title: "What you are doing well",
          points: [
            "Clear governance policies.",
            "Regular board evaluations.",
            "Strong ethical guidelines.",
            "Open decision-making processes.",
            "Effective leadership.",
            "Commitment to compliance.",
            "Transparency in reporting.",
          ],
        },
        focus: {
          title: "What you should focus on",
          points: [
            "Increase board diversity.",
            "Strengthen risk management frameworks.",
            "Improve shareholder engagement.",
          ],
        },
      },
    },
    MaterialityAssessment: {
      text: "Materiality Assessment involves identifying and prioritizing ESG factors that are critical to your business.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Identify material factors" },
        { title: "Key Principle 2", value: "Engage stakeholders" },
      ],
      resultBreakdown: {
        title: "Materiality Breakdown",
        well: {
          title: "What you are doing well",
          points: [
            "Strong stakeholder engagement.",
            "Clear materiality assessment process.",
          ],
        },
        focus: {
          title: "What you should focus on",
          points: ["Align material factors with business strategy."],
        },
      },
    },
    ESGStrategy: {
      text: "ESG Strategy is the plan for integrating Environmental, Social, and Governance factors into your company’s long-term goals.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Set measurable ESG goals" },
        {
          title: "Key Principle 2",
          value: "Align strategy with business values",
        },
      ],
      resultBreakdown: {
        title: "Strategy Breakdown",
        well: {
          title: "What you are doing well",
          points: [
            "Clear ESG goals.",
            "Strong alignment with business values.",
          ],
        },
        focus: {
          title: "What you should focus on",
          points: ["Integrate ESG into core business functions."],
        },
      },
    },
    ClimateGHG: {
      text: "Climate GHG focuses on your company’s management of greenhouse gas emissions and its impact on climate change.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Track GHG emissions" },
        { title: "Key Principle 2", value: "Set reduction targets" },
      ],
      resultBreakdown: {
        title: "GHG Breakdown",
        well: {
          title: "What you are doing well",
          points: [
            "Clear GHG emissions reporting.",
            "Commitment to emission reduction targets.",
          ],
        },
        focus: {
          title: "What you should focus on",
          points: ["Enhance emissions tracking systems."],
        },
      },
    },
    PeopleSocial: {
      text: "People/Social focuses on your company’s policies around employee wellbeing, diversity, and community engagement.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Support employee wellbeing" },
        { title: "Key Principle 2", value: "Promote diversity and inclusion" },
      ],
      resultBreakdown: {
        title: "People & Social Breakdown",
        well: {
          title: "What you are doing well",
          points: ["Inclusive work culture.", "Diversity initiatives."],
        },
        focus: {
          title: "What you should focus on",
          points: [
            "Improve work-life balance initiatives.",
            "Increase community involvement.",
          ],
        },
      },
    },
    Data: {
      text: "Data focuses on how your company manages and protects data privacy and integrity.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Secure data management" },
        { title: "Key Principle 2", value: "Protect customer privacy" },
      ],
      resultBreakdown: {
        title: "Data Management Breakdown",
        well: {
          title: "What you are doing well",
          points: [
            "Strong data protection policies.",
            "Commitment to customer privacy.",
          ],
        },
        focus: {
          title: "What you should focus on",
          points: ["Improve data encryption methods."],
        },
      },
    },
    Processes: {
      text: "Processes focus on the internal systems and workflows that support effective ESG integration.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Efficient operational processes" },
        {
          title: "Key Principle 2",
          value: "Ensure ESG is part of decision making",
        },
      ],
      resultBreakdown: {
        title: "Process Breakdown",
        well: {
          title: "What you are doing well",
          points: [
            "Well-documented ESG processes.",
            "Clear integration into decision-making.",
          ],
        },
        focus: {
          title: "What you should focus on",
          points: ["Enhance operational efficiency."],
        },
      },
    },
    ReportingAndD: {
      text: "Reporting and Disclosure focuses on how your company reports ESG data and communicates its performance.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Transparent reporting practices" },
        {
          title: "Key Principle 2",
          value: "Clear disclosures to stakeholders",
        },
      ],
      resultBreakdown: {
        title: "Reporting Breakdown",
        well: {
          title: "What you are doing well",
          points: ["Accurate reporting.", "Timely disclosures."],
        },
        focus: {
          title: "What you should focus on",
          points: ["Improve transparency in reporting."],
        },
      },
    },
    Technology: {
      text: "Technology focuses on leveraging technology for better ESG management and reporting.",
      keyPrinciples: [
        { title: "Key Principle 1", value: "Use technology for ESG insights" },
        { title: "Key Principle 2", value: "Automate ESG reporting" },
      ],
      resultBreakdown: {
        title: "Technology Breakdown",
        well: {
          title: "What you are doing well",
          points: [
            "Use of ESG technology platforms.",
            "Clear data analytics integration.",
          ],
        },
        focus: {
          title: "What you should focus on",
          points: ["Improve automation of ESG data collection."],
        },
      },
    },
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "grey" }}>
      {/* Top Section */}
      <Card
        variant="outlined"
        style={{ padding: "20px", marginBottom: "20px" }}
      >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="flex-start" gap="20px">
              <img
                src="/images/pielogo.png"
                alt="Logo"
                style={{
                  width: "80px",
                  height: "60px",
                  borderRadius: "50%",
                  position: "relative",
                  bottom: "20px",
                }}
              />
              <Box>
                <Typography variant="h5" gutterBottom>
                  Your company has an ESG SelfAssess™ readiness score of 61-80%
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    textAlign: "left",
                    marginTop: "5px",
                    marginLeft: "0",
                  }}
                >
                  With approximately three business days, you will get an email
                  with the full set of these results.
                </Typography>
              </Box>
            </Box>

            <Box display="flex" gap="10px">
              <Button
                style={{
                  color: "darkgreen",
                  textTransform: "none",
                }}
              >
                Send Feedback
              </Button>
              <Button
                style={{
                  color: "green",
                  border: "1px solid green",
                  textTransform: "none",
                }}
              >
                Edit Responses
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Combined Section */}
      <Card
        variant="outlined"
        style={{ backgroundColor: "#f5f5f5", marginTop: "20px" }}
      >
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <RadarChart
                  cx={150}
                  cy={150}
                  outerRadius={90}
                  width={300}
                  height={300}
                  data={radarData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#FF9800"
                    fill="#FF9800"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </Box>
              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: "10px" }}
              >
                ESG Metrics Overview
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box display="flex" justifyContent="center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={pieData}
                    cx={150}
                    cy={150}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </Box>
              <Typography
                variant="body2"
                align="center"
                style={{ marginTop: "10px" }}
              >
                Total Percentages :
                {Math.floor(
                  Math.min((totalScore / (totalQuestions * 5)) * 100, 100)
                )}
                %
              </Typography>
            </Grid>
          </Grid>

          <Box
            display="flex"
            justifyContent="flex-start"
            gap="10px"
            marginBottom="20px"
            marginTop="20px"
          >
            {Object.keys(contentMap).map((heading) => (
              <Typography
                key={heading}
                variant="h6"
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px",
                  marginRight: "10px",
                  marginTop: "20px",
                  borderBottom:
                    activeHeading === heading ? "3px solid green" : "none",
                }}
                onClick={() => setActiveHeading(heading)}
              >
                {heading}
              </Typography>
            ))}
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                align="left"
                style={{ fontWeight: "bold" }}
              >
                Leading Practice Guidance
              </Typography>
              <Typography variant="body1" align="left">
                {contentMap[activeHeading]?.text ||
                  "No content available for this section."}
              </Typography>

              {/* Show Key Principles below the text */}
              <Typography
                variant="h6"
                align="left"
                style={{ fontWeight: "bold", marginTop: "20px" }}
              >
                Key Principles
              </Typography>
              <ul>
                {contentMap[activeHeading]?.keyPrinciples?.map(
                  (principle, index) => (
                    <li key={index}>
                      <Typography variant="body2" align="left">
                        <strong>{principle.title}:</strong> {principle.value}
                      </Typography>
                    </li>
                  )
                ) || <li>No key principles available.</li>}
              </ul>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography
                  variant="h6"
                  align="left"
                  style={{ fontWeight: "bold" }}
                >
                  {contentMap[activeHeading]?.resultBreakdown?.title ||
                    "Result Breakdown"}
                </Typography>

                <Typography
                  variant="body2"
                  align="left"
                  style={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  {contentMap[activeHeading]?.resultBreakdown?.well?.title ||
                    "What you are doing well"}
                </Typography>
                <ul>
                  {contentMap[
                    activeHeading
                  ]?.resultBreakdown?.well?.points?.map((point, index) => (
                    <li key={index}>
                      <Typography variant="body2" align="left">
                        {point}
                      </Typography>
                    </li>
                  )) || <li>No points available.</li>}
                </ul>

                <Typography
                  variant="body2"
                  align="left"
                  style={{ fontWeight: "bold", marginTop: "10px" }}
                >
                  {contentMap[activeHeading]?.resultBreakdown?.focus?.title ||
                    "What you should focus on"}
                </Typography>
                <ul>
                  {contentMap[
                    activeHeading
                  ]?.resultBreakdown?.focus?.points?.map((point, index) => (
                    <li key={index}>
                      <Typography variant="body2" align="left">
                        {point}
                      </Typography>
                    </li>
                  )) || <li>No points available.</li>}
                </ul>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Third Section: Contacts */}
      <Card
        variant="outlined"
        style={{ backgroundColor: "#f5f5f5", marginTop: "20px" }}
      >
        <CardContent>
          <Typography variant="h5" align="left" style={{ fontWeight: "bold" }}>
            Contacts
          </Typography>
          <Grid container spacing={4} style={{ marginTop: "20px" }}>
            {/* First Column */}
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                display: "flex",
                alignItems: "center",
                borderRight: "1px solid lightgrey",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                style={{ marginTop: "0" }}
              >
                <Avatar
                  alt="Person"
                  src="https://randomuser.me/api/portraits/women/1.jpg"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                />
                <Typography variant="h6" align="center">
                  Tricia Montague
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Managing Director
                </Typography>
                <Box style={{ marginTop: "10px", textAlign: "center" }}>
                  <Typography variant="body2">Phone: +123 456 7890</Typography>
                  <Typography variant="body2" style={{ marginTop: "5px" }}>
                    Email: tricia@example.com
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Second Column */}
            <Grid
              item
              xs={12}
              sm={4}
              style={{
                display: "flex",
                alignItems: "center",
                borderRight: "1px solid lightgrey",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                style={{ marginTop: "0" }}
              >
                <Avatar
                  alt="Person"
                  src="https://randomuser.me/api/portraits/women/2.jpg"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                />
                <Typography variant="h6" align="center">
                  Mark Johnson
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Senior Developer
                </Typography>
                <Box style={{ marginTop: "10px", textAlign: "center" }}>
                  <Typography variant="body2">Phone: +234 567 8901</Typography>
                  <Typography variant="body2" style={{ marginTop: "5px" }}>
                    Email: mark@example.com
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Third Column */}
            <Grid
              item
              xs={12}
              sm={4}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                style={{ marginTop: "0" }}
              >
                <Avatar
                  alt="Person"
                  src="https://randomuser.me/api/portraits/women/3.jpg"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    marginBottom: "10px",
                  }}
                />
                <Typography variant="h6" align="center">
                  Sophia Turner
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  Product Manager
                </Typography>
                <Box style={{ marginTop: "10px", textAlign: "center" }}>
                  <Typography variant="body2">Phone: +345 678 9012</Typography>
                  <Typography variant="body2" style={{ marginTop: "5px" }}>
                    Email: sophia@example.com
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ESGAssessment;
