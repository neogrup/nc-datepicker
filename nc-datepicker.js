import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/polymer/lib/utils/async.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@neogrup/nc-icons/nc-icons.js';
import '@neogrup/nc-combo/nc-combo.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker-light.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { MixinDatepicker } from './nc-datepicker-behavior.js';
import moment from 'moment/src/moment.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="vaadin-date-picker-overlay-content-custom" theme-for="vaadin-date-picker-overlay-content">
  <template>
  <style>
      :host{
        --lumo-font-family: 'Roboto', 'Noto', sans-serif;
        --lumo-font-size-m: 14px;
        --lumo-font-size-l: 14px;
      }
      [part="toolbar"] {
        background: #ffffff;
        box-shadow: 0 -1px 4px 0 rgba(0, 0, 0, 0.5) !important;
        margin-right: 0px !important;
      }
      [part="toolbar"] [part\$="button"] {
        color: #FF9800;
        cursor: pointer;
        text-transform: uppercase;
      }
    </style>
  </template>
</dom-module>
<dom-module id="month-calendar-custom" theme-for="vaadin-month-calendar">
  <template>
    <style>
    
      [part~="date"][selected] {
        color: #fff;
        background-color: #262b66;
      }
      [part~="date"][focused] {
        color: #fff;
        background-color: #262b66;
      }
      [part="weekdays"], #days {
        padding: 0 8px;
      }
      [part~="weekdays"] {
        text-transform: capitalize;
      }
      [part~="month-header"] {
        text-transform: capitalize;
        padding: 10px;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

class NcDatepicker extends mixinBehaviors([AppLocalizeBehavior], MixinDatepicker(PolymerElement)) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        .dateTypeSelector{
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }


        .dateSelectorYear{
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }

        .dateSelectorMonth{
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }

        .dateSelectorDay{
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }

        .dateSelectorRange{
          @apply --layout-horizontal;
          @apply --layout-center-justified;
        }

      </style>

      <nc-icons></nc-icons>

      <div>
        <div class="dateTypeSelector">
          <div><paper-icon-button icon="nc-icons:calendar_365" on-tap="_changeDateTypeSelector" data-date-selector="year"></paper-icon-button></div>
          <div><paper-icon-button icon="nc-icons:calendar_31" on-tap="_changeDateTypeSelector" data-date-selector="month"></paper-icon-button></div>
          <div><paper-icon-button icon="nc-icons:calendar_1" on-tap="_changeDateTypeSelector" data-date-selector="day"></paper-icon-button></div>
          <div><paper-icon-button icon="nc-icons:calendar_range" on-tap="_changeDateTypeSelector" data-date-selector="range"></paper-icon-button></div>
        </div>
        
        <div hidden\$="{{!showYearSelector}}">
          <div class="dateSelectorYear">
            <div style="width: 80px">
              <nc-combo 
                  id="dateSelectorYear" 
                  label="{{localize('INPUT_YEAR')}}" 
                  no-label-float
                  combo-list-data="{{dataDateSelectorYearList}}" 
                  url-translate="/static/translations.json" 
                  required-message="INPUT_ERROR_REQUIRED" 
                  id-field="id" 
                  value="{{dateSelectorYearValue}}" 
                  required 
                  language="{{language}}">
              </nc-combo>
            </div>
          </div>
        </div>

        <div hidden\$="{{!showMonthSelector}}" >
          <div class="dateSelectorMonth">
            <div style="width: 70px;margin: 0 10px;">
              <nc-combo 
                  id="dateSelectorMonthYear" 
                  label="{{localize('INPUT_YEAR')}}" 
                  no-label-float
                  combo-list-data="{{dataDateSelectorYearList}}" 
                  url-translate="/static/translations.json" 
                  required-message="INPUT_ERROR_REQUIRED" 
                  id-field="id" 
                  value="{{dateSelectorMonthYearValue}}" 
                  required 
                  language="{{language}}">
              </nc-combo>
            </div>
            <div style="width: 120px;margin: 0 10px;">
              <nc-combo 
                  id="dateSelectorMonth" 
                  label="{{localize('INPUT_MONTH')}}" 
                  no-label-float
                  combo-list-data="{{dataDateSelectorMonthList}}" 
                  url-translate="/static/translations.json" 
                  required-message="INPUT_ERROR_REQUIRED" 
                  id-field="id" 
                  value="{{dateSelectorMonthValue}}" 
                  required language="{{language}}">
              </nc-combo>
            </div>
          </div>
        </div>

        <div hidden\$="{{!showDaySelector}}">
          <div class="dateSelectorDay">
            <div style="width: 95px">
              <vaadin-date-picker-light id="datePickerDay" on-value-changed="_dateSelectorDayValueChanged" attr-for-value="value" value="{{dateSelectorDayValue}}">
                <paper-input label="{{localize('INPUT_DATE')}}" no-label-float style="cursor: pointer"></paper-input>  
              </vaadin-date-picker-light>
            </div>
          </div>
        </div>

        <div hidden\$="{{!showRangeSelector}}">
          <div class="dateSelectorRange">
            <div style="width: 95px;margin: 0 5px;">
              <vaadin-date-picker-light id="datePickerDay" on-value-changed="_dateSelectorRangeStartValueChanged" attr-for-value="value" value="{{dateSelectorRangeStartValue}}">
                <paper-input label="{{localize('INPUT_DATE_START')}}" no-label-float style="cursor: pointer"></paper-input>  
              </vaadin-date-picker-light>
            </div>
            <div style="width: 95px;margin: 0 5px;">
              <vaadin-date-picker-light id="datePickerDay" on-value-changed="_dateSelectorRangeEndValueChanged" attr-for-value="value" value="{{dateSelectorRangeEndValue}}">
                <paper-input label="{{localize('INPUT_DATE_END')}}" no-label-float style="cursor: pointer"></paper-input>
              </vaadin-date-picker-light>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  static get properties() {
    return {
      language: {
        type: String,
        value: 'es'
      },
      defaultDateSelector: {
        type: String,
        value: 'day'
      },
      defaultDateValue: {
        type: String,
      },
      showYearSelector: {
        type: Boolean,
        value: false,
        notify: true
      },
      showMonthSelector: {
        type: Boolean,
        value: false,
        notify: true
      },
      showDaySelector: {
        type: Boolean,
        value: false,
        notify: true
      },
      showRangeSelector: {
        type: Boolean,
        value: false,
        notify: true
      },
      dateSelectorYearValue: {
        type: String,
        notify: true,
        observer: '_dateSelectorYearValueChanged'
      },
      dateSelectorMonthYearValue: {
        type: String,
        notify: true,
        observer: '_dateSelectorMonthValueChanged'
      },
      dateSelectorMonthValue: {
        type: String,
        notify: true,
        observer: '_dateSelectorMonthValueChanged'
      },
      dateSelectorDayValue: {
        type: String,
        notify: true
      },
      dateSelectorRangeStartValue: {
        type: String,
        notify: true
      },
      dateSelectorRangeEndValue: {
        type: String,
        notify: true
      },
      datePickerStartValue: {
        type: String,
        notify: true
      },
      datePickerEndValue: {
        type: String,
        notify: true
      },
    };
  }

  static get importMeta() { 
    return import.meta; 
  }

  connectedCallback() {
    super.connectedCallback();
    this.useKeyIfMissing = true;

    this.loadResources(this.resolveUrl('./static/translations.json'));

    setTimeout(() => this._setDatePickerLanguage(), 100);     
    setTimeout(() => this._setYearList(), 100);     
    setTimeout(() => this._setMonthList(), 100);
    setTimeout(() => this._changeDateTypeSelector(), 100);
  }

  _setDatePickerLanguage() {
    if(typeof this.localize === 'undefined') return;

    let datepickers = this.shadowRoot.querySelectorAll("vaadin-date-picker-light");
    datepickers.forEach((datepicker) => {
      datepicker.i18n = {
        monthNames: moment.months(),
        weekdays: moment.weekdays(),
        weekdaysShort: moment.weekdaysShort(),
        firstDayOfWeek: moment.localeData().firstDayOfWeek(),
        week: this.localize('DATEPICKER_WEEK'),
        calendar: this.localize('DATEPICKER_CALENDAR'),
        clear: this.localize('DATEPICKER_CLEAR'),
        today: this.localize('DATEPICKER_TODAY'),
        cancel: this.localize('DATEPICKER_CANCEL'),
        formatDate: function(d) {
          return moment(d).format(moment.localeData().longDateFormat('L'));
        },
        parseDate: function(s) {
          const date = moment(s, moment.localeData().longDateFormat('L')).toDate();
          return {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
          };
        },
        formatTitle: function(monthName, fullYear) {
          return monthName + ' ' + fullYear;
        }
      }
    });
  }

  _setYearList(){
    // Year 
    let yearInit = moment().format('YYYY');
    let yearElement = {};
    let dataDateSelectorYearList = [];

    for (let index = 0; index < 10; index++) {
      yearElement = {id: yearInit - index, name: yearInit - index};
      dataDateSelectorYearList.push(yearElement);
    }

    this.dataDateSelectorYearList = {
      data: dataDateSelectorYearList
    };
  }

  _setMonthList(){
    // Month
    this.dataDateSelectorMonthList = {
      data: [
        {id: '01', name: this.localize('INPUT_MONTH_01')},
        {id: '02', name: this.localize('INPUT_MONTH_02')},
        {id: '03', name: this.localize('INPUT_MONTH_03')},
        {id: '04', name: this.localize('INPUT_MONTH_04')},
        {id: '05', name: this.localize('INPUT_MONTH_05')},
        {id: '06', name: this.localize('INPUT_MONTH_06')},
        {id: '07', name: this.localize('INPUT_MONTH_07')},
        {id: '08', name: this.localize('INPUT_MONTH_08')},
        {id: '09', name: this.localize('INPUT_MONTH_09')},
        {id: '10', name: this.localize('INPUT_MONTH_10')},
        {id: '11', name: this.localize('INPUT_MONTH_11')},
        {id: '12', name: this.localize('INPUT_MONTH_12')}
      ]
    };
  }

  _changeDateTypeSelector(e){
    this.showYearSelector = false;
    this.showMonthSelector = false;
    this.showDaySelector = false;
    this.showRangeSelector = false;
    
    let dateSelector;

    let currentYear = moment().format('YYYY');
    let currentMonth = moment().format('MM');
    let currentDay = moment().format('YYYY-MM-DD');

    if (e) {
      dateSelector = e.target.dataset.dateSelector;
    } else {
      dateSelector = this.defaultDateSelector;
      if (this.defaultDateValue){
        currentYear = moment(this.defaultDateValue).format('YYYY');
        currentMonth = moment(this.defaultDateValue).format('MM');
        currentDay = moment(this.defaultDateValue).format('YYYY-MM-DD');
        this.datePickerStartValue = moment(this.defaultDateValue).add(-30,'days').format('YYYY-MM-DD');
        this.datePickerEndValue = moment(this.defaultDateValue).format('YYYY-MM-DD');
      } else {
        this.datePickerStartValue = moment().add(-30,'days').format('YYYY-MM-DD');
        this.datePickerEndValue = moment().format('YYYY-MM-DD');
      }
    }

    

    switch (dateSelector) {
      case 'year':
        this.showYearSelector = true;
        this.dateSelectorYearValue = currentYear;
        this.datePickerStartValue = currentYear + '0101';
        this.datePickerEndValue = currentYear + '1231';
        break;
      case 'month':
        this.showMonthSelector = true;
        this.dateSelectorMonthYearValue = currentYear;
        this.dateSelectorMonthValue = currentMonth;
        this.datePickerStartValue = currentYear + currentMonth + '01';
        this.datePickerEndValue = currentYear + currentMonth + moment().endOf('month').format('DD');
        break;
      case 'day':
        this.showDaySelector = true;
        this.dateSelectorDayValue = currentDay;
        this.datePickerStartValue = currentDay.replace(/-/gi,'');
        this.datePickerEndValue = currentDay.replace(/-/gi,'');
        break;
      case 'range':
        this.showRangeSelector = true;
        this.dateSelectorRangeStartValue = moment(this.datePickerStartValue).format('YYYY-MM-DD');
        this.dateSelectorRangeEndValue = moment(this.datePickerEndValue).format('YYYY-MM-DD');
        break;
      default:
        break;
    }
  }

  _dateSelectorYearValueChanged(){
    let selectedDateSelectorYearIndex = this.$.dateSelectorYear.shadowRoot.querySelector('paper-dropdown-menu').querySelector('paper-listbox').indexOf(this.$.dateSelectorYear.shadowRoot.querySelector('paper-dropdown-menu').querySelector('paper-listbox').selectedItem);
    if (selectedDateSelectorYearIndex == -1) return;
    this.datePickerStartValue = this.dateSelectorYearValue + '0101';
    this.datePickerEndValue = this.dateSelectorYearValue + '1231';
  }

  _dateSelectorMonthValueChanged(){
    let selectedDateSelectorMonthYearIndex = this.$.dateSelectorMonthYear.shadowRoot.querySelector('paper-dropdown-menu').querySelector('paper-listbox').indexOf(this.$.dateSelectorMonthYear.shadowRoot.querySelector('paper-dropdown-menu').querySelector('paper-listbox').selectedItem);
    let selectedDateSelectorMonthIndex = this.$.dateSelectorMonth.shadowRoot.querySelector('paper-dropdown-menu').querySelector('paper-listbox').indexOf(this.$.dateSelectorMonth.shadowRoot.querySelector('paper-dropdown-menu').querySelector('paper-listbox').selectedItem);
    if ((selectedDateSelectorMonthYearIndex == -1) || (selectedDateSelectorMonthIndex == -1)) return;
    this.datePickerStartValue = this.dateSelectorMonthYearValue + this.dateSelectorMonthValue + '01';
    this.datePickerEndValue = this.dateSelectorMonthYearValue + this.dateSelectorMonthValue + moment(this.dateSelectorMonthYearValue + this.dateSelectorMonthValue).endOf('month').format('DD');
  }

  _dateSelectorDayValueChanged(e){
    if (!e.detail.value) return;
    this.datePickerStartValue =  e.detail.value.replace(/-/gi,'');
    this.datePickerEndValue =  e.detail.value.replace(/-/gi,'');
  }
  
  _dateSelectorRangeStartValueChanged(e){
    if (!e.detail.value) return;
    this.datePickerStartValue =  e.detail.value.replace(/-/gi,'');
  }

  _dateSelectorRangeEndValueChanged(e){
    if (!e.detail.value) return;
    this.datePickerEndValue = e.detail.value.replace(/-/gi,'');
  }
  
}

window.customElements.define('nc-datepicker', NcDatepicker);
