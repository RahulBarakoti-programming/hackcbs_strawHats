import React, { useState } from "react";
import { User, Type, Image, Lock, DollarSign, File } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { create } from "ipfs-http-client";
import { ethers } from "ethers";
import CryptoJS from "crypto-js";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  details: Yup.string().required("Details are required"),
  dataType: Yup.string().required("Data type is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  price: Yup.number()
    .min(0, "Price must be positive")
    .required("Price is required"),
  file: Yup.mixed().required("File is required"),
});

const DataForm = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");

  const initialValues = {
    name: "",
    details: "",
    dataType: "",
    password: "",
    price: "",
    file: null,
  };

  const encryptFile = async (file, password) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async (e) => {
        try {
          const fileData = e.target.result;
          const encrypted = CryptoJS.AES.encrypt(fileData, password).toString();
          const encryptedBlob = new Blob([encrypted], {
            type: "application/encrypted",
          });
          resolve(encryptedBlob);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadToIPFS = async (encryptedFile) => {
    try {
      // Connect to Infura IPFS (you'll need to replace with your own project ID and secret)
      const ipfs = create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
          authorization:
            "Basic " +
            Buffer.from(
              process.env.INFURA_PROJECT_ID +
                ":" +
                process.env.INFURA_PROJECT_SECRET
            ).toString("base64"),
        },
      });

      const fileBuffer = await encryptedFile.arrayBuffer();
      const result = await ipfs.add(Buffer.from(fileBuffer));
      return result.path;
    } catch (error) {
      console.error("IPFS upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setUploadStatus("Encrypting file...");
      const encryptedFile = await encryptFile(values.file, values.password);

      setUploadStatus("Uploading to IPFS...");
      const hash = await uploadToIPFS(encryptedFile);
      setIpfsHash(hash);

      setUploadStatus("Upload complete! IPFS Hash: " + hash);

      console.log("Form data:", values);
      console.log("IPFS Hash:", hash);
    } catch (error) {
      console.error("Error:", error);
      setUploadStatus("Error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, setFieldValue }) => (
          <Form className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                type="text"
                name="name"
                placeholder="Name to the Data..."
                className={`w-full bg-samBlack rounded-lg py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 
                  ${touched.name && errors.name ? "ring-1 ring-red-500" : ""}`}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Details Textarea */}
            <div className="relative">
              <div className="absolute left-4 top-4 pointer-events-none">
                <Type className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                as="textarea"
                name="details"
                placeholder="Details of Data..."
                rows={6}
                className={`w-full bg-samBlack rounded-lg py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                  ${
                    touched.details && errors.details
                      ? "ring-1 ring-red-500"
                      : ""
                  }`}
              />
              <ErrorMessage
                name="details"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Data Type Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Image className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                type="text"
                name="dataType"
                placeholder="Data Type..."
                className={`w-full bg-samBlack rounded-lg py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                  ${
                    touched.dataType && errors.dataType
                      ? "ring-1 ring-red-500"
                      : ""
                  }`}
              />
              <ErrorMessage
                name="dataType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                type="password"
                name="password"
                placeholder="Password..."
                className={`w-full bg-samBlack rounded-lg py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                  ${
                    touched.password && errors.password
                      ? "ring-1 ring-red-500"
                      : ""
                  }`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Price Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <Field
                type="number"
                name="price"
                placeholder="Price..."
                className={`w-full bg-samBlack rounded-lg py-3 pl-12 pr-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                  ${
                    touched.price && errors.price ? "ring-1 ring-red-500" : ""
                  }`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* File Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <File className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="file"
                onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }}
                accept=".zip"
                className="w-full bg-samBlack rounded-lg py-3 pl-12 pr-4 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <ErrorMessage
                name="file"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Upload Status */}
            {uploadStatus && (
              <div className="text-gray-300 text-sm">{uploadStatus}</div>
            )}

            {/* IPFS Hash */}
            {ipfsHash && (
              <div className="bg-samBlack p-4 rounded-lg">
                <p className="text-gray-300 text-sm break-all">
                  IPFS Hash: {ipfsHash}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Uploading..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DataForm;
