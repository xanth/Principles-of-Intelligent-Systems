var _ = require('lodash');

export function Prioritizable(GetPriority, ComparePriority) {
  return function (target, key, descriptor) {
    console.log(target, key, descriptor);
    target.getPriority = GetPriority;
    target.comparePriority = ComparePriority;
    return descriptor;
  }
}

export class PriorityQueue {
  constructor(...items) {
    this.queue  = _(items).groupBy((item) => {
        return item.Priority();
    }).value();
    this.queues = _.keys(this.queue);
  }

  Add(...items){
    for (var item of items) {
      if(this.queue[item.Priority()]){
        this.queue[item.Priority()].push(item);
      } else {
        this.queues.splice(_.sortedIndex(this.queues, item.Priority()), 0, item.Priority());
        this.queue[item.Priority()] = [item];
      }
    }
  }

  Merge(pQueue){
    if(this.queue[item.Priority()]){
      this.queue[item.Priority()].push(item);
    } else {
      this.queues.splice(_.sortedIndex(this.queues, item.Priority()), 0, item.Priority());
      this.queue[item.Priority()] = [item];
    }
  }

  Get(){
    return this.queue[this.queues[0]][0];
  }

  GetAll(){
    return _(this.queue).reduce((p, c, key) => {
      return p.concat(c);
    }, new Array());
  }

  Pop(){
    let ret = this.queue[this.queues[0]].shift();
    if (this.queue[this.queues[0]].length === 0){
      this.queues.shift();
      delete this.queue[ret.Priority()];
    }
    return ret;
  }

  Print(){
    return _(this.queue).map((item) => {
      return JSON.stringify(item);
    }).value();
  }
}
