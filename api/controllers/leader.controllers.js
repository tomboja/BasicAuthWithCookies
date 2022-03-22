const mongoose = require('mongoose')


const all = function (req, res, next) {
  console.log('Message to all')
  next()
}

const getAll = function (req, res, next) {
  console.log('Get all')
}

const saveOne = function (req, res, next) {
  console.log('save one')
}

const getOne = function (req, res, next) {
  console.log('get one')
}

const deleteOne = function (req, res, next) {
  console.log('delete one')
}

module.exports = {
  all,
  getAll,
  getOne,
  saveOne,
  deleteOne
}
