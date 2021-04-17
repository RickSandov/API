const router = require('express').Router();

const {
  fetchDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  fetchDocumentById
} = require('../controllers/public-api');

router 
  .route('/doc')
  .get(fetchDocuments)
  .post(createDocument);

router
  .route('/doc/:id')
  .get(fetchDocumentById)
  .post(createDocument)
  .put(updateDocument)
  .delete(deleteDocument);

module.exports = router;
