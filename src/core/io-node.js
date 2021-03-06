import {ProtoChain} from './protochain.js';
import {ProtoFunctions} from './functions.js';
import {Bindings, Binding} from './binding.js';
import {Queue} from './queue.js';
import {ProtoProperties, Properties} from './properties.js';
import {ProtoListeners, Listeners} from './listeners.js';

/**
 * Core mixin for `IoNode` classes.
 * @param {function} superclass - Class to extend.
 * @return {function} - Extended class constructor with `IoNodeMixin` applied to it.
 */
const IoNodeMixin = (superclass) => {
  const classConstructor = class extends superclass {
    static get Properties() {
      return {
        lazy: Boolean,
      };
    }
    /**
     * Creates `IoNode` instance and initializes internals.
     * @param {Object} initProps - Property values to inialize instance with.
     */
    constructor(initProps = {}, ...args) {
      super(...args);

      const constructor = this.__proto__.constructor;
      if (constructor.__isRegisteredAs !== constructor.name) {
        console.error(`${constructor.name}: Not registered! Call "Register()" before using ${constructor.name} class!`);
      }

      this.__protoFunctions.bind(this);

      Object.defineProperty(this, '__bindings', {value: new Bindings(this)});
      Object.defineProperty(this, '__queue', {value: new Queue(this)});

      Object.defineProperty(this, '__listeners', {value: new Listeners(this, this.__protoListeners)});

      Object.defineProperty(this, '__isConnected', {enumerable: false, writable: true});
      Object.defineProperty(this, '__connections', {enumerable: false, value: []});

      Object.defineProperty(this, '__properties', {value: new Properties(this, this.__protoProperties)});

      Object.defineProperty(this, 'objectMutated', {value: this.objectMutated.bind(this)});
      Object.defineProperty(this, 'objectMutatedThrottled', {value: this.objectMutatedThrottled.bind(this)});
      Object.defineProperty(this, 'queueDispatchLazy', {value: this.queueDispatchLazy.bind(this)});

      this.setProperties(initProps);
      // TODO: consider auto-connect
    }
    /**
     * Connects IoNode to the application.
     * @param {IoNode} owner - Node to connect to.
     */
    connect(owner) {
      if (this.__connections.indexOf(owner) === -1) {
        this.__connections.push(owner);
        if (!this.__isConnected) this.connectedCallback();
      }
    }
    /**
     * Disconnects IoNode from the application.
     * @param {IoNode} owner - Node to disconnect from.
     */
    disconnect(owner) {
      if (this.__connections.indexOf(owner) !== -1) {
        this.__connections.splice(this.__connections.indexOf(owner), 1);
      }
      if (this.__connections.length === 0 && this.__isConnected) {
        this.disconnectedCallback();
      }
    }
    /**
     * Handler function with `event.preventDefault()`.
     * @param {Object} event - Event object.
     */
    preventDefault(event) {
      event.preventDefault();
    }
    /**
     * Handler function with `event.stopPropagation()`.
     * @param {Object} event - Event object.
     */
    stopPropagation(event) {
      event.stopPropagation();
    }
    /**
     * default change handler.
     */
    changed() {}
    /**
     * Applies compose object on change.
     */
    applyCompose() {
      // TODO: Test and documentation.
      const compose = this.compose;
      if (compose) {
        for (let prop in compose) {
          this[prop].setProperties(compose[prop]);
        }
      }
    }
    dispatchChange() {
      this.applyCompose();
      this.changed();
      if (this.setAria) this.setAria();
    }
    /**
     * Returns a binding to a specified property`.
     * @param {string} prop - Property to bind to.
     * @return {Binding} Binding object.
     */
    bind(prop) {
      if (this.__properties[prop]) {
        return this.__bindings.bind(prop);
      } else {
        console.warn(`IoGUI IoNode: cannot bind to ${prop} property. Does not exist!`);
      }
    }
    /**
     * Unbinds a binding to a specified property`.
     * @param {string} prop - Property to unbind.
     */
    unbind(prop) {
      this.__bindings.unbind(prop);
      const binding = this.__properties[prop].binding;
      if (binding) binding.removeTarget(this, prop);
    }
    /**
     * Sets a property and emits `[property]-set` event.
     * Use this when property is set by user action (e.g. mouse click).
     * @param {string} prop - Property name.
     * @param {*} value - Property value.
     * @param {boolean} force - Force value set.
     */
    set(prop, value, force) {
      if (this[prop] !== value || force) {
        const oldValue = this[prop];
        this[prop] = value;
        this.dispatchEvent('value-set', {property: prop, value: value, oldValue: oldValue}, false);
      }
    }
    /**
     * Sets multiple properties in batch.
     * [property]-changed` events will be broadcast in the end.
     * @param {Object} props - Map of property names and values.
     */
    setProperties(props) {
      for (let p in props) {
        if (this.__properties[p] === undefined) continue;
        this.__properties.set(p, props[p], true);
      }
      this.__listeners.setPropListeners(props, this);
      if (this.__isConnected) this.queueDispatch();
    }
    objectMutated(event) {
      for (let i = this.__observedProps.length; i--;) {
        const prop = this.__observedProps[i];
        const value = this.__properties[prop].value;
        if (value === event.detail.object) {
          this.throttle(this.objectMutatedThrottled, prop);
          return;
        } else if (event.detail.objects && event.detail.objects.indexOf(value) !== -1) {
          this.throttle(this.objectMutatedThrottled, prop);
          return;
        }
      }
    }
    /**
     * This function is called when `object-mutated` event is observed
     * and changed object is a property of the node.
     * @param {string} prop - Mutated object property name.
     */
    objectMutatedThrottled(prop) {
      if (this['propMutated']) this['propMutated'](prop);
      if (this[prop + 'Mutated']) this[prop + 'Mutated']();
      this.dispatchChange();
    }
    /**
     * Callback when `IoNode` is connected.
     */
    connectedCallback() {
      this.__isConnected = true;
      this.__listeners.connect();
      this.__properties.connect();
      if (this.__observedProps.length) {
        window.addEventListener('object-mutated', this.objectMutated);
      }
      this.queueDispatch();
    }
    /**
     * Callback when `IoNode` is disconnected.
     */
    disconnectedCallback() {
      this.__isConnected = false;
      this.__listeners.disconnect();
      this.__properties.disconnect();
      if (this.__observedProps.length) {
        window.removeEventListener('object-mutated', this.objectMutated);
      }
    }
    /**
     * Disposes all internals.
     * Use this when node is no longer needed.
     */
    dispose() {
      this.__queue.dispose();
      this.__bindings.dispose();
      this.__listeners.dispose();
      this.__properties.dispose();
    }
    /**
     * Wrapper for addEventListener.
     * @param {string} type - listener name.
     * @param {function} listener - listener handler.
     * @param {Object} options - event listener options.
     */
    addEventListener(type, listener, options) {
      if (typeof listener !== 'function') {
        console.warn(`Io ${this.constructor.name} "${type}" listener handler is not a function`);
        return;
      }
      this.__listeners.addEventListener(type, listener, options);
    }
    /**
     * Wrapper for removeEventListener.
     * @param {string} type - event name to listen to.
     * @param {function} listener - listener handler.
     * @param {Object} options - event listener options.
     */
    removeEventListener(type, listener, options) {
      this.__listeners.removeEventListener(type, listener, options);
    }
    /**
     * Wrapper for dispatchEvent.
     * @param {string} type - event name to dispatch.
     * @param {Object} detail - event detail.
     * @param {boolean} bubbles - event bubbles.
     * @param {HTMLElement|IoNode} src source node/element to dispatch event from.
     */
    dispatchEvent(type, detail, bubbles = false, src) {
      this.__listeners.dispatchEvent(type, detail, bubbles, src);
    }
    /**
     * Adds property change to the queue.
     * @param {string} prop - Property name.
     * @param {*} value - Property value.
     * @param {*} oldValue - Old property value.
     */
    queue(prop, value, oldValue) {
      this.__queue.queue(prop, value, oldValue);
    }
    /**
     * Dispatches the queue.
     */
    queueDispatch() {
      if (this.lazy) {
        preThrottleQueue.push(this.queueDispatchLazy);
        this.throttle(this.queueDispatchLazy);
      } else {
        this.__queue.dispatch();
      }
    }
    queueDispatchLazy() {
      this.__queue.dispatch();
    }
    /**
     * Throttles function execution to next frame (rAF) if the function has been executed in the current frame.
     * @param {function} func - Function to throttle.
     * @param {*} arg - argument for throttled function.
     * @param {boolean} asynchronous - execute with timeout.
     */
    throttle(func, arg, asynchronous) {
      // TODO: move to extenal throttle function, document and test.
      if (preThrottleQueue.indexOf(func) === -1) {
        preThrottleQueue.push(func);
        if (!asynchronous) {
          func(arg);
          return;
        }
      }
      if (throttleQueue.indexOf(func) === -1) {
        throttleQueue.push(func);
      }
      // TODO: improve argument handling. Consider edge-cases.
      if (argQueue.has(func) && typeof arg !== 'object') {
        const queue = argQueue.get(func);
        if (queue.indexOf(arg) === -1) queue.push(arg);
      } else {
        argQueue.set(func, [arg]);
      }
    }
    // TODO: implement fAF debounce
    requestAnimationFrameOnce(func) {
      requestAnimationFrameOnce(func);
    }
    filterObject(object, predicate, _depth = 5, _chain = [], _i = 0) {
      if (_chain.indexOf(object) !== -1) return; _chain.push(object);
      if (_i > _depth) return; _i++;
      if (predicate(object)) return object;
      for (let key in object) {
        const value = object[key] instanceof Binding ? object[key].value : object[key];
        if (predicate(value)) return value;
        if (typeof value === 'object') {
          const subvalue = this.filterObject(value, predicate, _depth, _chain, _i);
          if (subvalue) return subvalue;
        }
      }
    }
    filterObjects(object, predicate, _depth = 5, _chain = [], _i = 0) {
      const result = [];
      if (_chain.indexOf(object) !== -1) return result; _chain.push(object);
      if (_i > _depth) return result; _i++;
      if (predicate(object) && result.indexOf(object) === -1) result.push(object);
      for (let key in object) {
        const value = object[key] instanceof Binding ? object[key].value : object[key];
        if (predicate(value) && result.indexOf(value) === -1) result.push(value);
        if (typeof value === 'object') {
          const results = this.filterObjects(value, predicate, _depth, _chain, _i);
          for (let i = 0; i < results.length; i++) {
            if (result.indexOf(results[i]) === -1) result.push(results[i]);
          }
        }
      }
      return result;
    }
    import(path) {
      const importPath = new URL(path, window.location).href;
      return new Promise(resolve => {
        if (!path || IMPORTED_PATHS[importPath]) {
          resolve(importPath);
        } else {
          import(importPath)
          .then(() => {
            IMPORTED_PATHS[importPath] = true;
            resolve(importPath);
          });
        }
      });
    }
  };
  classConstructor.Register = Register;
  return classConstructor;
};

