module.exports = function(app) {
	var mongoose = require('mongoose');
    var Notice = mongoose.model('Notice');
    var _ = require('lodash');
	var notice = {};


	notice.all = function(req, res) {
		Notice.find().sort('-created').exec(function(err, notices) {
	        if (err) {
	            res.render('error', {
	                status: 500
	            });
	        } else {
	            res.render('notices/index', { notices: notices });
	        }
	    });
	};

	notice.new = function(req, res) {
		res.render('notices/new');
	};

	notice.create = function(req, res) {
		var notice = new Notice(req.body);
	    //notice.user = req.user;

	    notice.save(function(err) {
	        if (err) {
	            res.render('notices/new', { error: err.erros, fields: req.body });
	        } else {
	            res.redirect('/admin/notices/' + notice.id);
	        }
	    });
	};

	notice.show = function(req, res) {
		var id = req.params.id;
	    Notice.findOne({ '_id': id }, function(err, notice) {
	      if (err) {
	        res.send(404, 'Sorry, we cannot find that!');
	      } else {
	        res.render('notices/show', { notice: notice });
	      }
	    });
	};

	notice.edit = function(req, res) {
		var id = req.params.id;
	    Notice.findOne({ '_id': id }, function(err, notice) {
	      if (err) {
	        res.send(404, 'Sorry, we cannot find that!');
	      } else {
	        res.render('notices/edit', { notice: notice });
	      }
	    });
	};

	notice.update = function(req, res) {

	    Notice.update({ _id: req.params.id }, req.body, function(err) { 
	    	if (err) {
	            res.render('notices/edit', { error: err.erros, fields: req.body });
	        } else {
	            res.redirect('/admin/notices/' + req.params.id);
	        }
		});

	};

	notice.destroy = function(req, res) {
		var notice = req.notice;

	    notice.remove(function(err) {
	        if (err) {
	            return res.send(500	, {
	                errors: err.errors,
	                notice: notice
	            });
	        } else {
	            res.redirect('/admin/notices');
	        }
	    });
	};

	app.get('/admin/notices', notice.all);
	app.get('/admin/notice/new', notice.new);
	app.get('/admin/notices/:id', notice.show);
    app.get('/admin/notices/:id/edit', notice.edit);
    app.post('/admin/notices', notice.create);
    app.put('/admin/notices/:id', notice.update);
    app.del('/admin/notices/:id', notice.destroy);
};