export function Footer() {
  return (
    <footer className="site-footer">
      <div className="kola-container footer-inner">
        <div>
          <strong>The Grace Network</strong>
          <p>Private working days with Emily Grace.</p>
        </div>
        <div>
          <p>Lake Country · Kelowna, BC</p>
          <a href="mailto:hello@thegracenetwork.ai">hello@thegracenetwork.ai</a>
        </div>
        <div>© {new Date().getFullYear()} The Grace Network</div>
      </div>
    </footer>
  );
}
