const express = require('express')
const router = express.Router()

const leaderController = require('../controllers/leader.controllers')

router.route('/leaders')
  .all(leaderController.all)
  .post(leaderController.saveOne)
  .get(leaderController.getAll)

router.route('/leaders/:id')
  .get(leaderController.getOne)
  .delete(leaderController.deleteOne)

module.exports = router