/**
 * Register function to be called once per class.
 */
const Register = function () {
  const protochain = new ProtoChain(this.prototype);
  let proto = this.prototype;

  Object.defineProperty(proto, '__isIoNode', {value: true});
  Object.defineProperty(proto.constructor, '__isRegisteredAs', {value: proto.constructor.name});  

  Object.defineProperty(proto, '__protochain', {value: protochain});

  Object.defineProperty(proto, '__protoFunctions', {value: new ProtoFunctions(protochain)});
  Object.defineProperty(proto, '__protoProperties', {value: new ProtoProperties(protochain)});
  Object.defineProperty(proto, '__protoListeners', {value: new ProtoListeners(protochain)});

  Object.defineProperty(proto, '__observedProps', {value: []});
  for (let p in proto.__protoProperties) {
    if (proto.__protoProperties[p].observe) proto.__observedProps.push(p);
  }

  for (let p in proto.__protoProperties) {
    Object.defineProperty(proto, p, {
      get: function() {
        return this.__properties.get(p);
      },
      set: function(value) {
        this.__properties.set(p, value);
      },
      enumerable: !!proto.__protoProperties[p].enumerable,
      configurable: true,
    });
  }
};

IoNodeMixin.Register = Register;

/**
 * IoNodeMixin applied to `Object` class.
 */
class IoNode extends IoNodeMixin(Object) {}

IoNode.Register();

const IMPORTED_PATHS = {};

// TODO: document and test
const preThrottleQueue = new Array();
const throttleQueue = new Array();
const argQueue = new WeakMap();
//
const funcQueue = new Array();

const animate = function() {
  requestAnimationFrame(animate);
  for (let i = preThrottleQueue.length; i--;) {
    preThrottleQueue.splice(preThrottleQueue.indexOf(preThrottleQueue[i]), 1);
  }
  for (let i = throttleQueue.length; i--;) {
    const queue = argQueue.get(throttleQueue[i]);
    for (let p = queue.length; p--;) {
      throttleQueue[i](queue[p]);
      queue.splice(queue.indexOf(p), 1);
    }
    throttleQueue.splice(throttleQueue.indexOf(throttleQueue[i]), 1);
  }
  //
  for (let i = funcQueue.length; i--;) {
    const func = funcQueue[i];
    funcQueue.splice(funcQueue.indexOf(func), 1);
    func();
  }
};
requestAnimationFrame(animate);

function requestAnimationFrameOnce(func) {
  if (funcQueue.indexOf(func) === -1) funcQueue.push(func);
}


export {IoNode, IoNodeMixin};