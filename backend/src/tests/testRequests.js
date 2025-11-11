import axios from 'axios';
import fs from 'fs';

// Load test data
const clubs = JSON.parse(fs.readFileSync('./src/tests/clubs.test.json', 'utf-8'));
const BASE_URL = 'http://localhost:4000/api/clubs'; // change port if needed

// --- Test 1: Fetch all clubs ---
async function testGetClubs() {
  try {
    const response = await axios.get(BASE_URL);
    console.log('✅ GET /api/clubs response:', response.data);
  } catch (error) {
    console.error('❌ GET /api/clubs failed:', error.message);
  }
}

// --- Test 2: Insert test clubs ---
// async function testAddClubs() {
//   for (const club of clubs) {
//     try {
//       const response = await axios.post(BASE_URL, club);
//       console.log(`✅ Added club: ${club.name}`, response.data);
//     } catch (error) {
//       console.error(`❌ Failed to add club ${club.name}:`, error.message);
//     }
//   }
// }

// --- Run tests sequentially ---
(async () => {
  console.log('🧪 Starting backend tests...\n');
  //await testAddClubs();
  await testGetClubs();
})();
