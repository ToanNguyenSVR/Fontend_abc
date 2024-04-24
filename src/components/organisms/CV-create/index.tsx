import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './index.scss';
import myAxios from '../../../axios/config';
import Title from 'antd/es/typography/Title';
import { Button, Col, Form, Input, Row, Skeleton, Tour, TourProps, UploadProps } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { StorageReference, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebase/config';
import { v4 } from 'uuid';
import { useForm } from 'antd/es/form/Form';
import CVForm from '../CV-form';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import DocumentPreview from '../document-preview';

// Set the worker source for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface CVCreateProps {}

const CVCreate: React.FC<CVCreateProps> = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [aiScanning, setAiScanning] = useState(false);
  const [scanCV, setScanCV] = useState<any>();
  const [form] = useForm();
  const [disable, setDisable] = useState(true);
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

  const scanCVHandler = async (file: any) => {
    try {
      setAiScanning(true);
      const formData = new FormData();
      formData.append('file', file);
      console.log(file);
      const response = await myAxios.post('pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setAiScanning(false);
      setScanCV(response.data.data);
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
      setScanCV(null);
      setAiScanning(false);
      setDisable(false);
    }
  };

  useEffect(() => {
    if (file) {
      scanCVHandler(file);
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
      <Title style={{ fontSize: 15 }}>Create new CV</Title>
      {!file && (
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
      )}
      {file && (
        <div className="wrapper">
          <div className="file__pdf">
            <div ref={ref2}>
              <DocumentPreview url={file} />
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
              <CVForm cv={scanCV} file={file} disable={disable} />
            </div>
          )}
        </div>
      )}
      <Tour open={false} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default CVCreate;
