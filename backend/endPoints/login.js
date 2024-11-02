const UserModel = require("../schema/userSchema");
const CustomErr = require("../errHandleMiddleware/customErr");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomErr("Please provide both email and password", 400));
  }

  try {
    const userAvail = await UserModel.findOne({ email });

    if (!userAvail) {
      res.status(404).json({ message: "User is not found !", success: false });
    }

    const passMatching = await bcrypt.compare(password, userAvail.password);

    if (!passMatching) {
      res.status(401).json({ message: "Something went wrong !" });
    } else {
      var token = jwt.sign({ payload: userAvail._id , email : userAvail.email, mobile : userAvail.mobile}, process.env.SECREATKEY, {
        expiresIn: "1d",
      });
      // console.log(jwt.verify(token, process.env.SECREATKEY));
      
      return res
        .cookie("token", token, {
          maxAge: 1 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: false, // Set to true if using HTTPS
          sameSite: "None", // Set to "None" to allow cross-origin cookie
        })
        .status(200)
        .json({
          message: "Login Successful",
          data: userAvail,
          urToken: token,
          success: true,
        });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = login;
