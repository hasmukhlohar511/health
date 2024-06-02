class BaseService {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(`Error getting all documents: ${error.message}`);
        }
    }

    async getById(id, project={}) {
        try {
            return await this.model.findById(id, project);
        } catch (error) {
            throw new Error(`Error getting document by ID: ${error.message}`);
        }
    }

    async create(data) {
        try {
            const document = new this.model(data);
            return await document.save();
        } catch (error) {
            throw new Error(`Error creating document: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error(`Error updating document: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Error deleting document: ${error.message}`);
        }
    }

    async findOne(query, project={}) {
        try {
            return await this.model.findOne({ ...query, isDeleted : false}, project).sort({_id : - 1});
        } catch (error) {
            throw new Error(`Error deleting document: ${error.message}`);
        }
    }

    async checkExistence(query){
        try {
            return await this.model.exists(query);
        } catch (error) {
            throw new Error(`Error deleting document: ${error.message}`);
        }
    }

    async find(query, project) {
        try {
            return await this.model.find(query, project);
        } catch (error) {
            throw new Error(`Error finding document: ${error.message}`);
        }
    }

    async count(query) {
        try {
            return await this.model.countDocuments(query);
        } catch (error) {
            throw new Error(`Error counting document: ${error.message}`);
        }
    }
}

module.exports = BaseService;
