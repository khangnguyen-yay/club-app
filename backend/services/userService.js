import db from '../config/db.js';

export const getUserByUsername = async (username) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], (err, results) => {
            if (err) return reject(err);
            
            resolve(results[0] || null);
        });
    });
};

// export const addUser = async (username, password) => {
//     return new Promise((resolve, reject) => {
//         const query = 'INSERT INTO users';
//             db.query(query, [username], (err, results) => {
//                 if (err) return reject(err);
                
//                 resolve(results[0] || null);
//          });
//     });
// };

export const findOrCreateUser = (profile) => {
  const googleId = profile.id;
  const name = profile.displayName;
  const email = profile.emails?.[0]?.value;

  return new Promise((resolve, reject) => {

    //check if user already exists
    db.query(
      "SELECT * FROM users WHERE google_id = ?",
      [googleId]
    )
      .then(([rows]) => {
        if (rows.length > 0) {
          //already exists
          resolve(rows[0]);
        } else {
          //otherwise, create a new user
          return db.query(
            "INSERT INTO users (google_id, email, display_name) VALUES (?, ?, ?)",
            [googleId, name, email]
          );
        }
      })
      .then((result) => {
        //result is undefined, it means resolve already happened
        if (!result) return;

        const [insertResult] = result;

        resolve({
          id: insertResult.insertId,
          google_id: googleId,
          name,
          email
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

