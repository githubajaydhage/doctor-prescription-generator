import React, { useRef } from "react";

function PrescriptionPreview({ prescription, theme }) {
  const ref = useRef();

  const handlePrint = () => {
    const printContents = ref.current.innerHTML;
    const win = window.open('', '', 'height=700,width=700');
    win.document.write('<html><head><title>Prescription</title>');
    win.document.write(`<style>body{font-family:Arial,sans-serif;background:${theme.secondary};color:${theme.font};}</style>`);
    win.document.write('</head><body >');
    win.document.write(printContents);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([
      `Doctor: ${prescription.doctor}\nPatient: ${prescription.patient}\nDate: ${prescription.date}\nMedicines: ${prescription.medicines.join(", ")}\nNotes: ${prescription.notes}`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "prescription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ border: `2px solid ${theme.primary}`, padding: 24, marginBottom: 24 }}>
      <div ref={ref}>
        <h2 style={{ color: theme.primary }}>Prescription</h2>
        <p><b>Doctor:</b> {prescription.doctor}</p>
        <p><b>Patient:</b> {prescription.patient}</p>
        <p><b>Date:</b> {prescription.date}</p>
        <p><b>Medicines:</b></p>
        <ul>
          {prescription.medicines.map((med, i) => <li key={i}>{med}</li>)}
        </ul>
        {prescription.notes && <p><b>Notes:</b> {prescription.notes}</p>}
      </div>
      <button onClick={handlePrint} style={{ marginRight: 8 }}>Print</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default PrescriptionPreview;
