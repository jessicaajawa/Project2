//campaign details page where users can view, donate, and withdraw funds

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContract } from "../utils/contract";
import { ethers } from "ethers";

export default function CampaignDetails() {
  const { id } = useParams();

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCampaign();
  }, []);

  const loadCampaign = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const data = await contract.getCampaign(id);

      setCampaign({
        creator: data.creator,
        title: data.title,
        description: data.description,
        goal: data.goal,
        amountRaised: data.amountRaised,
        donorCount: data.donorCount,
        withdrawn: data.withdrawn
      });
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  const donate = async () => {
    try {
      if (!amount || Number(amount) <= 0) {
        alert("Enter a valid donation amount");
        return;
      }

      const contract = await getContract();
      if (!contract) return;

      setLoading(true);

      const tx = await contract.donateToCampaign(id, {
        value: ethers.parseEther(amount)
      });

      await tx.wait();

      alert("Donation successful!");
      setAmount("");
      loadCampaign();
    } catch (err) {
      console.log("DONATE ERROR:", err);
      alert("Donation failed");
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      setLoading(true);

      const tx = await contract.withdrawFunds(id);

      await tx.wait();

      alert("Withdraw successful!");
      loadCampaign();
    } catch (err) {
      console.log("WITHDRAW ERROR:", err);
      alert("Withdraw failed. Only the creator can withdraw, and funds can only be withdrawn once.");
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) {
    return (
      <main className="page">
        <div className="card empty">
          <h2>Loading campaign...</h2>
          <p className="muted">Reading campaign details from the blockchain.</p>
        </div>
      </main>
    );
  }

  const goal = Number(ethers.formatEther(campaign.goal));
  const raised = Number(ethers.formatEther(campaign.amountRaised));
  const percent = goal > 0 ? Math.min((raised / goal) * 100, 100) : 0;

  return (
    <main className="page">
      <div className="detail-layout">
        <section className="card">
          <span className="badge">
            {campaign.withdrawn ? "Withdrawn" : "Active Campaign"}
          </span>

          <h1 style={{ fontSize: "2.8rem", marginTop: "1rem" }}>
            {campaign.title}
          </h1>

          <p className="muted">{campaign.description}</p>

          <div className="progress">
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>

          <p className="muted">
            {percent.toFixed(1)}% funded
          </p>

          <div className="stat-grid">
            <div>
              <p className="muted">Raised</p>
              <p className="big-number">{raised.toFixed(4)}</p>
              <p className="muted">BNB</p>
            </div>

            <div>
              <p className="muted">Goal</p>
              <p className="big-number">{goal}</p>
              <p className="muted">BNB</p>
            </div>

            <div>
              <p className="muted">Donors</p>
              <p className="big-number">{campaign.donorCount.toString()}</p>
              <p className="muted">supporters</p>
            </div>
          </div>
        </section>

        <aside className="card">
          <h2>Support this campaign</h2>

          <p className="muted">
            Enter a testBNB amount and confirm the donation through MetaMask.
          </p>

          <label className="label">Donation Amount</label>
          <input
            className="input"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            className="button green"
            onClick={donate}
            disabled={loading}
            style={{ width: "100%", marginTop: "1rem" }}
          >
            {loading ? "Processing..." : "Donate"}
          </button>

          <hr style={{ margin: "1.5rem 0", border: "none", borderTop: "1px solid #e2e8f0" }} />

          <h3>Creator controls</h3>

          <p className="muted">
            The smart contract only allows the campaign creator to withdraw funds.
          </p>

          <button
            className="button"
            onClick={withdraw}
            disabled={loading || campaign.withdrawn}
            style={{ width: "100%" }}
          >
            {campaign.withdrawn ? "Already Withdrawn" : "Withdraw Funds"}
          </button>

          <p className="muted" style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
            Creator: {campaign.creator.slice(0, 8)}...{campaign.creator.slice(-6)}
          </p>
        </aside>
      </div>
    </main>
  );
}