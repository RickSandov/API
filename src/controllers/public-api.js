const Doc = require('../models/Doc');

const ctrl = {};

ctrl.fetchDocuments = async (req, res, next) => {
  let docs;

  try {
    docs = await Doc.find({}).lean();
  } catch (err) {
    return next(err);
  }

  if (docs.length === 0) {
    return res.json({
      status: 'NO_CONTENT',
      message: 'No docs found',
    });
  }

  return res.json({
    status: 'OK',
    message: `${docs.length} docs found`,
    docs,
  });
};

ctrl.fetchDocumentById = async (req, res, next) => {
  const { id } = req.params;

  const doc = await Doc.findById(id).lean();

  if (!doc)
    return res.status(404).json({
      status: 'NOT_FOUND',
      message: `Doc with ID: ${id} doesn't exist`,
    });

  return res.json({
    status: 'OK',
    doc: doc,
  });
};

ctrl.createDocument = async (req, res, next) => {
  let { title, content } = req.body;

  const newDoc = new Doc({
    title,
    content,
  });

  try {
    await newDoc.save();
  } catch (err) {
    return next(err);
  }

  return res.json({
    status: 'OK',
    message: `Doc created successfully with ID: ${newDoc._id}`,
    doc: newDoc.toJSON(),
  });
};

ctrl.updateDocument = async (req, res, next) => {
  const { id } = req.params;
  let { title, content } = req.body;
  let doc;

  try {
    doc = await Doc.findById(id);
  } catch (err) {
    return next(err);
  }

  if (!doc)
    return res.status(404).json({
      status: 'NOT_FOUND',
      message: `Not found doc with ID: ${id}`,
    });

  doc.set({
    title: title || doc.title,
    content: content || doc.content,
  });

  try {
    await doc.save();
  } catch (err) {
    return next(err);
  }

  return res.json({
    status: 'OK',
    message: 'Doc has been updated successfully',
    doc,
  });
};

ctrl.deleteDocument = async (req, res, next) => {
  const { id } = req.params;
  let doc;

  try {
    doc = await Doc.findByIdAndDelete(id).lean();
  } catch (err) {
    return next(err);
  }

  if (!doc)
    return res.status(404).json({
      status: 'NOT_FOUND',
      message: `Not found doc with ID: ${id}`,
    });

  return res.json({
    status: 'OK',
    message: `Doc with ID: ${id} DELETED successfully `,
    doc,
  });
};

module.exports = ctrl;
