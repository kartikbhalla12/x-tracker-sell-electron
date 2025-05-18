import React from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import sellToken from "@/utils/sellToken";
import toggleBodyClass from "@/utils/toggleBodyClass";

import "./App.css";
interface FormValues {
  walletPublicKey: string;
  walletPrivateKey: string;
  tokenPublicKey: string;
}

const validationSchema = Yup.object({
  walletPublicKey: Yup.string().required("Wallet Public Key is required"),
  walletPrivateKey: Yup.string().required("Wallet Private Key is required"),
  tokenPublicKey: Yup.string().required("Token Public Key is required"),
});

const handleFieldBlur = (field: string, value: string) => {
  localStorage.setItem(field, value);
  console.log(`${field} saved to storage:`, value);
};

const handlePercentageSubmit = (percentage: number) => {
  const walletPublicKey = localStorage.getItem("walletPublicKey");
  const walletPrivateKey = localStorage.getItem("walletPrivateKey");
  const tokenPublicKey = localStorage.getItem("tokenPublicKey");

  if (!walletPublicKey || !walletPrivateKey || !tokenPublicKey) {
    alert("Please enter all required fields");
    return;
  }

  sellToken({
    publicKey: walletPublicKey,
    privateKey: walletPrivateKey,
    tokenPublicKey: tokenPublicKey,
    percentage: percentage,
  });
};

const App: React.FC = () => {
  const initialValues: FormValues = {
    walletPublicKey: localStorage.getItem("walletPublicKey") || "",
    walletPrivateKey: localStorage.getItem("walletPrivateKey") || "",
    tokenPublicKey: localStorage.getItem("tokenPublicKey") || "",
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>X Tracker</h1>
      </header>

      <div className="percentage-buttons-container">
        <p>Sell Percentage</p>
        <div className="percentage-buttons-inner-container">
          <button
            type="button"
            className={`percentage-button`}
            onClick={() => handlePercentageSubmit(10)}
          >
            10%
          </button>
          <button
            type="button"
            className={`percentage-button`}
            onClick={() => handlePercentageSubmit(25)}
          >
            25%
          </button>
          <button
            type="button"
            className={`percentage-button`}
            onClick={() => handlePercentageSubmit(50)}
          >
            50%
          </button>
          <button
            type="button"
            className={`percentage-button`}
            onClick={() => handlePercentageSubmit(100)}
          >
            100%
          </button>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
          /* Empty function as we're handling submission via percentage buttons */
        }}
      >
        {(formik) => (
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="walletPublicKey">Wallet Public Key</label>
              <Field
                type="text"
                id="walletPublicKey"
                name="walletPublicKey"
                className="form-control"
                placeholder="Enter wallet public key"
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  formik.handleBlur(e);
                  handleFieldBlur("walletPublicKey", e.target.value);
                }}
              />
              <ErrorMessage
                name="walletPublicKey"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="walletPrivateKey">Wallet Private Key</label>
              <Field
                type="text"
                id="walletPrivateKey"
                name="walletPrivateKey"
                className="form-control"
                placeholder="Enter wallet private key"
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  formik.handleBlur(e);
                  handleFieldBlur("walletPrivateKey", e.target.value);
                }}
              />
              <ErrorMessage
                name="walletPrivateKey"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tokenPublicKey">Token Public Key</label>
              <Field
                type="text"
                id="tokenPublicKey"
                name="tokenPublicKey"
                className="form-control"
                placeholder="Enter token public key"
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                  formik.handleBlur(e);
                  handleFieldBlur("tokenPublicKey", e.target.value);
                  toggleBodyClass();
                }}
              />
              <ErrorMessage
                name="tokenPublicKey"
                component="div"
                className="error-message"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
