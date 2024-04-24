import { FC, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './index.scss';
import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons';
import { Layout, Spin } from 'antd';
interface DocumentPreviewProps {
  url: any;
  width?: number;
}

const DocumentPreview: FC<DocumentPreviewProps> = ({ url, width }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const onDocumentLoadSuccess = ({ numPages }: pdfjs.PDFDocumentProxy) => {
    setNumPages(numPages);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
  }, [url]);

  return (
    <div className={`document-preview ${loading && 'loading'}`}>
      {url && (
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={error => console.error('Error while loading PDF:', error)}
        >
          <Page pageNumber={pageNumber} width={width ? width : 500} />
        </Document>
      )}

      {numPages > 0 && (
        <nav>
          <button
            onClick={() => setPageNumber(prevPageNumber => prevPageNumber - 1)}
            className={pageNumber <= 1 ? 'disable' : ''}
          >
            <DoubleLeftOutlined />
          </button>
          <button
            onClick={() => setPageNumber(prevPageNumber => prevPageNumber + 1)}
            className={!numPages || pageNumber >= numPages ? 'disable' : ''}
          >
            <DoubleRightOutlined />
          </button>
        </nav>
      )}
      {loading && <Spin />}
    </div>
  );
};
export default DocumentPreview;
