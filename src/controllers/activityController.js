const {success, error} = require('../helpers/response')

// Get all trades
exports.getAll = async (req, res) => {
  try {
    return success(res, "Nice", 200)
  } 
  catch (err) {
    console.log(err)
    return error(res, err, 500)
  }
};