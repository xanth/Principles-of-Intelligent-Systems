'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Prioritizable = Prioritizable;
var _ = require('lodash');

function Prioritizable(GetPriority, ComparePriority) {
  return function (target, key, descriptor) {
    console.log(target, key, descriptor);
    target.getPriority = GetPriority;
    target.comparePriority = ComparePriority;
    return descriptor;
  };
}

var PriorityQueue = (function () {
  function PriorityQueue() {
    _classCallCheck(this, PriorityQueue);

    for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
      items[_key] = arguments[_key];
    }

    this.queue = _(items).groupBy(function (item) {
      return item.Priority();
    }).value();
    this.queues = _.keys(this.queue);
  }

  _createClass(PriorityQueue, [{
    key: 'Add',
    value: function Add() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          items[_key2] = arguments[_key2];
        }

        for (var _iterator = _getIterator(items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (this.queue[item.Priority()]) {
            this.queue[item.Priority()].push(item);
          } else {
            this.queues.splice(_.sortedIndex(this.queues, item.Priority()), 0, item.Priority());
            this.queue[item.Priority()] = [item];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'Merge',
    value: function Merge(pQueue) {
      if (this.queue[item.Priority()]) {
        this.queue[item.Priority()].push(item);
      } else {
        this.queues.splice(_.sortedIndex(this.queues, item.Priority()), 0, item.Priority());
        this.queue[item.Priority()] = [item];
      }
    }
  }, {
    key: 'Get',
    value: function Get() {
      return this.queue[this.queues[0]][0];
    }
  }, {
    key: 'GetAll',
    value: function GetAll() {
      return _(this.queue).reduce(function (p, c, key) {
        return p.concat(c);
      }, new Array());
    }
  }, {
    key: 'Pop',
    value: function Pop() {
      var ret = this.queue[this.queues[0]].shift();
      if (this.queue[this.queues[0]].length === 0) {
        this.queues.shift();
        delete this.queue[ret.Priority()];
      }
      return ret;
    }
  }, {
    key: 'Print',
    value: function Print() {
      return _(this.queue).map(function (item) {
        return JSON.stringify(item);
      }).value();
    }
  }]);

  return PriorityQueue;
})();

exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=priorityQueue.js.map
