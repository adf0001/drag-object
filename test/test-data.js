
//global variable, for html page, refer tpsvr @ npm.
drag_object = require("../drag-object.js");

module.exports = {

	".start()": function (done) {
		return "<span style='position:relative;border:1px solid gray;' id='spDrag1' " +
			"	onmousedown='drag_object.start( arguments[0], this )' " +
			"	ontouchstart='drag_object.start( arguments[0], this )'>drag 1</span> " +
			"<span style='position:relative;border:1px solid gray;' id='spDrag2' " +
			"	onmousedown='drag_object.start( arguments[0], this )' " +
			"	ontouchstart='drag_object.start( arguments[0], this )'>drag 2</span> " +
			"<span style='position:relative;border:1px solid gray;' id='spDrag3' " +
			"	onmousedown=\"drag_object.start( arguments[0], this, 'spDrag1', 'spDrag2' )\" " +
			"	ontouchstart=\"drag_object.start( arguments[0], this, 'spDrag1', 'spDrag2' )\">drag 3</span>";
	},
	"derive": function (done) {
		myDragObject = new drag_object.class({
			el1: null,
			start: function (evt, el1) {
				drag_object.start.apply(this, arguments);
				this.el1 = el1;
				this.el1.style.background = 'yellow';
			},

			onStop: function (evt) {
				drag_object.onStop.apply(this, arguments);
				this.el1.style.background = '';
			},

			onFirstMove: function (evt) {
				this.el1.style.background = 'lime';
			},
			onMove: function (evt) {
				drag_object.onMove.apply(this, arguments);
				if (this.moveChanged) this.el1.textContent = this.el1.offsetLeft + ',' + this.el1.offsetTop;
			},
		});

		return "<span style='position:relative;border:1px solid gray;' id='spDrag1' " +
			"	onmousedown='myDragObject.start( arguments[0], this )' " +
			"	ontouchstart='myDragObject.start( arguments[0], this )'>drag 1</span> " +
			"<span style='position:relative;border:1px solid gray;' id='spDrag2' " +
			"	onmousedown='myDragObject.start( arguments[0], this )' " +
			"	ontouchstart='myDragObject.start( arguments[0], this )'>drag 2</span> " +
			"<span style='position:relative;border:1px solid gray;' id='spDrag3' " +
			"	onmousedown=\"myDragObject.start( arguments[0], this, 'spDrag1', 'spDrag2' )\" " +
			"	ontouchstart=\"myDragObject.start( arguments[0], this, 'spDrag1', 'spDrag2' )\">drag 3</span>";
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('drag_object', function () { for (var i in module.exports) { it(i, module.exports[i]).timeout(5000); } });
