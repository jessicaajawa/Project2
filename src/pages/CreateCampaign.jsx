//create campaign page where connected users can launch a new fundraiser

import { useState } from "react";
import { getContract } from "../utils/contract";
import { ethers } from "ethers";

export default function CreateCampaign() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (loading) return;

      if (!title || !description || !goal) {
        alert("Please fill all fields");
        return;
      }

      const goalValue = Number(goal);

      if (isNaN(goalValue) || goalValue <= 0) {
        alert("Enter a valid goal like 0.1");
        return;
      }

      const contract = await getContract();
      if (!contract) {
        alert("Contract not found");
        return;
      }

      setLoading(true);

      const tx = await contract.createCampaign(
        title,
        description,
        ethers.parseEther(goalValue.toString())
      );

      await tx.wait();

      alert("Campaign created successfully!");

      setTitle("");
      setDescription("");
      setGoal("");
    } catch (err) {
      console.log("CREATE ERROR:", err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <section className="form-shell">
        <div className="card form-card">
          <span className="kicker">Launch</span>

          <h1 style={{ fontSize: "2.5rem" }}>Create a Campaign</h1>

          <p className="muted">
            Set a campaign title, explain your goal, and choose a fundraising target.
            Your connected wallet becomes the campaign creator.
          </p>

          <label className="label">Campaign Title</label>
          <input
            className="input"
            placeholder="Example: Help fund my student project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="label">Description</label>
          <input
            className="input"
            placeholder="Briefly explain what this campaign supports"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label className="label">Goal Amount in BNB</label>
          <input
            className="input"
            placeholder="0.1"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <button
            className="button"
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", marginTop: "1.5rem" }}
          >
            {loading ? "Creating Campaign..." : "Create Campaign"}
          </button>

          <p className="muted" style={{ fontSize: "0.9rem", marginTop: "1rem" }}>
            You will sign this transaction in MetaMask. No real BNB is needed on testnet.
          </p>
        </div>
      </section>
    </main>
  );
}