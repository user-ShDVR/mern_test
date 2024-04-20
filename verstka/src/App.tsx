import { Routes, Route } from "react-router-dom"
import "./App.css"
import HeaderComponent from "./components/header/header"
import MainPage from "./pages/main/mainPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="about" element={<About />} />*/}
    </Routes>
  )
}

export default App
