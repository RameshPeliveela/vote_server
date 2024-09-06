const express = require('express');
const router = express.Router()
const {addCandidate, updateCandidate, deleteCandidate} = require('../controllers/candidateControllers')

router.post('/', addCandidate);
router.put('/:id', updateCandidate);
router.delete('/:id', deleteCandidate);

module.exports = router;
