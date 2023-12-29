## BMI Calculator by Artem Popov | SE-2205

1. npm init -y
2. npm install express body-parser path @superkhau/bmi-category
3. 1. the body-parser package parse incoming request bodies in a middleware before your handlers, available under the req.body property.
   2. the node:path module provides utilities for working with file and directory paths
   3. the bmi-category package is used to categorize the BMI result into different categories (Underweight, Normal, Overweight, Obese).
4. node root.js
5. go to the http://localhost:3000 and test
