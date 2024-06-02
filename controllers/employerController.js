const employerService = require('../services/database/employerService');
const mailService = require('../services/mailService');

async function getEmployers(req, res) {
    try {
        const employers = await employerService.getAll();
        res.json(employers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getEmployerById(req, res) {
    const { id } = req.params;

    try {
        const employer = await employerService.getById(id);
        if (!employer) {
            return res.status(404).json({ error: 'Employer not found' });
        }
        res.json(employer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createEmployer(req, res) {
    const { firstName, lastName, mobileNumber, email, dateOfBirth, employerName, plan, masterProfileId, countryCode, createdBy } = req.body;

    try {
        const newEmployer = await employerService.create({
            firstName, lastName, mobileNumber, email, dateOfBirth, employerName, plan, masterProfileId, countryCode, createdBy
        });
        res.status(201).json(newEmployer);

        // Send a welcome email
        await mailService.sendMail(email, 'Welcome!', 'Thank you for registering as an employer.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateEmployer(req, res) {
    const { id } = req.params;
    const { firstName, lastName, mobileNumber, email, dateOfBirth, employerName, plan, masterProfileId, countryCode, updatedBy } = req.body;

    try {
        const updatedEmployer = await employerService.update(id, {
            firstName, lastName, mobileNumber, email, dateOfBirth, employerName, plan, masterProfileId, countryCode, updatedBy
        });
        if (!updatedEmployer) {
            return res.status(404).json({ error: 'Employer not found' });
        }
        res.json(updatedEmployer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteEmployer(req, res) {
    const { id } = req.params;
    const { deletedBy } = req.body;

    try {
        const employer = await employerService.getById(id);
        if (!employer) {
            return res.status(404).json({ error: 'Employer not found' });
        }

        // Mark as deleted instead of removing
        employer.isDeleted = true;
        employer.deletedBy = deletedBy;
        await employer.save();

        res.json({ message: 'Employer marked as deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createEmployer: async (req, res, callback) => {
        try {

            callback(null, {}, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateEmployer: async (req, res, callback) => {
        try {

            callback(null, {}, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deleteEmployer: async (req, res, callback) => {
        try {

            callback(null, {}, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getEmployer: async (req, res, callback) => {
        try {

            callback(null, {}, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getEmployers: async (req, res, callback) => {
        try {

            callback(null, {}, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};
