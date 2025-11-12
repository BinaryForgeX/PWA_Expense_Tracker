import { Routes, Route } from "react-router-dom"
import DashboardLayout from "@/layout/DashboardLayout"
import { AddExpensePage, Analysis, Daily, Home, Monthly, Settings } from "@/pages"

const App = () => (
  <DashboardLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddExpensePage />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/monthly" element={<Monthly />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </DashboardLayout>
)

export default App
