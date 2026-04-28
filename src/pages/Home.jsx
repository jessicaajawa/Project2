//home page introducing TrustFund and guiding users to explore or create campaigns

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div>
          <span className="kicker">Decentralized fundraising</span>

          <h1 className="hero-title">
            Fund ideas with <span className="gradient-text">on-chain transparency.</span>
          </h1>

          <p className="hero-subtitle">
            TrustFund helps creators launch fundraising campaigns and lets supporters
            donate testBNB directly through a smart contract. Every campaign, donation,
            and withdrawal is visible through blockchain activity.
          </p>

          <div className="hero-actions">
            <Link to="/explore">
              <button className="button">Explore Campaigns</button>
            </Link>

            <Link to="/create">
              <button className="button secondary">Start a Campaign</button>
            </Link>
          </div>
        </div>

        <div className="card">
          <span className="badge">Live Web3 Demo</span>
          <h2 style={{ marginTop: "1rem" }}>How it works</h2>

          <div className="stat-grid" style={{ gridTemplateColumns: "1fr" }}>
            <Step number="01" title="Connect wallet" text="Users connect MetaMask on BNB Testnet." />
            <Step number="02" title="Create or donate" text="Campaigns and donations are sent as signed transactions." />
            <Step number="03" title="Withdraw funds" text="Only the campaign creator can withdraw campaign funds." />
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <Feature icon="🔐" title="Smart Contract Controlled" text="Funds are handled by Solidity logic instead of a centralized company." />
        <Feature icon="📊" title="Transparent Activity" text="Raised amounts, donor counts, and campaign data are read from the blockchain." />
        <Feature icon="⚡" title="Simple User Flow" text="Create, explore, donate, and withdraw with clear wallet-based actions." />
      </section>
    </main>
  );
}

function Step({ number, title, text }) {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <strong className="gradient-text">{number}</strong>
      <div>
        <h3>{title}</h3>
        <p className="muted">{text}</p>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="card">
      <h2>{icon}</h2>
      <h3>{title}</h3>
      <p className="muted">{text}</p>
    </div>
  );
}