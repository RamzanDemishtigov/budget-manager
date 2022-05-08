const { reset } = require("nodemon");
const dbEnvelopes = require("../config/db");
const { createId, findById, deleteById } = require("../helpers/db-helpers");
const router = require("../routes/envelopes");

// @desc		Get all Envelopes
// @route		GET /api/envelopes
exports.getEnvelopes =  (req, res, next) => {
  try {
    const envelopes =  dbEnvelopes;
    res.status(200).send(envelopes);
  } catch (err) {
    res.status(400).send(err);
  }
};

// @desc		Create an Envelope
// @route		POST /api/envelopes
exports.addEnvelope =  (req, res) => {
  try {
    const { title, budget } = req.body;
    const envelopes =  dbEnvelopes;
    const newId = createId(envelopes);
    const newEnvelope = {
      id: newId,
      title,
      budget,
    };
    envelopes.push(newEnvelope);
    res.status(201).send(newEnvelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

// @desc		Get an Envelopes
// @route		GET /api/envelopes/:id
exports.getEnvelopeById =  (req, res) => {
  try {
    const { id } = req.params;
    const envelopes =  dbEnvelopes;
    const envelope = findById(envelopes, id);

    if (!envelope) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    return res.status(200).send(envelope);
  } catch (err) {
    res.status(500).send(err);
  }
};

// @desc		Update an Envelopes
// @route		PUT /api/envelopes/:id
exports.updateEnvelope =  (req, res) => {
  try {
    const { title, budget } = req.body;
    const { id } = req.params;
    // mimicking the retrieval of a real DB with /
    const envelopes =  dbEnvelopes;
    const envelope = findById(envelopes, id);

    if (!envelope) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    envelope.title = title;
    envelope.budget = budget;
    res.status(201).send(envelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};

// @desc		Delete an Envelope
// @route		DELETE /api/envelopes/:id
exports.deleteEnvelope =  (req, res) => {
  try {
    const { id } = req.params;
    const envelopes =  dbEnvelopes;
    const envelope = findById(envelopes, id);

    if (!envelope) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
    }

    const updatedEnvelopes = deleteById(envelopes, id);
    return res.status(204).send(updatedEnvelopes);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.transfer =  (req, res) => {
	try {
    const envelopes =  dbEnvelopes;
		const { fromId, toId } = req.params;
		const { amount } = req.body

		const originEnv = findById(envelopes, fromId);
		const destinationEnv = findById(envelopes, toId);

    if (!originEnv || !destinationEnv) {
      return res.status(404).send({
        message: "Envelope Not Found",
      });
		}

		if (originEnv.budget < amount) {
			return res.status(400).send({
				message: "Amount to transfer exceeds envelope budget funds"
			})
		}

		originEnv.budget -= amount;
		destinationEnv.budget += amount;

		return res.status(201).send(originEnv);
	} catch (err) {
		res.status(500).send(err);
	}
}