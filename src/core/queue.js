/** Manager for IoNode event queue and change handle functions. */
export class NodeQueue extends Array {
  /**
   * Creates queue manager for IoNode.
   * @param node {IoNode} Reference to the node/element itself.
   */
  constructor(node) {
    super();
    Object.defineProperty(this, 'node', {value: node, configurable: true});
  }
  /**
   * Add property change to the queue.
   * @param prop {string} Property name.
   * @param value Property value.
   * @param oldValue Old property value.
   */
  queue(prop, value, oldValue) {
    const i = this.indexOf(prop);
    if (i === -1) {
      this.push(prop, {property: prop, value: value, oldValue: oldValue});
    } else {
      this[i + 1].value = value;
    }
  }
  /**
   * Dispatch the queue.
   */
  dispatch() {
    const node = this.node;
    if (this.length) {
      for (let j = 0; j < this.length; j += 2) {
        const prop = this[j];
        const payload = {detail: this[j + 1]};
        if (node[prop + 'Changed']) node[prop + 'Changed'](payload);
        node.dispatchEvent(prop + '-changed', payload.detail);
      }
      // TODO: Evaluate performance and consider refactoring.
      node.dispatchEvent('object-mutated', {object: node}, false, window);
      node.changed();
      this.length = 0;
    }
  }
  /**
   * Remove queue items and the node reference.
   * Use this when node is no longer needed.
   */
  dispose() {
    this.length = 0;
    delete this.node;
  }
}
