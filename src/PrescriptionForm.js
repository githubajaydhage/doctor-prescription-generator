import React, { useState } from "react";

function PrescriptionForm({ setPrescription }) {
  const [form, setForm] = useState({
    doctor: "",
    patient: "",
    date: new Date().toISOString().slice(0, 10),
    medicines: [""],
    notes: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = (i, value) => {
    const medicines = [...form.medicines];
    medicines[i] = value;
    setForm({ ...form, medicines });
  };

  const addMedicine = () => {
    setForm({ ...form, medicines: [...form.medicines, ""] });
  };

  const removeMedicine = (i) => {
    const medicines = form.medicines.filter((_, idx) => idx !== i);
    setForm({ ...form, medicines });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrescription(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div>
        <label>Doctor Name: <input name="doctor" value={form.doctor} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Patient Name: <input name="patient" value={form.patient} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Date: <input type="date" name="date" value={form.date} onChange={handleChange} required /></label>
      </div>
      <div>
        <label>Medicines:</label>
        {form.medicines.map((med, i) => (
          <div key={i}>
            <input value={med} onChange={e => handleMedicineChange(i, e.target.value)} required />
            {form.medicines.length > 1 && <button type="button" onClick={() => removeMedicine(i)}>-</button>}
            {i === form.medicines.length - 1 && <button type="button" onClick={addMedicine}>+</button>}
          </div>
        ))}
      </div>
      <div>
        <label>Notes: <textarea name="notes" value={form.notes} onChange={handleChange} /></label>
      </div>
      <button type="submit">Generate Prescription</button>
    </form>
  );
}

export default PrescriptionForm;
