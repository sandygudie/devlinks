const connection = require("../db/db");

const getUser = async function (req, res) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json("Invalid Request");
    }
    connection.query(
      `SELECT * FROM accounts WHERE googleId = '${userId}'`,
      function (err, data) {
        if (err) return res.status(400).json({ error: "Invalid request" });

        if (data.length) {
          return res
            .status(200)
            .json({ success: true, message: "User retrieved", data: data });
        }
        return res.status(401).json({ error: "User not found" });
      }
    );
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getUser };
// update user name, profilepic