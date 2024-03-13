import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Index from './Index'
import Molecule from './components/Molecule'
import { rt } from './global'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`${rt}/`} element={<Index />} />
      <Route path={`${rt}/molecule`} element={<Molecule />} />
    </Routes>
  </BrowserRouter>
)

export default App
