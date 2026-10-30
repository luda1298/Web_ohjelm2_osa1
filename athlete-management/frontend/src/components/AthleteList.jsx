import { useContext, useEffect, useState } from "react";
import AthleteContext from "../context/AthleteContext";
import AthleteCard from "./AthleteCard";
import { Link } from "react-router-dom";

export default function AthleteList() {
  const { athletes, getAthletes } = useContext(AthleteContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAthletes() {
      try {
        await getAthletes();
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load athletes");
      } finally {
        setLoading(false);
      }
    }

    loadAthletes();
  }, []);

  if (loading) {
    return <p>Loading athletes...</p>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h1 className="fw-bold mb-1">Athlete Directory</h1>
          <p className="text-secondary mb-0">
            Explore and manage athlete profiles
          </p>
        </div>

        <Link to="/athletes/add" className="btn btn-primary">
          + Add Athlete
        </Link>
      </div>
      {athletes.length === 0 ? (
        <p>No athletes found. Add your first athlete!</p>
      ) : (
        <div className="row g-4">
          {athletes.map((athlete) => (
            <div className="col-12 col-md-6 col-lg-4" key={athlete.id}>
              <AthleteCard athlete={athlete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
