import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AthleteContext from "../context/AthleteContext";

export default function AthleteCard({ athlete }) {
  const { deleteAthlete } = useContext(AthleteContext);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete ${athlete.first_name} ${athlete.last_name}?`,
    );

    if (!confirmed) return;

    setDeleting(true);
    setError("");

    try {
      await deleteAthlete(athlete.id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete athlete");
      setDeleting(false);
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      {athlete.image_url && (
        <img
          src={athlete.image_url}
          className="card-img-top"
          alt={`${athlete.first_name} ${athlete.last_name}`}
          style={{ height: "220px", objectFit: "cover" }}
        />
      )}

      <div className="card-body">
        <h5 className="card-title">
          {athlete.first_name} {athlete.last_name}
        </h5>

        <p className="card-text">
          <strong>Sport:</strong> {athlete.sport}
        </p>

        <button
          type="button"
          className="btn btn-outline-secondary btn-sm mb-3"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {showDetails && (
          <div className="mb-3">
            <p>
              <strong>Nickname:</strong> {athlete.nickname || "—"}
            </p>
            <p>
              <strong>Birth date:</strong> {athlete.birth_date}
            </p>
            <p>
              <strong>Weight:</strong>{" "}
              {athlete.weight == null ? "—" : `${athlete.weight} kg`}
            </p>
            <p>
              <strong>Achievements:</strong> {athlete.achievements || "—"}
            </p>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="d-flex gap-2">
          <Link
            to={`/athletes/edit/${athlete.id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>

          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
