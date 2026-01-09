import QRCode from "qrcode.react";
import React, { useRef } from "react";
import styled from "styled-components";

// Handwritten font fallback (Google Fonts: Pacifico preferred)
const scriptFont = `'Pacifico', 'Segoe Script', 'Brush Script MT', cursive, Arial, sans-serif`;

// Real-world hospital logos (SVG or PNG links)
const hospitalLogos = {
  "Apollo Hospitals": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Apollo_Hospitals_Logo.png",
  "Fortis Healthcare": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Fortis_Healthcare_logo.png",
  "AIIMS New Delhi": "https://upload.wikimedia.org/wikipedia/en/2/2e/AIIMS_New_Delhi_Logo.png",
  "Narayana Health": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Narayana_Health_logo.png",
  "Max Healthcare": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Max_Healthcare_logo.png",
  "Manipal Hospitals": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Manipal_Hospitals_logo.png",
  "Medanta - The Medicity": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Medanta_The_Medicity_logo.png",
  "Sir Ganga Ram Hospital": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sir_Ganga_Ram_Hospital_logo.png",
  "Lilavati Hospital": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Lilavati_Hospital_logo.png",
  "Kokilaben Dhirubhai Ambani Hospital": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kokilaben_Dhirubhai_Ambani_Hospital_logo.png",
  "Christian Medical College Vellore": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Christian_Medical_College_Vellore_logo.png",
  "Tata Memorial Hospital": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Tata_Memorial_Hospital_logo.png",
  "PGIMER Chandigarh": "https://upload.wikimedia.org/wikipedia/commons/2/2e/PGIMER_Chandigarh_logo.png",
  "Sankara Nethralaya": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sankara_Nethralaya_logo.png",
  "Jaslok Hospital": "https://upload.wikimedia.org/wikipedia/commons/2/2e/Jaslok_Hospital_logo.png"
};

const Card = styled.div`
  border: 2.5px solid #1976d2;
  border-radius: 12px;
  background: #fff;
  margin: 36px auto 28px auto;
  max-width: 500px;
  min-height: 540px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  font-family: 'Segoe UI', Arial, sans-serif;
  position: relative;
  padding: 0;
  overflow: hidden;
`;

const BlueLine = styled.div`
  border-bottom: 1.5px solid #1976d2;
  margin: 0 18px;
`;

const RxHeader = styled.div`
  padding: 24px 28px 0 28px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.12rem;
  margin-bottom: 8px;
`;

const RxInfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 18px;
  font-size: 1.12rem;
  margin-bottom: 8px;
`;

const Label = styled.span`
  color: #1976d2;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

const RxBody = styled.div`
  padding: 28px 28px 10px 28px;
`;

const RxSymbol = styled.div`
  font-size: 2.5rem;
  color: #1976d2;
  font-weight: 700;
  margin: 18px 0 8px 0;
  font-family: 'Times New Roman', serif;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
`;

const ScriptText = styled.div`
  font-family: ${scriptFont};
  font-size: 1.25rem;
  margin: 26px 0 14px 0;
  text-align: left;
  min-height: 60px;
  white-space: pre-line;
  color: #222;
`;

const Notes = styled.div`
  font-family: ${scriptFont};
  font-size: 1.18rem;
  margin: 14px 0 0 0;
  white-space: pre-line;
  color: #222;
`;

const RxFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 18px 28px 24px 28px;
  font-size: 1.08rem;
  color: #1976d2;
`;

const FooterBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Signature = styled.div`
  text-align: right;
  min-width: 160px;
  font-family: ${scriptFont};
  font-size: 1.35rem;
  color: #1976d2;
  letter-spacing: 1.5px;
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

