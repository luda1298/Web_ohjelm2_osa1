import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AthleteContext from "../context/AthleteContext";

export default function AddAthlete() {
  const navigate = useNavigate();
  const { addAthlete } = useContext(AthleteContext);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nickname: "",
    birth_date: "",
    weight: "",
    image_url: "",
    sport: "",
    achievements: "",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    const newAthlete = {
      ...formData,
      weight: formData.weight === "" ? null : Number(formData.weight),
      nickname: formData.nickname || null,
      image_url: formData.image_url || null,
      achievements: formData.achievements || null,
    };

    try {
      await addAthlete(newAthlete);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add athlete");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card shadow-sm mb-4 mx-auto" style={{ maxWidth: "760px" }}>
      <div className="card-header">
        <h2>Add Athlete</h2>
      </div>

      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {[
            ["first_name", "First Name", "text"],
            ["last_name", "Last Name", "text"],
            ["nickname", "Nickname", "text"],
            ["birth_date", "Date of Birth", "date"],
            ["weight", "Weight (kg)", "number"],
            ["image_url", "Image URL", "url"],
            ["sport", "Sport", "text"],
          ].map(([name, label, type]) => (
            <div className="mb-3" key={name}>
              <label htmlFor={name} className="form-label">
                {label}
              </label>

              <input
                id={name}
                name={name}
                type={type}
                className="form-control"
                value={formData[name]}
                onChange={handleChange}
                required={[
                  "first_name",
                  "last_name",
                  "birth_date",
                  "sport",
                ].includes(name)}
                step={name === "weight" ? "0.01" : undefined}
                min={name === "weight" ? "0" : undefined}
                max={name === "weight" ? "999.99" : undefined}
              />
            </div>
          ))}

          <div className="mb-3">
            <label htmlFor="achievements" className="form-label">
              Achievements
            </label>

            <textarea
              id="achievements"
              name="achievements"
              className="form-control"
              rows="3"
              value={formData.achievements}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : "Add Athlete"}
          </button>
        </form>
      </div>
    </div>
  );
}
