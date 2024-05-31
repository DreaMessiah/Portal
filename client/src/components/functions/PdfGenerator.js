import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PdfGenerator = ({ data }) => {
    const generatePdf = () => {
        const doc = new jsPDF()
        const tableColumn = Object.keys(data[0])
        const tableRows = data.map(item => Object.values(item))

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        })

        doc.save('table.pdf');
    }

    return (
        <div>
            <button onClick={generatePdf}>Generate PDF</button>
        </div>
    );
};

export default PdfGenerator;