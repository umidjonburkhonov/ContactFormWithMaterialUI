import React from "react";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from "./components/Header.jsx";
import { ContactsPage } from "./pages/ContactsPage.jsx";
import { AddContactPage } from "./pages/AddContactPage.jsx";
import { EditContactPage } from "./pages/EditContactPage.jsx";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<ContactsPage />} />
        <Route path="/add" element={<AddContactPage />} />
        <Route path="/edit/:id" element={<EditContactPage />} />
      </Routes>
    </>
  );
}
