import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import moment from 'moment/src/moment.js';
import 'moment/src/locale/es.js';
import 'moment/src/locale/ca.js';
import 'moment/src/locale/fr.js';

/* @polymerMixin */
let ncDatepickerBehavior = (base) =>
  class extends base {
    constructor() {
      super();
    }

    static get properties() {
      return {
        language: {
          type: String,
          observer: '_languageChanged'
        }
      }
    }

    _languageChanged(){
      if (typeof(moment)!="undefined") {
        moment.locale(this.language);
      }
    }
  };
  export const MixinDatepicker = dedupingMixin(ncDatepickerBehavior);