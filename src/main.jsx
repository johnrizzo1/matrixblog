import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Dynamic Imports
const About = lazy(() => import('./views/About'));
const CV = lazy(() => import('./views/CV'));
const Projects = lazy(() => import('./views/Projects'));
const Blog = lazy(() => import('./views/Blog'));
const BlogPost = lazy(() => import('./views/BlogPost'));
const ProjectDetail = lazy(() => import('./views/ProjectDetail'));
const RabbitHole = lazy(() => import('./views/RabbitHole'));

// Loading Fallback
const Loading = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    color: 'var(--text-secondary)'
  }}>
    Loading...
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<div />} /> {/* Empty div for home, as content is in MainHeader/Wheel */}
            <Route path="about" element={<About />} />
            <Route path="cv" element={<CV />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
          </Route>
          {/* Hidden Route outside of App layout (no wheel/header) */}
          <Route path="/rabbit-hole" element={<Suspense fallback={null}><RabbitHole /></Suspense>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
