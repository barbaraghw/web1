import { SIRIUS_TYPES, SiriusElement } from "./SiriusElement";
import { deepFreeze } from "./utils/deep-freeze.js";

export const SIRIUS_RADIO = deepFreeze({
    NAME: "SiriusRadio",
    TAG: "siriusradio",
    ATTRIBUTES: {
        LABEL: { NAME: "label", DEFAULT: "", TYPE: SIRIUS_TYPES.STRING },
        SELECTED: { NAME: "selected", DEFAULT: false, TYPE: SIRIUS_TYPES.BOOLEAN },
        DISABLED: { NAME: "disabled", DEFAULT: false, TYPE: SIRIUS_TYPES.BOOLEAN },
    },
    CLASSES: {
        CONTAINER: 'radio-container',
        LABEL: 'radio-label',
        INPUT: 'radio-input',
        SELECTED: 'radio-selected',
        DISABLED: 'radio-disabled',
    }
});

export class SiriusRadio extends SiriusElement {
    constructor(props) {
        super(props, SIRIUS_RADIO.NAME);

        this._loadAttributes({
            htmlAttributes: SIRIUS_RADIO.ATTRIBUTES,
            properties: props
        });

        SIRIUS.logger.log(`Creando el SiriusRadio con el ID: ${props.id}`);

    }

    #getTemplate() {
        const inputClasses = [SIRIUS_RADIO.CLASSES.INPUT];

        if (this.attributes[SIRIUS_RADIO.ATTRIBUTES.SELECTED.NAME]) {
            inputClasses.push(SIRIUS_RADIO.CLASSES.SELECTED);
        }

        if (this.attributes[SIRIUS_RADIO.ATTRIBUTES.DISABLED.NAME]) {
            inputClasses.push(SIRIUS_RADIO.CLASSES.DISABLED);
        }

        return `
            <div class="${SIRIUS_RADIO.CLASSES.CONTAINER}">
                <input 
                    type="radio" 
                    class="${inputClasses.join(' ')}" 
                    ${this.attributes[SIRIUS_RADIO.ATTRIBUTES.DISABLED.NAME] ? 'disabled' : ''} 
                    ${this.attributes[SIRIUS_RADIO.ATTRIBUTES.SELECTED.NAME] ? 'checked' : ''}
                >
                <label class="${SIRIUS_RADIO.CLASSES.LABEL}">
                    ${this.attributes[SIRIUS_RADIO.ATTRIBUTES.LABEL.NAME]}
                </label>
            </div>`;
    }

    async connectedCallback() {
        await this._loadElementStyles();
        const innerHTML = this.#getTemplate();
        await this._createTemplate(innerHTML);
        this.containerElement = this._templateContent.firstChild;
        this.shadowRoot.appendChild(this.containerElement);
        this.dispatchBuiltEvent();
    }

    handleChange(event) {
        this.attributes[SIRIUS_RADIO.ATTRIBUTES.SELECTED.NAME] = event.target.checked;
    }   
}

customElements.define(SIRIUS_RADIO.TAG, SiriusRadio);
