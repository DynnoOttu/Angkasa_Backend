const { selectDataUsers, insertData, updateData, userIdModels, selectUserById } = require('./../models/users')

const data = {
  users: [{
    id: 1,
    name: 'michelle'
  },
  {
    id: 2,
    name: 'dynno'
  }
  ]
}

const UsersController = {
  getDetail: async (req, res, next) => {
    const id = req.params.id
    let foundUser = await selectDataUsers()

    // eslint-disable-next-line array-callback-return
    data.users.map(item => {
      if (item.id === id) {
        foundUser = item
      }
    })

    console.log(foundUser)

    if (foundUser) {
      res.status(200).json({ status: 200, message: `data user : ${foundUser.name}` })
    } else {
      res.status(400).json({ status: 400, message: 'data user not found' })
    }
  },
  // select data users
  getData: async (req, res, next) => {
    const showUser = await selectDataUsers()
    // console.log(showUser)
    if (showUser) {
      res.status(200).json({ status: 200, message: 'data found', data: showUser.rows })
    }
    res.status(400).json({ status: 400, message: 'data user not found' })
  },
  postData: async (req, res, next) => {
    const data = {}
    data.name = req.body.name
    data.email = req.body.email
    data.phone = req.body.phone
    data.password = req.body.password

    const result = await insertData(data)

    if (!result) {
      res.status(404).json({ status: 404, message: 'input data failed' })
    }

    res.status(200).json({ status: 200, message: 'input data success ' })
  },
  updateDataUser: async (req, res, next) => {
    let id = req.payload.id;


    try {
      let checking = await userIdModels(id);
      let current = checking.rows[0];

      let data = {};
      data.email = req.body.email || current.email;
      data.password = req.body.password || current.password;
      data.name = req.body.name || current.name;
      data.phone = req.body.phone || current.phone;
      data.address = req.body.address || current.address;
      data.city = req.body.city || current.city;
      data.country = req.body.country || current.country;
      data.postal_code = req.body.postal_code || current.postal_code;

      if (req.file) {
        const imageUrl = await cloudinary.uploader.upload(req.file.path, { folder: "angkasa" });
        data.photo = imageUrl.secure_url
      } else {
        data.photo = current.photo
      }


      if (checking.rows[0].id !== id) {
        res.status(404).json({
          message: "Failed to load user",
        });
      } else {
        await updateData(data, id);
        res.status(200).json({
          message: "User has been updated",
          data
        });
      }
    } catch (error) {
      res.status(401).json({
        message: "Failed to update user",
        error: error.message,
      });
    }
  },

  getUserByPayloadId: async (req, res) => {
    let id = req.payload.id;

    try {
      let result = await selectUserById(id);

      res.status(200).json({
        message: "User data foundr",
        data: result.rows,
      });
    } catch (error) {
      res.status(401).json({
        message: "user not found",
      });
    }
  },

}

module.exports = UsersController
