
import React, { useRef } from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 2px solid ${(p) => p.theme.primary};
  border-radius: 12px;
  background: #f8fafd;
  padding: 28px 20px 20px 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const Title = styled.h2`
  color: ${(p) => p.theme.primary};
  margin-top: 0;
  margin-bottom: 18px;
  font-size: 1.5rem;
`;

const Info = styled.p`
  margin: 4px 0;
  font-size: 1.08rem;
`;

const MedList = styled.ul`
  margin: 0 0 8px 0;
  padding-left: 20px;
`;

const ButtonBar = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
`;

const Button = styled.button`
  background: ${(p) => p.accent ? p.theme.accent : p.theme.primary};
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${(p) => p.accent ? '#b71c4a' : '#1251a3'};
  }
`;

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
    <Card>
      <div ref={ref}>
        <Title>Prescription</Title>
        <Info><b>Doctor:</b> {prescription.doctor}</Info>
        <Info><b>Patient:</b> {prescription.patient}</Info>
        <Info><b>Date:</b> {prescription.date}</Info>
        <Info><b>Medicines:</b></Info>
        <MedList>
          {prescription.medicines.map((med, i) => <li key={i}>{med}</li>)}
        </MedList>
        {prescription.notes && <Info><b>Notes:</b> {prescription.notes}</Info>}
      </div>
      <ButtonBar>
        <Button onClick={handlePrint}>Print</Button>
        <Button accent onClick={handleDownload}>Download</Button>
      </ButtonBar>
    </Card>
  );
}

export default PrescriptionPreview;
