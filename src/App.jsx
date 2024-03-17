import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "./App.css"
import Index from './Index'
import Molecule from './components/Molecule'
import { rt } from './global'
import Mass from './components/Mass'



const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={`${rt}/`} element={<Index />} />
      <Route path={`${rt}/molecule/`} element={<Molecule />} />
      <Route path={`${rt}/mass/`} element={<Mass />} />
    </Routes>
  </BrowserRouter>
)


export default App
