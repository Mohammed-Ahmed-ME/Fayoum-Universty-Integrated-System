// import React, { useEffect, useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
//
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//
// const PDFViewer = ({ fileUrl }) => {
//     const [numPages, setNumPages] = useState(null);
//
//     const onDocumentLoadSuccess = ({ numPages }) => {
//         setNumPages(numPages);
//     };
//
//     useEffect(() => {
//         return () => {
//             setNumPages(null);
//         };
//     }, []);
//
//     return (
//         <div>
//             <Document
//                 file={fileUrl}
//                 onLoadSuccess={onDocumentLoadSuccess}
//                 options={{ workerSrc: '//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.js' }}
//             >
//                 {Array.from(new Array(numPages), (el, index) => (
//                     <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                 ))}
//             </Document>
//             <p>Page {numPages && numPages.length} of {numPages}</p>
//         </div>
//     );
// };
//
// export default PDFViewer;
