const User = require('../models/User.js');

async function registerUser(body) {
  const user = new User();
  user.name = body.name;
  user.email = body.email;
  user.setPassword(body.password);

  const existingUser = await User.findOne({email: user.email});
  if (existingUser) {
    throw {message: `User ${user.email} already exists`}
  }

  try {
    await user.save();
    let token;
    token = user.generateJwt();
    return {token};
  } catch (error) {
    throw {message: 'smth went wrong!'}
  }
}

module.exports = {
  registerUser
};
