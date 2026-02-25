import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="font-display text-2xl font-semibold tracking-wider text-gold-gradient">
              <span className="font-seraphine">Embrace</span>{' '}
              <span className="font-petit-formal">Jewelry</span>
            </span>
            <p className="mt-4 font-body text-sm font-light leading-relaxed text-muted-foreground">
              Precision gold refining and bespoke jewelry casting, where craftsmanship meets innovation.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium text-foreground">Navigation</h4>
            <div className="mt-4 flex flex-col gap-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="font-body text-sm font-light text-muted-foreground transition-colors hover:text-primary"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-lg font-medium text-foreground">Contact</h4>
            <div className="mt-4 flex flex-col gap-2 font-body text-sm font-light text-muted-foreground">
              <p>info@embracejewelry.com</p>
              <p>+1 (555) gold-999</p>
              <p>Beverly Hills, CA 90210</p>
            </div>
          </div>
        </div>
        <div className="divider-gold mt-12" />
        <p className="mt-6 text-center font-body text-xs font-light text-muted-foreground">
          © 2026 Embrace Jewelry. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
