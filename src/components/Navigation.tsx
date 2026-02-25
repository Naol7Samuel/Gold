import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import LogoVideo from '../assets/Logo Video.mp4';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          {/* Logo (video + brand text) */}
          <Link to="/" className="flex items-center gap-2">
            <video
              src={LogoVideo}
              className="h-8 w-auto object-contain"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Embrace Jewelry logo"
            />
            <span className="text-xl font-bold font-seraphine leading-none">Embrace</span>
            <span className="text-xl font-bold font-petit-formal leading-none">Jewelry</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-body text-sm font-light uppercase tracking-[0.15em] transition-colors duration-300
                  ${location.pathname === item.path ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-glass absolute left-0 right-0 top-full md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-md px-4 py-3 font-body text-sm font-light uppercase tracking-[0.15em] transition-colors
                    ${location.pathname === item.path
                      ? 'bg-secondary text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
