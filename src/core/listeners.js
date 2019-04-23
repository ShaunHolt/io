// TODO: tests

/** Creates a map of all listeners defined in the prototype chain. */
export class ProtoListeners {
  /**
   * @param protochain {Array} Array of protochain constructors.
   */
  constructor(protochain) {
    for (let i = protochain.length; i--;) {
      const prop = protochain[i].constructor.listeners;
      for (let j in prop) this[j] = prop[j];
    }
  }
}

/** Manager for IoNode listeners. */
export class Listeners {
  /**
   * Creates listener manager for IoNode.
   * @param node {IoNode} Reference to the node/element itself.
   * @param protoListeners {ProtoListeners} List of listeners defined in the protochain.
   */
  constructor(node, protoListeners) {
    // Copy listeners from protolisteners.
    Object.defineProperty(this, 'node', {value: node});
    Object.defineProperty(this, 'propListeners', {value: {}});
    Object.defineProperty(this, 'activeListeners', {value: {}});
    for (let prop in protoListeners) this[prop] = protoListeners[prop];
  }
  /**
   * Sets listeners from properties (filtered form properties map by 'on-' prefix).
   * @param props {object} Map of all properties.
   */
  setPropListeners(props) {
    for (let l in this.propListeners) delete this.propListeners[l];
    for (let l in props) {
      if (l.startsWith('on-')) {
        this.propListeners[l.slice(3, l.length)] = props[l];
      }
    }
  }
  /**
   * Adds all event listeners.
   */
  connect() {
    const node = this.node;
    const propListeners = this.propListeners;
    for (let i in this) {
      const listener = typeof this[i] === 'function' ? this[i] : node[this[i]];
      node.addEventListener(i, listener);
    }
    for (let i in propListeners) {
      const listener = typeof propListeners[i] === 'function' ? propListeners[i] : node[propListeners[i]];
      node.addEventListener(i, listener);
    }
  }
  /**
   * Removes all event listeners.
   */
  disconnect() {
    const node = this.node;
    const propListeners = this.propListeners;
    for (let i in this) {
      const listener = typeof this[i] === 'function' ? this[i] : node[this[i]];
      node.removeEventListener(i, listener);
    }
    for (let i in propListeners) {
      const listener = typeof propListeners[i] === 'function' ? propListeners[i] : node[propListeners[i]];
      node.removeEventListener(i, listener);
    }
  }
  /**
   * Removes all event listeners.
   * Use this when node is no longer needed.
   */
  dispose() {
    this.disconnect();
    const node = this.node;
    const active = this.activeListeners;
    for (let i in active) {
      for (let j = active[i].length; j--;) {
        if (node.isElement) HTMLElement.prototype.removeEventListener.call(node, i, active[i][j]);
        active[i].splice(j, 1);
      }
    }
  }
  /**
   * Adds an event listener.
   * @param type {string} event name to listen to.
   * @param listener {function} event handler function.
   */
  addEventListener(type, listener) {
    const node = this.node;
    const active = this.activeListeners;
    active[type] = active[type] || [];
    const i = active[type].indexOf(listener);
    if (i === - 1) {
      if (node.isElement) HTMLElement.prototype.addEventListener.call(node, type, listener);
      active[type].push(listener);
    }
  }
  /**
   * Removes an event listener.
   * @param type {string} event name to listen to.
   * @param listener {function} event handler function.
   */
  removeEventListener(type, listener) {
    const node = this.node;
    const active = this.activeListeners;
    if (active[type] !== undefined) {
      const i = active[type].indexOf(listener);
      if (i !== - 1) {
        if (node.isElement) HTMLElement.prototype.removeEventListener.call(node, type, listener);
        active[type].splice(i, 1);
      }
    }
  }
  /**
   * Shorthand for event dispatch.
   * @param type {string} event name to dispatch.
   * @param detail {object} event detail.
   * @param bubbles {boolean} event bubbles.
   * @param src source node/element to dispatch event from.
   */
  dispatchEvent(type, detail = {}, bubbles = true, src = this.node) {
    if (src instanceof HTMLElement || src === window) {
      HTMLElement.prototype.dispatchEvent.call(src, new CustomEvent(type, {type: type, detail: detail, bubbles: bubbles, composed: true}));
    } else {
      const active = this.activeListeners;
      if (active[type] !== undefined) {
        const array = active[type].slice(0);
        for (let i = 0; i < array.length; i ++) {
          array[i].call(src, {detail: detail, target: src, path: [src]});
          // TODO: consider bubbling
        }
      }
    }
  }
}
