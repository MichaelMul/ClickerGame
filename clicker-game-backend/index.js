require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Get user data
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "User not found" });
  }
});

// Update score
app.post('/user/:id/score', async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { score },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating score" });
  }
});

// Upgrade multiplier
app.post('/user/:id/multiplier', async (req, res) => {
  const { id } = req.params;
  const { multiplier } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { multiplier },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error upgrading multiplier" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
