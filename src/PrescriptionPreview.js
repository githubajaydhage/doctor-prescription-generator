
import React, { useRef } from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 2px solid ${(p) => p.theme.primary};
  border-radius: 10px;
  background: #fff;
  padding: 0;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Segoe UI', Arial, sans-serif;
`;

const RxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 2px solid ${(p) => p.theme.primary};
  padding: 18px 28px 10px 28px;
  background: ${(p) => p.theme.secondary};
`;

const Clinic = styled.div`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${(p) => p.theme.primary};
`;

const DocDetails = styled.div`
  font-size: 1rem;
  color: ${(p) => p.theme.font};
  margin-top: 2px;
`;

const RxBody = styled.div`
  padding: 18px 28px 10px 28px;
`;

const PatientRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PatientInfo = styled.div`
  font-size: 1.05rem;
`;

const RxTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 18px 0 10px 0;
  font-size: 1.05rem;
`;

const RxTh = styled.th`
  border-bottom: 1.5px solid ${(p) => p.theme.primary};
  padding: 6px 8px;
  text-align: left;
  font-weight: 600;
`;

const RxTd = styled.td`
  padding: 6px 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const Notes = styled.div`
  margin: 10px 0 0 0;
  font-size: 1.01rem;
`;

const RxFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 28px 18px 28px;
  border-top: 1.5px dashed #bbb;
  font-size: 0.98rem;
  color: #888;
`;

const Signature = styled.div`
  text-align: right;
  min-width: 180px;
  font-family: 'Brush Script MT', cursive, Arial, sans-serif;
  font-size: 1.2rem;
  color: ${(p) => p.theme.primary};
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
        <RxHeader>
          <div>
            <Clinic>{prescription.clinic || "Clinic/Hospital Name"}</Clinic>
            <DocDetails>
              {prescription.doctor ? `Dr. ${prescription.doctor}` : "Doctor Name"}<br/>
              {prescription.degree && <>{prescription.degree}<br/></>}
              {prescription.reg && <>Reg. No: {prescription.reg} | </>}{prescription.phone && <>Ph: {prescription.phone}</>}
            </DocDetails>
          </div>
          <div style={{textAlign:'right', fontSize:'1.05rem', color:'#666'}}>
            <div>Date: {prescription.date}</div>
            <div style={{marginTop:8, fontWeight:600, color:theme.accent}}>Rx</div>
          </div>
        </RxHeader>
        <RxBody>
          <PatientRow>
            <PatientInfo><b>Patient:</b> {prescription.patient}</PatientInfo>
            <PatientInfo><b>Age/Sex:</b> ______ / ______</PatientInfo>
          </PatientRow>
          <RxTable>
            <thead>
              <tr>
                <RxTh>Medicine</RxTh>
                <RxTh>Dosage</RxTh>
                <RxTh>Frequency</RxTh>
                <RxTh>Duration</RxTh>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines.map((med, i) => (
                <tr key={i}>
                  <RxTd>{med.name}</RxTd>
                  <RxTd>{med.dosage || "______"}</RxTd>
                  <RxTd>{med.frequency || "______"}</RxTd>
                  <RxTd>{med.duration || "______"}</RxTd>
                </tr>
              ))}
            </tbody>
          </RxTable>
          {prescription.notes && <Notes><b>Notes:</b> {prescription.notes}</Notes>}
        </RxBody>
        <RxFooter>
          <div>
            {prescription.reg && <>Reg. No: {prescription.reg} | </>}
            {prescription.clinic && <>{prescription.clinic}, </>}
            {prescription.address && <>{prescription.address}<br/></>}
            {prescription.phone && <>Contact: {prescription.phone} | </>}
            <span style={{color:theme.accent}}>For medical use only</span>
          </div>
          <Signature>Signature</Signature>
        </RxFooter>
      </div>
      <ButtonBar>
        <Button onClick={handlePrint}>Print</Button>
        <Button accent onClick={handleDownload}>Download</Button>
      </ButtonBar>
    </Card>
  );
}

export default PrescriptionPreview;
