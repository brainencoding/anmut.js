import EventEmitter from "./classes/EventEmitter";
import Form from "../classes/Form";
import loadingTemplate from '../templates/loading.template';

class AnmutCore
{
    events = EventEmitter;

    _params = {
        insertTo: null,
        loadingTemplate: loadingTemplate,
    };
    _formConfigsList = [];
    _init = false;
    _steps = [];
    _currentStepIdx = 0;

    _$mainContainer = document.createElement('div');

    constructor(params, formConfigsList)
    {
        this._params = Object.assign(this._params, params);
        this._formConfigsList = formConfigsList;
    }

    _initHandlers()
    {
        this.events.on('Core::ShowLoading', (flag) =>
        {
            let loadingArea = this._$mainContainer.querySelector('[anmut-loading-area]');

            if (!loadingArea) {
                loadingArea = document.createElement('div');
                loadingArea.setAttribute('anmut-loading-area', '');
                this._$mainContainer.prepend(loadingArea);
            }

            if (this._params.loadingTemplate) {
                loadingArea.innerHTML = flag
                    ? this._params.loadingTemplate
                    : '';
            }
        });

        this.events.on('Core::drawCurrentStep', ({dataFields, requestResult} = {}) =>
        {
            let currentStep = this._steps[this._currentStepIdx];

            if (currentStep.isDone) {
                for (let i = 0; i < this._steps.length - 1; i++) {
                    if (!this._steps[i].isDone) {
                        this._currentStepIdx = i;
                        currentStep = this._steps[i];

                        break;
                    }
                }
            }

            const prevStep = this._steps[this._currentStepIdx - 1];

            if (prevStep) {
                currentStep.dataFromPrevForm = dataFields;
                currentStep.dataFromPrevRequest = requestResult;
            }

            this._draw(currentStep.getElement());
        });
    }

    _draw(elementTemplate)
    {
        let wrapper = this._$mainContainer.querySelector('[anmut-wrapper-area]');

        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.setAttribute('anmut-wrapper-area', '');

            this._$mainContainer.appendChild(wrapper);
        }

        wrapper.innerHTML  = '';
        wrapper.appendChild(elementTemplate);
    }

    _initSteps()
    {
        let steps = [];

        for (const formElement of this._formConfigsList) {
            steps.push(
                new Form(formElement),
            );
        }

        this._steps = steps;
    }

    init()
    {
        if (this._init) {
            return this;
        }

        // clear html if _init flag is force editing
        this._$mainContainer.innerHTML = '';
        this._$mainContainer.style.setProperty('position', 'relative');
        this._initHandlers();
        this._initSteps();

        if (!this._params.insertTo || !(this._params.insertTo instanceof HTMLElement)) {
            throw new Error('params.insertTo is undefined or not a HTMLElement');
        }

        this._params.insertTo.appendChild(this._$mainContainer);
        this.events.emit('Core::drawCurrentStep');
    }
}

export default AnmutCore;
