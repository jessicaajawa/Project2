//About page explaining the purpose and limitations of TrustFund
//I have used the help of chatgpt and claude to help me with fronend as allowed in class. I also used it to learn a lot of what I have coded. I used it to help me understand a lot of what we learnt in class. 

export default function About() {
  return (
    <main className="page">
      <section style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 2.5rem" }}>
        <span className="kicker">About the project</span>

        <h1 className="hero-title" style={{ fontSize: "4rem" }}>
          Fundraising without the black box.
        </h1>

        <p className="hero-subtitle" style={{ margin: "1.25rem auto" }}>
          TrustFund is a full-stack decentralized application that uses a Solidity
          smart contract as the backend. Users create campaigns, donate testBNB,
          and withdraw campaign funds through wallet-signed transactions.
        </p>
      </section>

      <section className="about-grid">
        <Info title="🧱 Decentralized Backend" text="Campaign data and funds are handled by the smart contract instead of a traditional server database." />
        <Info title="👛 Wallet Authentication" text="MetaMask is used to connect users and sign create, donate, and withdraw transactions." />
        <Info title="🔎 Transparent Reads" text="The frontend reads campaign counts, campaign details, raised amounts, goals, and donor counts directly from the contract." />
        <Info title="⚠️ Important Limitation" text="Transparency does not automatically prove trust. Wallet addresses can be created by anyone and do not always identify real-world people." />
      </section>

      <section className="card" style={{ marginTop: "1.5rem" }}>
        <h2>Why this design?</h2>
        <p className="muted">
          The frontend is built with React, React Router, hooks, reusable components,
          and ethers.js. The smart contract is intentionally simple and readable so it
          behaves like a student-built decentralized backend while still supporting the
          core actions required by the application.
        </p>
      </section>
    </main>
  );
}

function Info({ title, text }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p className="muted">{text}</p>
    </div>
  );
}