function PrescriptionPreview({ prescription, theme, rxSymbol }) {
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
      `Doctor: ${prescription.doctor}\nPatient: ${prescription.patient}\nDate: ${prescription.date}\nMedicines: ${prescription.medicines.map(m=>m.name).join(", ")}\nNotes: ${prescription.notes}`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "prescription.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Pick logo based on clinic/hospital name
  let logoUrl = null;
  if (prescription.clinic && hospitalLogos[prescription.clinic]) {
    logoUrl = hospitalLogos[prescription.clinic];
  } else if (prescription.clinic) {
    // Try to match by partial name (case-insensitive)
    const found = Object.keys(hospitalLogos).find(hn => hn.toLowerCase().includes(prescription.clinic.toLowerCase()));
    if (found) logoUrl = hospitalLogos[found];
  }

  return (
    <Card>
      <div ref={ref}>
        <RxHeader>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
            {logoUrl ? (
              <img src={logoUrl} alt="Hospital Logo" style={{height:38, width:'auto', marginRight:6}} />
            ) : (
              <span style={{fontSize:'2.1rem',color:'#1976d2',marginRight:6}}>🏥</span>
            )}
            <div style={{fontWeight:700,fontSize:'1.1rem',color:'#1976d2'}}>{prescription.clinic || 'Clinic/Hospital'}</div>
          </div>
          <TopRow>
            <div><Label>Name:</Label> <span style={{fontFamily:scriptFont, fontSize:'1.18rem', color:'#222'}}>{prescription.patient || "__________"}</span></div>
            <div><Label>Date:</Label> <span style={{fontFamily:scriptFont, fontSize:'1.18rem', color:'#222'}}>{prescription.date || "__________"}</span></div>
          </TopRow>
          <RxInfoRow>
            <div><Label>Address:</Label> <span style={{fontFamily:scriptFont, fontSize:'1.18rem', color:'#222'}}>{prescription.address || "__________"}</span></div>
            {prescription.contact && <div><Label>Contact:</Label> <span style={{fontFamily:scriptFont, fontSize:'1.18rem', color:'#222'}}>{prescription.contact}</span></div>}
          </RxInfoRow>
          <TopRow>
            <div><Label>Age:</Label> <span style={{fontFamily:scriptFont, fontSize:'1.18rem', color:'#222'}}>{prescription.age || "______"}</span></div>
            <div><Label>Sex:</Label> <span style={{fontFamily:scriptFont, fontSize:'1.18rem', color:'#222'}}>{prescription.sex || "______"}</span></div>
          </TopRow>
        </RxHeader>
        <BlueLine />
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 28px 8px 28px'}}>
          {prescription.validity && (
            <div style={{color:'#1976d2',fontWeight:600,fontSize:'1.08rem'}}>Valid for: {prescription.validity} days from {prescription.date || '_____'}</div>
          )}
          <div>
            <QRCode value={JSON.stringify({
              doctor: prescription.doctor,
              patient: prescription.patient,
              date: prescription.date,
              validity: prescription.validity,
              medicines: prescription.medicines
            })} size={64} />
            <div style={{fontSize:'0.8rem',color:'#888',textAlign:'center'}}>Verify</div>
          </div>
        </div>
        <RxBody>
          <RxSymbol>{rxSymbol || '℞'}</RxSymbol>
          <ScriptText>
            {prescription.medicines.map((med, i) => (
              med.name ? `${med.name} ${med.dosage ? med.dosage : ''} ${med.frequency ? med.frequency : ''} ${med.duration ? med.duration : ''}${med.instructions ? ' | Sig.: ' + med.instructions : ''}${med.refill ? ' | Refill: ' + med.refill : ''}\n` : ''
            ))}
          </ScriptText>
          {prescription.notes && <Notes>{prescription.notes}</Notes>}
        </RxBody>
        <BlueLine />
        <RxFooter>
          <FooterBox>
            <div>
              <div>Physician's Sig <span style={{marginLeft:24}}>
                {prescription.signature ? (
                  <img src={prescription.signature} alt="Doctor Signature" style={{maxHeight:48, maxWidth:180, verticalAlign:'middle'}} />
                ) : (
                  <Signature>{prescription.doctor || "Signature"}</Signature>
                )}
              </span></div>
              <div style={{fontSize:'0.97rem',color:'#1976d2',marginTop:2}}>
                Lic. No. {prescription.reg || "______"} &nbsp; PTR No. {prescription.phone || "______"} &nbsp; S2 No. ______
              </div>
            </div>
          </FooterBox>
        </RxFooter>
      </div>
      <ButtonBar>
        <Button onClick={handlePrint}>Print</Button>
        <Button accent onClick={handleDownload}>Download TXT</Button>
        <Button accent onClick={() => window.print()}>Print (Browser)</Button>
        <Button accent onClick={() => {
          import('jspdf').then(jsPDF => {
            const doc = new jsPDF.jsPDF();
            doc.text('Doctor: ' + (prescription.doctor || ''), 10, 10);
            doc.text('Patient: ' + (prescription.patient || ''), 10, 20);
            doc.text('Date: ' + (prescription.date || ''), 10, 30);
            doc.text('Medicines:', 10, 40);
            prescription.medicines.forEach((med, i) => {
              doc.text(`- ${med.name || ''} ${med.dosage || ''} ${med.frequency || ''} ${med.duration || ''} ${med.instructions ? '| Sig.: ' + med.instructions : ''} ${med.refill ? '| Refill: ' + med.refill : ''}`, 12, 50 + i * 10);
            });
            if (prescription.notes) doc.text('Notes: ' + prescription.notes, 10, 60 + prescription.medicines.length * 10);
            doc.save('prescription.pdf');
          });
        }}>Download PDF</Button>
      </ButtonBar>
    </Card>
  );
}

export default PrescriptionPreview;
