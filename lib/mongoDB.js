const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = class mongoDB {
    constructor(url, options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) {
        this.url = url;
        this.data = this._data = this._schema = this._model = {};
        this.db = null; // Initialize to null
        this.options = options;
    }

    async read() {
        try {
            this.db = await mongoose.connect(this.url, { ...this.options });
            this.connection = mongoose.connection;

            const schema = this._schema = new Schema({
                data: {
                    type: Object,
                    required: true,
                    default: {}
                }
            });

            try {
                this._model = mongoose.model('data', schema);
            } catch {
                this._model = mongoose.model('data');
            }

            this._data = await this._model.findOne({});
            if (!this._data) {
                this.data = {};
                await this.write(this.data);
                this._data = await this._model.findOne({});
            } else {
                this.data = this._data.data;
            }

            return this.data;
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    async write(data) {
        try {
            if (!data) return data;
            if (!this._data) {
                return (new this._model({ data })).save();
            } else {
                const updatedDoc = await this._model.findByIdAndUpdate(
                    this._data._id,
                    { data },
                    { new: true, upsert: true }
                );
                this._data = updatedDoc; // Update the cached data
                this.data = updatedDoc.data;
                return updatedDoc.save();
            }
        } catch (error) {
            console.error('Error writing to MongoDB:', error);
            throw error;
        }
    }
};
