import { Suspense, useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import CalendarPage from "./components/calendar/CalendarPage";
import GeneratorPage from "./components/generator/GeneratorPage";
import ApprovalsPage from "./components/approvals/ApprovalsPage";
import AnalyticsPage from "./components/analytics/AnalyticsPage";
import SettingsPage from "./components/settings/SettingsPage";
import HelpPage from "./components/help/HelpPage";
import AssetLibraryPage from "./components/assets/AssetLibraryPage";
import routes from "tempo-routes";

function App() {
  // Set default theme on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const theme = savedTheme ? JSON.parse(savedTheme) : "dark";
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="bg-background min-h-screen">
        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/generator" element={<GeneratorPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/assets" element={<AssetLibraryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Add this before any catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<></>} />
          )}

          {/* Catch-all route for Netlify SPA support */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
