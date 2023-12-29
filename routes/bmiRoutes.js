const express = require("express");
const bmiCategory = require("@superkhau/bmi-category");
const router = express.Router();

router.post("/bmicalculator", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);
  const age = parseInt(req.body.age);
  const gender = req.body.gender;
  const weightUnit = req.body.weightUnit;
  const heightUnit = req.body.heightUnit;

  const weightInKg = weightUnit === "lbs" ? weight * 0.453592 : weight;
  const heightInM = heightUnit === "in" ? height * 0.0254 : height;

  if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
    res
      .status(400)
      .send("Invalid input. Please enter valid weight and height.");
    return;
  }
  const bmi = calculateBMI(weightInKg, heightInM);
  const category = bmiCategory.get(bmi);
  res.send({
    bmi: bmi.toFixed(2),
    category: category,
    message: interpretBMI(bmi, age, gender, category),
  });
});
function calculateBMI(weight, height) {
  return weight / Math.pow(height, 2);
}
function interpretBMI(bmi, age, gender, category) {
  if (bmi < 18.5 || category == "underweight") {
    return "Underweight. Please consult with a healthcare professional.";
  } else if (
    (bmi >= 18.5 && bmi < 24 && gender == "female") ||
    category == "normal"
  ) {
    return "Normal Weight. You have a normal BMI. Keep up the good work!";
  } else if (
    (bmi >= 18.5 && bmi < 25 && gender == "male") ||
    category == "normal"
  ) {
    return "Normal Weight. You have a normal BMI. Keep up the good work!";
  } else if (
    (bmi >= 24 && bmi < 30 && gender == "female") ||
    category == "overweight"
  ) {
    return "Overweight. Consider adopting a healthier lifestyle.";
  } else if (bmi >= 25 && bmi < 30 && gender == "male") {
    return "Overweight. Consider adopting a healthier lifestyle.";
  } else {
    return "Obese. Please seek medical advice.";
  }
}
module.exports = router;
