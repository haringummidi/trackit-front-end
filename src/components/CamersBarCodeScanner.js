// CameraBarcodeScanner.js
import React, { useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import Webcam from "react-webcam";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";

const CameraBarcodeScanner = ({ show, onHide, onBarcodeDetected }) => {
  const webcamRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (show && webcamRef.current) {
      const video = webcamRef.current.video;
      codeReader.current.decodeFromVideoDevice(null, video, (result, err) => {
        if (result) {
          onBarcodeDetected(result.getText());
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      });
    }

    return () => {
      codeReader.current.reset();
    };
  }, [show, onBarcodeDetected]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Scan Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="100%"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CameraBarcodeScanner;
