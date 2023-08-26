const connection = require("../db/db");

const addLink = async function (req, res) {
  try {
    const { userId } = req.query;

    let { name, links ,profilepic} = req.body;

    if (!userId || !req.body ) {
      return res
        .status(400)
        .json({ success: "false", message: "Invalid Request" });
    }

    connection.query(
      `SELECT * FROM accounts WHERE googleID = '${userId}'`,
      function (err, data) {
        if (err) return res.status(400).json({ error: "Invalid ID" });

        if (data.length) {
          if (links.length > 5)
            return res.status(400).json({ message: "Maximum amount exceeded" });
          connection.query(
            `UPDATE accounts SET name = ?, profilepic=?, links = ? WHERE googleID = '${userId}'`,
            [name,profilepic,JSON.stringify(links)],
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

module.exports = { addLink };
