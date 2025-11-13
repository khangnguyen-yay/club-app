import { getUserByUsername, addUser } from '../services/userService.js';

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  } 

  try {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const userId = await addUser(username, password);
    res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
  };