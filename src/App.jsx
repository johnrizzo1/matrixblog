import { Outlet } from 'react-router-dom'
import SpinWheel from './components/SpinWheel'
import MainHeader from './components/MainHeader'
import MatrixRain from './components/MatrixRain'
import ScratchMask from './components/ScratchMask'
import './index.css'

function App() {
  return (
    <div className="app-container" style={{
      minHeight: '100vh',
      overflowX: 'hidden',
      color: 'var(--text-primary)',
      position: 'relative' // Ensure z-index works for children
    }}>
      <MatrixRain />
      <ScratchMask />
      <MainHeader />
      <SpinWheel />
      <Outlet />
    </div>
  )
}

export default App
