const connection = require("../db/db");

const register = async function (req, res) {
  let { username, password, email } = req.body;
  if (!req.body || !username || !password || !email) {
    return res.status(400).json("Please enter the required information!");
  }

  connection.query(
    `SELECT * FROM accounts WHERE email = '${email}'`,
    function (err, data) {
      if (err) return res.status(400).json("Error getting user");
      if (data.length) {
        return res.status(400).json("user alreay exist");
      } else {
        connection.query(
          `INSERT INTO accounts
			(username, password, email) 
			VALUES 
			('${username}', '${password}', '${email}')`,
          (err) => {
            if (err) {
              return res.status(400).json("Error creating user");
            }
            return res.status(200).json({ status: "New user created" });
          }
        );
      }
    }
  );
};

const loginUser = async function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results) {
        if (error) return res.status(400).json({ error: error });
  
        if (results.length > 0) {
          // Authenticate the user

          req.loggedin = true;
          req.username = username;
          return res.status(200).json({ status: "login sucessful" });
        } else {
          return res
            .status(400)
            .json({ status: "Incorrect Username and/or Password!" });
        }
      }
    );
  } else {
    return res
      .status(200)
      .json({ status: "Please enter Username and Password!" });
  }
};

module.exports = { register, loginUser };
