
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
  gap: 18px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 2px;
`;

const Input = styled.input`
  padding: 8px 10px;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
`;

const TextArea = styled.textarea`
  padding: 8px 10px;
  border: 1px solid #cfd8dc;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
`;

const MedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MedRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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


function PrescriptionForm({ setPrescription }) {
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

  const handleMedicineChange = (i, field, value) => {
    const medicines = [...form.medicines];
    medicines[i][field] = value;
    setForm({ ...form, medicines });
    setError("");
    setSuccess(false);
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
          {form.medicines.map((med, i) => (
            <MedRow key={i} style={{gap:4}}>
              <Input value={med.name} onChange={e => handleMedicineChange(i, 'name', e.target.value)} required placeholder={`Medicine #${i+1}`} style={{flex:1}} />
              <Input value={med.dosage} onChange={e => handleMedicineChange(i, 'dosage', e.target.value)} placeholder="Dosage" style={{width:90}} />
              <Input value={med.frequency} onChange={e => handleMedicineChange(i, 'frequency', e.target.value)} placeholder="Frequency" style={{width:90}} />
              <Input value={med.duration} onChange={e => handleMedicineChange(i, 'duration', e.target.value)} placeholder="Duration" style={{width:90}} />
              {form.medicines.length > 1 && <Button type="button" onClick={() => removeMedicine(i)} style={{padding:'4px 10px',fontSize:'1.1rem',background:'#e57373'}}>–</Button>}
              {i === form.medicines.length - 1 && <Button type="button" onClick={addMedicine} style={{padding:'4px 10px',fontSize:'1.1rem',background:'#81c784'}}>+</Button>}
            </MedRow>
          ))}
        </MedList>
        <div style={{fontSize:'0.93rem',color:'#888',marginTop:4}}>You can add dosage, frequency, and duration for each medicine.</div>
      </Row>
      <Row>
        <Label>Notes</Label>
        <TextArea name="notes" value={form.notes} onChange={handleChange} rows={2} placeholder="Any special instructions..." />
      </Row>
      <Button type="submit" primary>Generate Prescription</Button>
    </FormCard>
  );
}

export default PrescriptionForm;
