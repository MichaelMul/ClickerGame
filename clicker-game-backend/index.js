require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Get user data
app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
  res.json(user);
});

// Update score
app.post('/user/:id/score', async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { score },
  });
  res.json(updatedUser);
});

// Upgrade multiplier
app.post('/user/:id/multiplier', async (req, res) => {
  const { id } = req.params;
  const { multiplier } = req.body;
  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { multiplier },
  });
  res.json(updatedUser);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
