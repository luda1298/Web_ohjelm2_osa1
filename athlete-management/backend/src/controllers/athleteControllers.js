const Athlete = require("../models/Athlete");

function validateAthlete(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Athlete data is required";
  }

  const requiredFields = ["first_name", "last_name", "sport"];

  for (const field of requiredFields) {
    if (typeof data[field] !== "string" || data[field].trim() === "") {
      return `${field} is required`;
    }
  }

  if (
    typeof data.birth_date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.birth_date)
  ) {
    return "Birth date must be in YYYY-MM-DD format";
  }

  const [year, month, day] = data.birth_date.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return "Invalid birth date";
  }

  if (data.weight !== undefined && data.weight !== null && data.weight !== "") {
    const weight = Number(data.weight);

    if (!Number.isFinite(weight) || weight < 0 || weight > 999.99) {
      return "Weight must be between 0 and 999.99";
    }
  }

  if (data.image_url != null && data.image_url !== "") {
    if (typeof data.image_url !== "string") {
      return "Image URL must be a string";
    }

    try {
      const url = new URL(data.image_url);

      if (!["http:", "https:"].includes(url.protocol)) {
        return "Image URL must use HTTP or HTTPS";
      }
    } catch {
      return "Invalid image URL";
    }
  }

  return null;
}

exports.getAllAthletes = async (req, res, next) => {
  try {
    const [athletes] = await Athlete.findAll();

    res.status(200).json({
      count: athletes.length,
      athletes: athletes,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAthleteById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid athlete ID",
      });
    }

    const [athletes] = await Athlete.findById(id);

    if (athletes.length === 0) {
      return res.status(404).json({
        message: "Athlete not found",
      });
    }

    res.status(200).json({
      athlete: athletes[0],
    });
  } catch (error) {
    next(error);
  }
};

exports.createAthlete = async (req, res, next) => {
  try {
    const data = req.body;

    const validationError = validateAthlete(data);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const athlete = new Athlete(data);

    const [result] = await athlete.save();

    res.status(201).json({
      message: "Athlete created successfully",
      id: result.insertId,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAthlete = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid athlete ID",
      });
    }

    const validationError = validateAthlete(req.body);

    if (validationError) {
      return res.status(400).json({
        message: validationError,
      });
    }

    const athlete = new Athlete(req.body);

    const [result] = await athlete.update(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Athlete not found",
      });
    }

    res.status(200).json({
      message: "Athlete updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAthlete = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "Invalid athlete ID",
      });
    }

    const [result] = await Athlete.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Athlete not found",
      });
    }

    res.status(200).json({
      message: "Athlete deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
