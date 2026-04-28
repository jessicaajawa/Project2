//explore page showing all campaigns stored in the smart contract

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContract } from "../utils/contract";
import CampaignCard from "../components/CampaignCard";

export default function Explore() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const countRaw = await contract.getCampaignCount();
      const count = Number(countRaw);

      const items = [];

      for (let i = 0; i < count; i++) {
        const c = await contract.getCampaign(i);

        items.push({
          id: i,
          creator: c.creator,
          title: c.title,
          description: c.description,
          goal: c.goal,
          amountRaised: c.amountRaised,
          donorCount: c.donorCount,
          withdrawn: c.withdrawn
        });
      }

      setCampaigns(items);
    } catch (err) {
      console.log("EXPLORE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="section-head">
        <div>
          <span className="kicker">Discover</span>
          <h1>Explore Campaigns</h1>
          <p className="muted">
            Browse active fundraising campaigns and inspect their on-chain progress.
          </p>
        </div>

        <Link to="/create">
          <button className="button">Create Campaign</button>
        </Link>
      </div>

      {loading ? (
        <div className="card empty">
          <h2>Loading campaigns...</h2>
          <p className="muted">Reading campaign data from the smart contract.</p>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="card empty">
          <h2>No campaigns yet</h2>
          <p className="muted">Be the first person to launch a campaign on TrustFund.</p>
          <Link to="/create">
            <button className="button">Start the first campaign</button>
          </Link>
        </div>
      ) : (
        <div className="campaign-grid">
          {campaigns.map((c) => (
            <CampaignCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </main>
  );
}