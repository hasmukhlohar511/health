const masterProfileService = require('../services/database/masterProfileService');
const fileService = require('../services/fileService');
const mailService = require('../services/mailService');

async function getProfiles(req, res) {
    try {
        const profiles = await masterProfileService.getAll();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProfileById(req, res) {
    const { id } = req.params;

    try {
        const profile = await masterProfileService.getById(id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createProfile(req, res) {
    const { mobileNumber, countryCode, email, otp, role, createdBy } = req.body;

    try {
        const newProfile = await masterProfileService.create({
            mobileNumber, countryCode, email, otp, role, createdBy
        });
        res.status(201).json(newProfile);

        // Send a welcome email
        await mailService.sendMail(email, 'Welcome!', 'Thank you for registering.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function updateProfile(req, res) {
    const { id } = req.params;
    const { mobileNumber, countryCode, email, otp, role, updatedBy } = req.body;

    try {
        const updatedProfile = await masterProfileService.update(id, {
            mobileNumber, countryCode, email, otp, role, updatedBy
        });
        if (!updatedProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteProfile(req, res) {
    const { id } = req.params;
    const { deletedBy } = req.body;

    try {
        const profile = await masterProfileService.getById(id);
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Mark as deleted instead of removing
        profile.isDeleted = true;
        profile.deletedBy = deletedBy;
        await profile.save();

        res.json({ message: 'Profile marked as deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function uploadProfileFile(req, res) {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.file;
        const filePath = await fileService.saveFile(file);

        res.status(200).send({ message: 'File uploaded successfully', path: filePath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createMasterProfile: async (req, res, callback) => {
        try {
            // Your logic for creating a master profile goes here
            // Example: const newMasterProfile = await MasterProfile.create(req.body);
            callback(null, {}, 'dataInsert');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    updateMasterProfile: async (req, res, callback) => {
        try {
            // Your logic for updating a master profile goes here
            // Example: await MasterProfile.findByIdAndUpdate(req.params.id, req.body);
            callback(null, {}, 'dataUpdated');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    deleteMasterProfile: async (req, res, callback) => {
        try {
            // Your logic for deleting a master profile goes here
            // Example: await MasterProfile.findByIdAndDelete(req.params.id);
            callback(null, {}, 'dataDeleted');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getMasterProfile: async (req, res, callback) => {
        try {
            // Your logic for retrieving a master profile goes here
            // Example: const masterProfile = await MasterProfile.findById(req.params.id);
            callback(null, {}, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
    getMasterProfiles: async (req, res, callback) => {
        try {
            // Your logic for retrieving multiple master profiles goes here
            // Example: const masterProfiles = await MasterProfile.find({});
            callback(null, {}, 'dataFound');
        } catch (error) {
            // If any error occurs during the process, pass it to the callback
            callback(error, null, null);
        }
    },
};

