import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enDashboard from "./locales/en/dashboard.json";
import enCustomers from "./locales/en/customers.json";
import enServices from "./locales/en/services.json";
import enAppointments from "./locales/en/appointments.json";
import enInvoices from "./locales/en/invoices.json";
import enSettings from "./locales/en/settings.json";

import viCommon from "./locales/vi/common.json";
import viAuth from "./locales/vi/auth.json";
import viDashboard from "./locales/vi/dashboard.json";
import viCustomers from "./locales/vi/customers.json";
import viServices from "./locales/vi/services.json";
import viAppointments from "./locales/vi/appointments.json";
import viInvoices from "./locales/vi/invoices.json";
import viSettings from "./locales/vi/settings.json";

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    dashboard: enDashboard,
    customers: enCustomers,
    services: enServices,
    appointments: enAppointments,
    invoices: enInvoices,
    settings: enSettings,
  },
  vi: {
    common: viCommon,
    auth: viAuth,
    dashboard: viDashboard,
    customers: viCustomers,
    services: viServices,
    appointments: viAppointments,
    invoices: viInvoices,
    settings: viSettings,
  },
};

const savedLanguage =
  typeof window !== "undefined" ? localStorage.getItem("spa-language") || "en" : "en";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "auth", "dashboard", "customers", "services", "appointments", "invoices", "settings"],
    interpolation: { escapeValue: false },
  });
}

export default i18n;
