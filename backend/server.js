const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function simulateTherapy(patientData) {
  const drugs = ["lisinopril", "metoprolol", "hydrochlorothiazide", "amlodipine", "losartan"];
  const results = {};

  drugs.forEach((drug) => {
    const simulation = [];
    for (let day = 1; day <= 30; day++) {
      // Random simulation: decrease BP and HR over time
      const systolicDecrease = Math.random() * 20 + 5;
      const diastolicDecrease = Math.random() * 10 + 3;
      const hrDecrease = Math.random() * 5 + 2;

      const systolic = Math.max(patientData.systolic_bp - systolicDecrease, 90);
      const diastolic = Math.max(patientData.diastolic_bp - diastolicDecrease, 50);
      const heartRate = Math.max(patientData.heart_rate - hrDecrease, 50);

      simulation.push({
        day,
        systolic: Math.round(systolic),
        diastolic: Math.round(diastolic),
        heartRate: Math.round(heartRate),
      });
    }
    results[drug] = simulation;
  });

  return results;
}

app.post("/simulate", (req, res) => {
  const patientData = req.body;
  if (!patientData.age || !patientData.systolic_bp) {
    return res.status(400).json({ error: "Invalid patient data" });
  }
  const results = simulateTherapy(patientData);
  res.json(results);
});

app.listen(3001, () => {
  console.log("Backend server running on port 3001");
});
