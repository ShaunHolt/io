import {html, IoElement} from "../dist/io.js";
import {IoThemeSingleton} from "../dist/io-elements-core.js";

export class IoDemoElementsTheme extends IoElement {
  static get Style() {
    return html`<style>
    :host {
      max-width: 32em;
      padding: var(--io-spacing);
      grid-template-columns: auto 1fr !important;
    }
    :host > *,
    :host .io-row > *:not(:last-child) {
      margin-right: var(--io-spacing);
    }
    :host > *,
    :host .io-column > *:not(:last-child) {
      margin-bottom: var(--io-spacing);
    }
    </style>`;
  }
  static get Properties() {
    return {
      class: 'io-table2',
    };
  }
  constructor(props) {
    super(props);
    this.template([
      ['io-item', {label: 'cssSpacing'}], ['io-slider', {value: IoThemeSingleton.bind('cssSpacing'), min: 0, max: 20, step: 1}],
      ['io-item', {label: 'cssBorderRadius'}], ['io-slider', {value: IoThemeSingleton.bind('cssBorderRadius'), min: 0, max: 20}],
      ['io-item', {label: 'cssBorderWidth'}], ['io-slider', {value: IoThemeSingleton.bind('cssBorderWidth'), min: 0, max: 5, step: 1}],
      ['io-item', {label: 'cssStrokeWidth'}], ['io-slider', {value: IoThemeSingleton.bind('cssStrokeWidth'), min: 0, max: 10, step: 1}],
      ['io-item', {label: 'cssLineHeight'}], ['io-slider', {value: IoThemeSingleton.bind('cssLineHeight'), min: 10, max: 50, step: 1}],
      ['io-item', {label: 'cssFontSize'}], ['io-slider', {value: IoThemeSingleton.bind('cssFontSize'), min: 5, max: 20}],
      ['io-item', {label: 'cssBackgroundColor'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssBackgroundColor'), mode: 0}],
      ['io-item', {label: 'cssBackgroundColorLight'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssBackgroundColorLight'), mode: 0}],
      ['io-item', {label: 'cssBackgroundColorDark'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssBackgroundColorDark'), mode: 0}],
      ['io-item', {label: 'cssBackgroundColorField'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssBackgroundColorField'), mode: 0}],
      ['io-item', {label: 'cssColor'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColor'), mode: 0}],
      ['io-item', {label: 'cssColorError'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColorError'), mode: 0}],
      ['io-item', {label: 'cssColorLink'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColorLink'), mode: 0}],
      ['io-item', {label: 'cssColorFocus'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColorFocus'), mode: 0}],
      ['io-item', {label: 'cssColorField'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColorField'), mode: 0}],
      ['io-item', {label: 'cssColorNumber'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColorNumber'), mode: 0}],
      ['io-item', {label: 'cssColorString'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColorString'), mode: 0}],
      ['io-item', {label: 'cssColorBoolean'}], ['io-color-vector', {value: IoThemeSingleton.bind('cssColorBoolean'), mode: 0}],

    ]);
  }
}

IoDemoElementsTheme.Register();
