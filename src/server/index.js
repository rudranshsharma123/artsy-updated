var express = require("express"),
	app = express(),
	port = process.env.PORT || 3001;

var fs = require("fs");
var multer = require("multer");
console.log("todo list RESTful API server started on: " + port);
var upload = multer({ dest: "/tmp/" });

// File input field name is simply 'file'
app.post("/file_upload", upload.single("file"), function (req, res) {
	var file = __dirname + "/" + req.file.filename;
	fs.rename(req.file.path, file, function (err) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			res.json({
				message: "File uploaded successfully",
				filename: req.file.filename,
			});
		}
	});
});

app.listen(port);
