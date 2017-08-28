'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fp = require('lodash/fp');

var _zenObservable = require('zen-observable');

var _zenObservable2 = _interopRequireDefault(_zenObservable);

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

var _getFileSets = require('./get-file-sets');

var _getFileSets2 = _interopRequireDefault(_getFileSets);

var _getTargets = require('./get-targets');

var _getTargets2 = _interopRequireDefault(_getTargets);

var _serverRequire = require('./server-require');

var _serverRequire2 = _interopRequireDefault(_serverRequire);

var _writeEach = require('./write-each');

var _writeEach2 = _interopRequireDefault(_writeEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const getPatternFile = serverRequire('get-pattern-file');

exports.default = buildDemoFiles;


function buildDemoFiles(datasets, target, context) {
	return new _zenObservable2.default(observer => {
		const app = context.app;
		const rewriter = context.rewriter;

		const fileSets = (0, _getFileSets2.default)(datasets);
		const idPad = (0, _fp.padEnd)((0, _fp.max)(fileSets.map(e => e.id.length)));

		(0, _build2.default)(fileSets, {
			read: function read(file, files, count) {
				const set = file.pattern;
				observer.next(`${context.verbose ? 'Demo files: ' : ''}${idPad(file.id)} ${count}/${files.length}`);
				return getPatternFile(app, set.id, {
					outFormats: [file.out],
					baseNames: [_path2.default.basename(file.path, _path2.default.extname(file.path))],
					environments: [set.env]
				}, file.out, set.env);
			},
			write: function write(result, file) {
				return _asyncToGenerator(function* () {
					const pattern = file.pattern;
					const frags = [target].concat(_toConsumableArray(pattern.relative), [pattern.baseName]);
					const base = _path2.default.resolve.apply(_path2.default, _toConsumableArray(frags));
					const baseName = `index.${file.out}`;
					return (0, _writeEach2.default)(result, (0, _getTargets2.default)(base, baseName, file.pattern), rewriter);
				})();
			},
			done: function done() {
				observer.next(`${context.verbose ? 'Demo files: ' : ''}${fileSets.length}/${fileSets.length}`);
				observer.complete();
			}
		}).catch(err => observer.error(err));
	});
}
module.exports = exports['default'];