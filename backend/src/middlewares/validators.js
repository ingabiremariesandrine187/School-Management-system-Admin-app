const Joi = require('joi');

function validate(schema) {
  return (req, res, next) => {
    const data = { body: req.body, params: req.params, query: req.query };
    const { error, value } = schema.validate(data, { abortEarly: false, allowUnknown: true });
    if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
    req.body = value.body || req.body;
    next();
  };
}

const classSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(1).required(),
    level: Joi.string().allow(''),
    teacherId: Joi.string().hex().length(24).optional().allow(null,''),
    subjectIds: Joi.array().items(Joi.string().hex().length(24)).optional(),
    notes: Joi.string().allow('', null)
  })
});

const studentSchema = Joi.object({
  body: Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().allow(''),
    admissionNumber: Joi.string().allow('', null),
    dob: Joi.date().optional().allow(null,''),
    gender: Joi.string().valid('male','female','other').optional().allow(null,''),
    classId: Joi.string().hex().length(24).optional().allow(null,''),
    parentId: Joi.string().hex().length(24).optional().allow(null,''),
    contact: Joi.object({ phone: Joi.string().allow('', null), email: Joi.string().email().allow('', null) }).optional(),
    notes: Joi.string().allow('', null)
  })
});

const attendanceSchema = Joi.object({
  body: Joi.object({
    date: Joi.date().required(),
    classId: Joi.string().hex().length(24).required(),
    subjectId: Joi.string().hex().length(24).optional().allow('', null),
    records: Joi.array().items(Joi.object({
      studentId: Joi.string().hex().length(24).required(),
      status: Joi.string().valid('present','absent','late').required(),
      remarks: Joi.string().allow('', null)
    })).min(1).required()
  })
});

module.exports = { validate, classSchema, studentSchema, attendanceSchema };