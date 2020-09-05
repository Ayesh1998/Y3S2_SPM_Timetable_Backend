const express = require('express')
const router = express.Router()

const TagsController = require('../controllers/tags-controller')

// noinspection JSCheckFunctionSignatures
router.post('/create', TagsController.createTags)

// noinspection JSCheckFunctionSignatures
router.get('/getTags', TagsController.getTags)

// noinspection JSCheckFunctionSignatures
router.get('/getTags/:id', TagsController.getTag)

// noinspection JSCheckFunctionSignatures
router.put('/editTags', TagsController.editTags)

// noinspection JSCheckFunctionSignatures
router.delete('/deleteTags', TagsController.deleteTags)

module.exports = router
