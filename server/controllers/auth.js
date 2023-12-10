const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");
const pool = require("../db/db");
const { generateToken } = require("../middlewares/token");

const googleLogin = async function (req, res) {
  const { token } = req.body;

  client.setCredentials({ access_token: token });
  const userinfo = await client.request({
    url: "https://www.googleapis.com/oauth2/v3/userinfo",
  });
  const user = userinfo.data;
  try {
    pool.getConnection(function (err, connection) {
      connection.query(
        `SELECT * FROM accounts WHERE googleID = '${user.sub}'`,
        async function (err, userDetails) {
          if (!userDetails?.length) {
            connection.query(
              `INSERT INTO accounts
          (googleID,name,email,profilepic) 
          VALUES 
          ('${user.sub}','${user.name}','${user.email}','${user.picture}')`,
              async (err, data) => {
                if (err) return res.status(400).json({ error: err });
              }
            );
          }
          const { accessToken } = await generateToken(user);
          connection.query(
            `UPDATE accounts SET accessToken = ? WHERE googleID = '${user.sub}'`,
            [accessToken],
            (err, updated) => {
              if (updated) {
                return res.status(200).json({
                  success: true,
                  message: "login successfully",
                  userID: user.sub,
                  accessToken: accessToken,
                });
              }
            }
          );
        }
      );
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

module.exports = { googleLogin };
