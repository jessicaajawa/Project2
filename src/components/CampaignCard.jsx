//campaignCard component
//displays a single campaign's summary information including title, description,funding progress, and a link to view full campaign details.

import { Link } from "react-router-dom";
import { ethers } from "ethers";

export default function CampaignCard({ c }) {
  //converting goal and amountRaised 
  //if values are missing, default to "0" to prevent crashes
  const goal = c.goal ? ethers.formatEther(c.goal) : "0";
  const raised = c.amountRaised ? ethers.formatEther(c.amountRaised) : "0";

  //converting strings to numbers for calculations
  const goalNum = Number(goal);
  const raisedNum = Number(raised);

  //calculate percentage of goal reached (used for progress bar)
  //ensures it never exceeds 100%
  const percent = goalNum > 0 ? Math.min((raisedNum / goalNum) * 100, 100) : 0;

  return (
    <div className="card">
      {/* Display campaign ID */}
      <span className="badge">Campaign #{c.id}</span>

      {/* Campaign title */}
      <h2 style={{ marginTop: "1rem" }}>
        {c.title || "Untitled Campaign"}
      </h2>

      {/* Campaign description */}
      <p className="muted">
        {c.description || "No description provided."}
      </p>

      {/* Progress bar showing funding progress */}
      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Display amount raised vs goal */}
      <p>
        <strong>{raisedNum.toFixed(4)} BNB</strong>
        <span className="muted"> raised of {goalNum} BNB</span>
      </p>

      {/* Link to detailed campaign page */}
      <Link to={`/campaign/${c.id}`}>
        <button
          className="button"
          style={{ width: "100%", marginTop: "0.75rem" }}
        >
          View Details
        </button>
      </Link>
    </div>
  );
}