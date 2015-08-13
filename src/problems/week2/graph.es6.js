const priorityQueue = require(`${appRoot}/shared/priorityQueue`);

var _ = require('lodash');

export class Graph {
  constructor(...links){
    this.nodes = _(links).groupBy('source').mapValues((value, key) => {
      return new Node(key, ...value);
    }).value();
  }

  Print(){
    return _(this.nodes).reduceRight((n, a) => {
      return a + n.Print() + "\n";
    }, "");
  }

  printNodes(){
    return _(this.nodes).forEach((n) => {
      console.log(n.Print());
    }).value();
  }

  printLinks(){
    var links = new priorityQueue.PriorityQueue();
    return _(this.nodes).forEach((n) => {
      console.log(n.getLinks());
    }).value();
  }
}

class Node {
  constructor(id, ...links){
    this.links  = new priorityQueue.PriorityQueue(...links);
    this.id     = id;
  }

  AddLink(link){
    this.links.Add(link)
  }

  Print(){
    return this.id + " - " + this.links.Print();
  }

  getLinks(){
    return this.links.GetAll();
  }
}

class Link {
  constructor(source, destination, cost){
    this.source       = source;
    this.destination  = destination;
    this.cost         = cost;
  }

  Priority(){
    return this.cost;
  }

  ComparePriority(link){
    return this.Priority() == link.Priority() ? 0
             : this.Priority() > link.Priority() ? 1
                 : -1;
  }

  Print(){
    return `${this.source}-${this.destination}:${this.cost} `;
  }
}

export function generateLinks(linkString) {
  return _(linkString.split(" ")).map((val) => {
     return parseInt(val);
   }).chunk(3).map((link) => {
    return new Link(...link);
  }).value();
}
