
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
  display: grid;
  grid-template-columns: 2.5fr 1.2fr 1.2fr 1.2fr auto auto;
  gap: 8px;
  align-items: center;
  margin-bottom: 4px;
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
  const [form, setForm] = useState({
    doctor: doctorProfiles[0].name,
    degree: doctorProfiles[0].degree,
    reg: doctorProfiles[0].reg,
    phone: doctorProfiles[0].phone,
    clinic: doctorProfiles[0].clinic,
    address: doctorProfiles[0].address,
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

  // Handle doctor profile selection
  const handleDoctorProfile = (e) => {
    const idx = e.target.value;
    if (doctorProfiles[idx].name === "Custom") {
      setForm({
        ...form,
        doctor: "",
        degree: "",
        reg: "",
        phone: "",
        clinic: "",
        address: ""
      });
    } else {
      setForm({
        ...form,
        doctor: doctorProfiles[idx].name,
        degree: doctorProfiles[idx].degree,
        reg: doctorProfiles[idx].reg,
        phone: doctorProfiles[idx].phone,
        clinic: doctorProfiles[idx].clinic,
        address: doctorProfiles[idx].address
      });
    }
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
        <Label>Doctor Profile</Label>
        <select onChange={handleDoctorProfile} style={{padding:'8px 10px',borderRadius:6,border:'1px solid #cfd8dc',fontSize:'1rem',marginBottom:8}}>
          {doctorProfiles.map((doc, idx) => (
            <option key={doc.name} value={idx}>{doc.name}</option>
          ))}
        </select>
      </Row>
      <Row>
        <Label>Doctor Name</Label>
        <Input name="doctor" value={form.doctor} onChange={handleChange} required placeholder="Dr. John Doe" />
      </Row>
      {form.doctor && (
        <>
          <Row>
            <Label>Degree</Label>
            <Input name="degree" value={form.degree} onChange={handleChange} placeholder="MBBS, MD" />
          </Row>
          <Row>
            <Label>Reg. No</Label>
            <Input name="reg" value={form.reg} onChange={handleChange} placeholder="123456" />
          </Row>
          <Row>
            <Label>Phone</Label>
            <Input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" />
          </Row>
          <Row>
            <Label>Clinic/Hospital</Label>
            <Input name="clinic" value={form.clinic} onChange={handleChange} placeholder="City Health Clinic" />
          </Row>
          <Row>
            <Label>Address</Label>
            <Input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, Metro City" />
          </Row>
        </>
      )}
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
        <div style={{display:'flex',gap:8,marginBottom:8}}>
          <Button type="button" onClick={() => setForm({ ...form, medicines: getRandomMedicines() })} style={{background:'#1976d2'}}>Randomize</Button>
          <Button type="button" onClick={() => setForm({ ...form, medicines: [{ name: "", dosage: "", frequency: "", duration: "" }] })} style={{background:'#e57373'}}>Clear</Button>
        </div>
        <MedList>
          <MedRow style={{fontWeight:600, color:'#1976d2', fontSize:'1rem', background:'#f0f4f8', borderRadius:6, padding:'4px 0'}}>
            <span>Medicine</span>
            <span>Dosage</span>
            <span>Frequency</span>
            <span>Duration</span>
            <span></span>
            <span></span>
          </MedRow>
          {form.medicines.map((med, i) => (
            <MedRow key={i}>
              <Input value={med.name} onChange={e => handleMedicineChange(i, 'name', e.target.value)} required placeholder={`Medicine #${i+1}`} />
              <Input value={med.dosage} onChange={e => handleMedicineChange(i, 'dosage', e.target.value)} placeholder="Dosage" />
              <Input value={med.frequency} onChange={e => handleMedicineChange(i, 'frequency', e.target.value)} placeholder="Frequency" />
              <Input value={med.duration} onChange={e => handleMedicineChange(i, 'duration', e.target.value)} placeholder="Duration" />
              {form.medicines.length > 1 && <Button type="button" onClick={() => removeMedicine(i)} style={{padding:'4px 10px',fontSize:'1.1rem',background:'#e57373'}}>–</Button>}
              {i === form.medicines.length - 1 && <Button type="button" onClick={addMedicine} style={{padding:'4px 10px',fontSize:'1.1rem',background:'#81c784'}}>+</Button>}
            </MedRow>
          ))}
        </MedList>
        <div style={{fontSize:'0.93rem',color:'#888',marginTop:4}}>You can add dosage, frequency, and duration for each medicine, or use random suggestions.</div>
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
