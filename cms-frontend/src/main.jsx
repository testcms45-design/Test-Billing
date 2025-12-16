import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Page from "./addClient/page"
import Navbar from "./components/Navbar";
import UpdateInfos from "./updateInfos/update";
import SearchPage from "./components/SearchPage";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import BillingTable from "./billingPage/page";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

// 🔥 Enregistre TOUTES les fonctionnalités gratuites
ModuleRegistry.registerModules([AllCommunityModule]);


function Root() {
  const search = useSelector((state) => state.cart.search);

  return (
    <>
    
      <Navbar />

      {search ? (
        <SearchPage />
      ) : (
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/page" element={<Page />} />
          <Route path="/update/:id" element={<UpdateInfos />} />
          <Route path="/billing" element={<BillingTable />} />
        </Routes>
      )}
      <Footer/>
    </>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
     <Root />
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
