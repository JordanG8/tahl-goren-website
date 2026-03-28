import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Process from './pages/Process'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Testimonials from './pages/Testimonials'
import Social from './pages/Social'
import Articles from './pages/Articles'
import Videos from './pages/Videos'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/process" element={<Process />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/social" element={<Social />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/videos" element={<Videos />} />
      </Route>
    </Routes>
  )
}
