const connection = require("../db/db");

const getUser = async function (req, res) {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(401).json("Invalid Request");
    }
    connection.query(
      `SELECT * FROM accounts WHERE googleId = '${userId}'`,
      function (err, data) {
        if (err) return res.status(401).json({ error: "Invalid request" });
        if (data.length) {
          return res
            .status(200)
            .json({ success: true, message: "User retrieved", data: data });
        }
        return res.status(401).json({ error: "User not found" });
      }
    );
  } catch (err) {
    return res.status(401).json(err);
  }
};
const getUserByShareId = async function (req, res) {
  try {
    const { shareId } = req.query;
    if (!shareId) {
      return res.status(401).json("Invalid Request");
    }
    connection.query(
      `SELECT * FROM accounts WHERE shareId = '${shareId}'`,
      function (err, data) {
        if (err) return res.status(401).json({ error: "Invalid request" });
        if (data.length) {
          return res
            .status(200)
            .json({ success: true, message: "User retrieved", data: data });
        }
        return res.status(401).json({ error: "User not found" });
      }
    );
  } catch (err) {
    return res.status(401).json(err);
  }
};

const updateUser = async function (req, res) {
  try {
    const { userId } = req.query;

    let { name, links, profilepic } = req.body;

    if (!userId || !req.body) {
      return res
        .status(401)
        .json({ success: "false", message: "Invalid Request" });
    }

    connection.query(
      `SELECT * FROM accounts WHERE googleID = '${userId}'`,
      function (err, data) {
        if (err) return res.status(401).json({ error: "Invalid ID" });

        if (data.length) {
          if (links.length > 5)
            return res.status(400).json({ message: "Maximum amount exceeded" });
          connection.query(
            `UPDATE accounts SET name = ?, profilepic=?, links = ? WHERE googleID = '${userId}'`,
            [name, profilepic, JSON.stringify(links)],
            (err) => {
              if (err) {
                return res
                  .status(400)
                  .json({ message: "Error adding link", err });
              }
              return res.status(200).json({
                success: true,
                message: "Link created",
                result: links,
              });
            }
          );
        } else {
          return res.status(401).json({ message: "User not found" });
        }
      }
    );
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getUser, updateUser,getUserByShareId };
