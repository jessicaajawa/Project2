
//shows navigation links and handles wallet connection status

import { Link } from "react-router-dom";
import useWallet from "../hooks/useWallet";

export default function Navbar() {
  //get wallet address and connect function from custom hook
  const { account, connectWallet } = useWallet();

  return (
    <nav className="nav">
      {/* App logo / home link */}
      <Link to="/" className="brand">
        <span className="logo">T</span>
        <span>TrustFund</span>
      </Link>

      {/* Navigation links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        <Link to="/create">Create</Link>
        <Link to="/about">About</Link>
      </div>

      {/* if wallet is connected, show shortened address. Otherwise show connect button */}
      {account ? (
        <span className="wallet-pill">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      ) : (
        <button className="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </nav>
  );
}