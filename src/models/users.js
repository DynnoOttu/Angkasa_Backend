const Pool = require('./../config/db')

const userIdModels = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE users.id = '${id}'`,
            (err, res) => {
                if (!err) {
                    resolve(res);
                } else {
                    reject(err.message);
                }
            })
    );
};

const selectDataUsers = () => {
    return Pool.query(
        'SELECT * FROM users'
    )
}

const insertData = data => {
    console.log(data)
    const { name, email, phone, password } = data
    return Pool.query(
        `INSERT INTO users(name,email,phone,password) VALUES('${name}','${email}','${phone}',${password})`)
}

const selectUserById = (id) => {
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const updateData = (id, data) => {
    let { email, password, name, photo, phone, address, city, country, postal_code } = data;
    return Pool.query(`UPDATE users SET email='${email}',password ='${password}',name ='${name}', photo = '${photo}', phone='${phone}', address='${address}', city='${city}', country='${country}', postal_code='${postal_code}' WHERE users.id='${id}';`);
}

const deleteData = (id, data) => {
    return Pool.query(
        `DELETE FROM recipes WHERE id=${id}`)
}

const findUser = (email) => {
    console.log(email)
    return new Promise((resolve, reject) =>
        Pool.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    )
}

const createUser = (data) => {
    const { email, name, password, id, otp } = data
    return new Promise((resolve, reject) =>
        Pool.query(`INSERT INTO users(id,email,name,password,otp) VALUES('${id}','${email}','${name}','${password}','${otp}')`, (err, result) => {
            if (!err) {
                resolve(result)
            } else {
                reject(err)
            }
        }))
}

const verifUser = (id) => {
    return Pool.query(
        `UPDATE users SET verif=1 WHERE id='${id}'`)
}
module.exports = { selectDataUsers, insertData, selectUserById, updateData, deleteData, findUser, createUser, verifUser, userIdModels }
