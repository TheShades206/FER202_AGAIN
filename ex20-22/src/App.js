import { BrowserRouter, Routes } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';
import { renderRoutes } from './routes';
import './App.css';

export function AppContent() {
  return (
    <>
      <NavigationMenu />
      <main className="container page-content">
        <Routes>{renderRoutes()}</Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </BrowserRouter>
  );
}
