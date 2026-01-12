import jsPDF from "jspdf";
import { Autocomplete } from "@mui/material";
// Styled components for missing UI elements
const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  color: #1976d2;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 4px;
  outline: none;
  &:focus {
    border-color: #1976d2;
  }
`;

const TextArea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 4px;
  outline: none;
  resize: vertical;
  &:focus {
    border-color: #1976d2;
  }
`;

const MedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
`;

import React, { useState } from "react";
import styled from "styled-components";

const FormCard = styled.form`
  background: #f8fafd;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 24px 18px 18px 18px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Removed duplicate MedRow grid definition (using flex version below)
const MedRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 4px;
  > * {
    min-width: 120px;
    flex: 1 1 120px;
    max-width: 180px;
  }
  > button {
    min-width: 36px;
    max-width: 36px;
    flex: 0 0 36px;
    padding: 4px 0;
    margin-left: 0;
  }
`;

const Button = styled.button`
  background: ${(p) => p.primary ? p.theme.primary : p.theme.accent};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(p) => p.primary ? '#1251a3' : '#b71c4a'};
  }
`;


// Rx symbol variants (including icons, not just R types)
const rxVariants = [
  '℞', 'Rx', 'ℜ', '℟', '✚', '✝', '☤', '⚕', '🩺', '🩹', '💊', '💉', '🩻', '🏥', '🩸', '🧬', '🧫', '🧪', '🩺', '🩻', '🩹', '🩸', '🧬', '🧫', '🧪', '🏥', '✚', '✝', '☤', '⚕', 'Rx', '℞', 'ℜ', '℟'
];

// Default medicine suggestions
const defaultMedicines = [
  { name: "Amoxicillin 500mg Cap", dosage: "1 cap", frequency: "3x a day", duration: "7 days" },
  { name: "Paracetamol 500mg Tab", dosage: "1 tab", frequency: "2x a day", duration: "5 days" },
  { name: "Ibuprofen 400mg Tab", dosage: "1 tab", frequency: "2x a day", duration: "3 days" },
  { name: "Cough Syrup 5ml", dosage: "5ml", frequency: "3x a day", duration: "5 days" },
  { name: "Cetirizine 10mg Tab", dosage: "1 tab", frequency: "1x a day", duration: "3 days" }
];

// Example doctor profiles
const doctorProfiles = [
  {
    name: "Dr. John Doe",
    degree: "MBBS, MD (General Medicine)",
    reg: "123456",
    phone: "9876543210",
    clinic: "City Health Clinic",
    address: "123 Main St, Metro City"
  },
  {
    name: "Dr. Priya Sharma",
    degree: "MBBS, DNB (Pediatrics)",
    reg: "654321",
    phone: "9123456780",
    clinic: "Sunrise Children Hospital",
    address: "45 Sunrise Ave, Metro City"
  },
  {
    name: "Custom",
    degree: "",
    reg: "",
    phone: "",
    clinic: "",
    address: ""
  }
];

function getRandomRx() {
  const idx = Math.floor(Math.random() * rxVariants.length);
  return rxVariants[idx];
}

function getRandomMedicines() {
  // Pick 1-3 random default medicines
  const count = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...defaultMedicines].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function PrescriptionForm({ setPrescription, setRxSymbol, setDefaultMeds }) {
    // Medicine autocomplete options
    const medicineOptions = defaultMedicines.map(m => m.name);
  const [form, setForm] = useState({
    doctor: "",
    patient: "",
    date: new Date().toISOString().slice(0, 10),
    medicines: [
      { name: "", dosage: "", frequency: "", duration: "" }
    ],
    notes: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  // No doctor profile selection in simple form

  const handleMedicineChange = (i, field, value) => {
    const medicines = [...form.medicines];
    medicines[i][field] = value;
    setForm({ ...form, medicines });
    setError("");
    setSuccess(false);
  };

  // PDF export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Doctor: ${form.doctor}`, 10, 10);
    doc.text(`Patient: ${form.patient}`, 10, 20);
    doc.text(`Date: ${form.date}`, 10, 30);
    doc.text("Medicines:", 10, 40);
    form.medicines.forEach((med, idx) => {
      doc.text(
        `${idx + 1}. ${med.name} | ${med.dosage} | ${med.frequency} | ${med.duration}`,
        10,
        50 + idx * 10
      );
    });
    doc.text(`Notes: ${form.notes}`, 10, 60 + form.medicines.length * 10);
    doc.save("prescription.pdf");
  };

  const addMedicine = () => {
    setForm({
      ...form,
      medicines: [...form.medicines, { name: "", dosage: "", frequency: "", duration: "" }]
    });
    setError("");
    setSuccess(false);
  };

  const removeMedicine = (i) => {
    const medicines = form.medicines.filter((_, idx) => idx !== i);
    setForm({ ...form, medicines });
    setError("");
    setSuccess(false);
  };

  const validate = () => {
    if (!form.doctor.trim()) return "Doctor name is required.";
    if (!form.patient.trim()) return "Patient name is required.";
    if (!form.date) return "Date is required.";
    if (!form.medicines.length || form.medicines.some(m => !m.name.trim())) return "All medicine names must be filled.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      setSuccess(false);
      return;
    }
    // Set dynamic Rx symbol and default medicines for preview
    if (setRxSymbol) setRxSymbol(getRandomRx());
    if (setDefaultMeds) setDefaultMeds(form.medicines);
    setPrescription(form);
    setError("");
    setSuccess(true);
  };

  return (
    <FormCard onSubmit={handleSubmit}>
      {error && <div style={{color:'#d32f2f',fontWeight:500,marginBottom:8}}>{error}</div>}
      {success && <div style={{color:'#388e3c',fontWeight:500,marginBottom:8}}>Prescription generated!</div>}
      <Row>
        <Label>Doctor Name</Label>
        <Input name="doctor" value={form.doctor} onChange={handleChange} required placeholder="Dr. John Doe" />
      </Row>
      <Row>
        <Label>Patient Name</Label>
        <Input name="patient" value={form.patient} onChange={handleChange} required placeholder="Jane Smith" />
      </Row>
      <Row>
        <Label>Date</Label>
        <Input type="date" name="date" value={form.date} onChange={handleChange} required />
      </Row>
      <Row>
        <Label>Medicines</Label>
        <MedList>
          <MedRow style={{fontWeight:600, color:'#1976d2', fontSize:'1rem', background:'#f0f4f8', borderRadius:6, padding:'4px 0', flexWrap:'nowrap'}}>
            <span style={{minWidth:120}}>Medicine</span>
            <span style={{minWidth:90}}>Dosage</span>
            <span style={{minWidth:90}}>Frequency</span>
            <span style={{minWidth:90}}>Duration</span>
            <span style={{minWidth:36}}></span>
          </MedRow>
          {form.medicines.map((med, i) => (
            <MedRow key={i}>
              <Autocomplete
                freeSolo
                options={medicineOptions}
                value={med.name}
                onInputChange={(_, value) => handleMedicineChange(i, 'name', value)}
                renderInput={(params) => (
                  <Input {...params} required placeholder={`Medicine #${i+1}`} />
                )}
                style={{minWidth:120}}
              />
              <Input value={med.dosage} onChange={e => handleMedicineChange(i, 'dosage', e.target.value)} placeholder="Dosage" />
              <Input value={med.frequency} onChange={e => handleMedicineChange(i, 'frequency', e.target.value)} placeholder="Frequency" />
              <Input value={med.duration} onChange={e => handleMedicineChange(i, 'duration', e.target.value)} placeholder="Duration" />
              {form.medicines.length > 1 && <Button type="button" onClick={() => removeMedicine(i)} style={{fontSize:'1.1rem',background:'#e57373'}}>–</Button>}
              {i === form.medicines.length - 1 && <Button type="button" onClick={addMedicine} style={{fontSize:'1.1rem',background:'#81c784'}}>+</Button>}
            </MedRow>
          ))}
        </MedList>
      </Row>
      <Row>
        <Label>Notes</Label>
        <TextArea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Any special instructions..." />
      </Row>
      <div style={{display:'flex',gap:12,marginTop:12}}>
        <Button type="submit" primary>Generate Prescription</Button>
        <Button type="button" onClick={handleExportPDF} style={{background:'#1976d2'}}>Export PDF</Button>
        <Button type="button" onClick={() => window.print()} style={{background:'#388e3c'}}>Print</Button>
      </div>
    </FormCard>
  );
}

export default PrescriptionForm;
