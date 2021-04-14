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
      message: 'No se encontraron documentos.',
    });
  }

  return res.json({
    status: 'OK',
    message: `Se encontraron ${docs.length} documentos`,
    docs,
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
    message: `El documento fue creado exitosamente con id: ${newDoc._id}`,
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
      message: `No se encontró documento con id: ${id}`,
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
    message: 'El documento se ha actualizado exitosamente.',
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
      message: `No se encontro documento con id: ${id}`,
    });

  return res.json({
    status: 'OK',
    message: `Se eliminó el documento con id ${id} exitosamente`,
    doc,
  });
};

module.exports = ctrl;
