import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AthleteContext from "../context/AthleteContext";

const emptyForm = {
  first_name: "",
  last_name: "",
  nickname: "",
  birth_date: "",
  weight: "",
  image_url: "",
  sport: "",
  achievements: "",
};

export default function UpdateAthlete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAthlete, updateAthlete } = useContext(AthleteContext);

  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadAthlete() {
      try {
        const athlete = await getAthlete(id);

        if (active) {
          setFormData({
            first_name: athlete.first_name ?? "",
            last_name: athlete.last_name ?? "",
            nickname: athlete.nickname ?? "",
            birth_date: athlete.birth_date?.slice(0, 10) ?? "",
            weight: athlete.weight ?? "",
            image_url: athlete.image_url ?? "",
            sport: athlete.sport ?? "",
            achievements: athlete.achievements ?? "",
          });
        }
      } catch (err) {
        if (active) {
          setError(err.response?.data?.message || "Failed to load athlete");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadAthlete();

    return () => {
      active = false;
    };
  }, [id]);

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

    const updatedAthlete = {
      ...formData,
      weight: formData.weight === "" ? null : Number(formData.weight),
      nickname: formData.nickname || null,
      image_url: formData.image_url || null,
      achievements: formData.achievements || null,
    };

    try {
      await updateAthlete(id, updatedAthlete);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update athlete");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading athlete...</p>;

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2>Update Athlete</h2>
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
              <label className="form-label" htmlFor={name}>
                {label}
              </label>

              <input
                className="form-control"
                id={name}
                name={name}
                type={type}
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
            <label className="form-label" htmlFor="achievements">
              Achievements
            </label>

            <textarea
              className="form-control"
              id="achievements"
              name="achievements"
              rows="3"
              value={formData.achievements}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
