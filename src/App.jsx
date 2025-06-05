import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="text-center mt-10">
            <h1 className="text-3xl font-bold text-blue-600">Qtec Accounting Frontend</h1>
            <p className="mt-2 text-gray-600">Vite + React + Tailwind working perfectly ✅</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
