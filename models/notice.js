
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var fields = {
	title: { type: String },
	subTitle: { type: String },
	content: { type: String },
	imageUrl: { type: String },
	created: { type: Date , default: Date.now }
};

var noticeSchema = new Schema(fields);

/**
 * Validations
 */
noticeSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');


mongoose.model('Notice', noticeSchema);