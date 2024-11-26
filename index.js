const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());

// database connection
(async () => {
  db = await open({
    filename: '../foodiefinds-backend/database.sqlite',
    driver: sqlite3.Database,
  });
})();

app.get('/', (req, res) => {
  res.send('Welcome to FoodieFinds');
});

// API ENDPOINT 1
// http://localhost:3000/restaurants

app.get('/restaurants', async (req, res) => {
  try {
    let query = 'SELECT * FROM restaurants';
    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No restaurants found.',
      });
    } else {
      res.status(200).json({
        restaurants: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT2
// http://localhost:3000/restaurants/details/1

app.get('/restaurants/details/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let query = 'SELECT * FROM restaurants WHERE id = ?';
    let response = await db.all(query, [id]);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No restaurants found.',
      });
    } else {
      res.status(200).json({
        restaurants: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT 3
// http://localhost:3000/restaurants/cuisine/Indian

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  const { cuisine } = req.params;

  try {
    let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
    let response = await db.all(query, [cuisine]);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No restaurants found.',
      });
    } else {
      res.status(200).json({
        restaurants: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT 4
// http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false

app.get('/restaurants/filter', async (req, res) => {
  const { isVeg, hasOutdoorSeating, isLuxury } = req.query;

  try {
    let query = `
    SELECT * FROM restaurants
    WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?`;

    let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No restaurants found.',
      });
    } else {
      res.status(200).json({
        restaurants: response,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT 5
// http://localhost:3000/restaurants/sort-by-rating

app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let query = `
    SELECT * FROM restaurants
    ORDER BY rating DESC`;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No restaurants found.',
      });
    } else {
      res.status(200).json({
        restaurants: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT 6
// http://localhost:3000/dishes

app.get('/dishes', async (req, res) => {
  try {
    let query = `
    SELECT * FROM dishes`;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No dishes found.',
      });
    } else {
      res.status(200).json({
        dishes: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT 7
// http://localhost:3000/dishes/details/1

app.get('/dishes/details/:id', async (req, res) => {
  const { id } = req.params;

  try {
    let query = ` SELECT * FROM dishes WHERE id = ? `;

    let response = await db.all(query, [id]);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No dishes found.',
      });
    } else {
      res.status(200).json({
        dishes: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT 8
// http://localhost:3000/dishes/filter?isVeg=true

app.get('/dishes/filter', async (req, res) => {
  const { isVeg } = req.query;

  try {
    let query = ` SELECT * FROM dishes WHERE isVeg = ? `;

    let response = await db.all(query, [isVeg]);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No dishes found.',
      });
    } else {
      res.status(200).json({
        dishes: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

// API ENDPOINT 9
// http://localhost:3000/dishes/sort-by-price

app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let query = ` SELECT * FROM dishes ORDER BY price DESC `;

    let response = await db.all(query, []);

    if (response.length === 0) {
      res.status(404).json({
        message: ' No dishes found.',
      });
    } else {
      res.status(200).json({
        dishes: response,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
