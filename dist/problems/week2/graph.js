'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _toConsumableArray = require('babel-runtime/helpers/to-consumable-array')['default'];

var _bind = require('babel-runtime/helpers/bind')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.generateLinks = generateLinks;
var priorityQueue = require(appRoot + '/shared/priorityQueue');

var _ = require('lodash');

var Graph = (function () {
  function Graph() {
    _classCallCheck(this, Graph);

    for (var _len = arguments.length, links = Array(_len), _key = 0; _key < _len; _key++) {
      links[_key] = arguments[_key];
    }

    this.nodes = _(links).groupBy('source').mapValues(function (value, key) {
      return new (_bind.apply(Node, [null].concat([key], _toConsumableArray(value))))();
    }).value();
  }

  _createClass(Graph, [{
    key: 'Print',
    value: function Print() {
      return _(this.nodes).reduceRight(function (n, a) {
        return a + n.Print() + "\n";
      }, "");
    }
  }, {
    key: 'printNodes',
    value: function printNodes() {
      return _(this.nodes).forEach(function (n) {
        console.log(n.Print());
      }).value();
    }
  }, {
    key: 'printLinks',
    value: function printLinks() {
      var links = new priorityQueue.PriorityQueue();
      return _(this.nodes).forEach(function (n) {
        console.log(n.getLinks());
      }).value();
    }
  }]);

  return Graph;
})();

exports.Graph = Graph;

var Node = (function () {
  function Node(id) {
    _classCallCheck(this, Node);

    for (var _len2 = arguments.length, links = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      links[_key2 - 1] = arguments[_key2];
    }

    this.links = new (_bind.apply(priorityQueue.PriorityQueue, [null].concat(links)))();
    this.id = id;
  }

  _createClass(Node, [{
    key: 'AddLink',
    value: function AddLink(link) {
      this.links.Add(link);
    }
  }, {
    key: 'Print',
    value: function Print() {
      return this.id + " - " + this.links.Print();
    }
  }, {
    key: 'getLinks',
    value: function getLinks() {
      return this.links.GetAll();
    }
  }]);

  return Node;
})();

var Link = (function () {
  function Link(source, destination, cost) {
    _classCallCheck(this, Link);

    this.source = source;
    this.destination = destination;
    this.cost = cost;
  }

  _createClass(Link, [{
    key: 'Priority',
    value: function Priority() {
      return this.cost;
    }
  }, {
    key: 'ComparePriority',
    value: function ComparePriority(link) {
      return this.Priority() == link.Priority() ? 0 : this.Priority() > link.Priority() ? 1 : -1;
    }
  }, {
    key: 'Print',
    value: function Print() {
      return this.source + '-' + this.destination + ':' + this.cost + ' ';
    }
  }]);

  return Link;
})();

function generateLinks(linkString) {
  return _(linkString.split(" ")).map(function (val) {
    return parseInt(val);
  }).chunk(3).map(function (link) {
    return new (_bind.apply(Link, [null].concat(_toConsumableArray(link))))();
  }).value();
}
//# sourceMappingURL=graph.js.map
