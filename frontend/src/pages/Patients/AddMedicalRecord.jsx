import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

export default function AddMedicalRecord() {
  const { patientId } = useParams(); // URL se patient ID milegi
  const navigate = useNavigate();

  const [form, setForm] = useState({
    condition: "",
    symptoms: "",
    diagnosis: "",
    medications: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/medical-records", {
        patient: patientId,
        condition: form.condition,
        symptoms: form.symptoms,
        diagnosis: form.diagnosis,
        medications: form.medications.split(","), // comma se array
        notes: form.notes,
      });

      alert("Medical record added ✅");
      navigate(`/patients/${patientId}`);
    } catch (err) {
      console.error(err);
      alert("Error adding record");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Add Medical Record</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-medium">Condition (Bimari)*</label>
          <input
            type="text"
            name="condition"
            required
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="e.g. Diabetes, Fever, Asthma"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Symptoms</label>
          <textarea
            name="symptoms"
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="e.g. Headache, Cough, Weakness"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Diagnosis</label>
          <input
            type="text"
            name="diagnosis"
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Doctor's diagnosis"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Medications (comma separated)
          </label>
          <input
            type="text"
            name="medications"
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="e.g. Paracetamol, Azithromycin"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Any additional notes"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Save Record
        </button>
      </form>
    </div>
  );
}
