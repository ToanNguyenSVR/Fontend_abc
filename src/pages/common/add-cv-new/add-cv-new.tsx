import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import './index.scss';
import { InboxOutlined } from '@ant-design/icons';
import { Skeleton, Tour, TourProps } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Title from 'antd/es/typography/Title';
import Dragger from 'antd/es/upload/Dragger';
import { useSelector } from 'react-redux';
import myAxios from '../../../axios/config';
import { RootState } from '../../../redux/store';
import CVFormGuest from './CVFormGuest/CVFormGuest';

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface ADDNewACProps {}

const ADDNewAC: React.FC<ADDNewACProps> = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [aiScanning, setAiScanning] = useState(false);
  const [scanCV, setScanCV] = useState();
  const [form] = useForm();
  const [open, setOpen] = useState<boolean>(true);
  const user = useSelector((store: RootState) => store.user);

  const onDocumentLoadSuccess = ({ numPages }: pdfjs.PDFDocumentProxy) => {
    setNumPages(numPages);
  };

  const handleChange = (e: any) => {
    const selectedFile = e;

    if (selectedFile) {
      setFile(selectedFile);
      setPageNumber(1); // Reset the page number when a new file is selected
    }
  };

  useEffect(() => {
    if (file) {
      setAiScanning(true);
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);

      myAxios
        .post('pdf', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          setAiScanning(false);
          setScanCV(response.data.data);
        });
    }
  }, [file]);

  useEffect(() => {
    form.setFieldsValue(scanCV);
  }, [scanCV]);

  const steps: TourProps['steps'] = [
    {
      title: 'Upload File',
      description: 'Put your files here.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Preview File',
      description: 'Preview your cv pdf',
      placement: 'left',
      target: () => ref2.current,
    },
    {
      title: 'Update CV',
      description: 'After AI response data, you can update your CV',
      placement: 'right',
      target: () => ref3.current,
    },
  ];

  return (
    <div>
      <Title>Create new CV</Title>
      <div ref={ref1}>
        <Dragger
          onChange={e => {
            handleChange(e.file.originFileObj);
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
      </div>
      {file && (
        <div className="wrapper">
          <div className="file__pdf">
            <div ref={ref2}>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={error => console.error('Error while loading PDF:', error)}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
            <nav>
              <button
                onClick={() => setPageNumber(prevPageNumber => prevPageNumber - 1)}
                disabled={pageNumber <= 1}
              >
                Previous
              </button>
              <button
                onClick={() => setPageNumber(prevPageNumber => prevPageNumber + 1)}
                disabled={!numPages || pageNumber >= numPages}
              >
                Next
              </button>
            </nav>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>

          {aiScanning ? (
            <>
              <Skeleton active paragraph={{ rows: 20 }} />
            </>
          ) : (
            <div ref={ref3} style={{ width: '100%' }}>
              <CVFormGuest cv={scanCV} file={file} />
            </div>
          )}
        </div>
      )}
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default ADDNewAC;
