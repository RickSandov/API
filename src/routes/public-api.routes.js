const router = require('express').Router();

const {
  fetchDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} = require('../controllers/public-api');

router
  .route('/doc')
  .get(fetchDocuments)
  .post(createDocument)
  .put(updateDocument)
  .delete(deleteDocument);

module.exports = router;
