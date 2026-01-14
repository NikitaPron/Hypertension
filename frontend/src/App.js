import React, { useState } from "react";
import "./App.css";

function App() {
  const [patientData, setPatientData] = useState({
    age: "50",
    gender: "male",
    weight: "70",
    height: "170",
    creatinine: "1.0",
    potassium: "4.0",
    sodium: "140",
    systolic_bp: "140",
    diastolic_bp: "90",
    heart_rate: "70",
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patientData),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to simulate. Please check if backend is running.");
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>Hypertension Therapy Simulation Platform</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-group">
            <label>Age:</label>
            <input type="number" name="age" value={patientData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={patientData.gender} onChange={handleChange} required>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Weight (kg):</label>
            <input type="number" name="weight" value={patientData.weight} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Height (cm):</label>
            <input type="number" name="height" value={patientData.height} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Creatinine (mg/dL):</label>
            <input type="number" step="0.1" name="creatinine" value={patientData.creatinine} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Potassium (mmol/L):</label>
            <input type="number" step="0.1" name="potassium" value={patientData.potassium} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Sodium (mmol/L):</label>
            <input type="number" step="0.1" name="sodium" value={patientData.sodium} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Systolic BP (mmHg):</label>
            <input type="number" name="systolic_bp" value={patientData.systolic_bp} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Diastolic BP (mmHg):</label>
            <input type="number" name="diastolic_bp" value={patientData.diastolic_bp} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Heart Rate (bpm):</label>
            <input type="number" name="heart_rate" value={patientData.heart_rate} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Simulating..." : "Simulate Therapy"}
        </button>
      </form>
      {results && (
        <div className="results">
          <h2>Simulation Results (30 days)</h2>
          {Object.keys(results).map((drug) => (
            <div key={drug} className="drug-result">
              <h3>{drug.charAt(0).toUpperCase() + drug.slice(1)}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Systolic BP</th>
                    <th>Diastolic BP</th>
                    <th>Heart Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {results[drug].slice(0, 10).map((data) => (
                    <tr key={data.day}>
                      <td>{data.day}</td>
                      <td>{data.systolic}</td>
                      <td>{data.diastolic}</td>
                      <td>{data.heartRate}</td>
                    </tr>
                  ))}
                  {results[drug].length > 10 && (
                    <tr>
                      <td colSpan="4">... (showing first 10 days)</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
