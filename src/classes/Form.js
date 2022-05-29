import EventEmitter from "../core/classes/EventEmitter";

class Form
{
    events = EventEmitter;
    dataFromPrevForm = {};
    dataFromPrevRequest = {};
    $form = document.createElement('form');

    isDone = false;

    constructor(props)
    {
        this.props = props;
    }

    requestHandler(dataFields)
    {
        this.events.emit('Core::ShowLoading', true);

        this.isDone = true;
        this.events.emit('Core::drawCurrentStep', {
            dataFields: dataFields,
            requestResult: {}
        });
        this.events.emit('Core::ShowLoading', false);
    }

    formHandler(event)
    {
        event.preventDefault();
        event.stopPropagation();

        let fields = {};
        const inputs = event.target.querySelectorAll('input[name][type]');

        for (const input of inputs) {
            const name = input.getAttribute('name');
            const type = input.getAttribute('type');

            if (type === 'file') {
                const dataList = {};

                for (let i = 0; i < input.files.length; i++) {
                    dataList[name + '[' + i + ']'] = input.files[i];
                }

                fields = {
                    ...fields,
                    ...dataList,
                };
            } else {
                fields[name] = input.value;
            }
        }

        this.requestHandler(fields);
    }

    initForm()
    {
        this.$form.innerHTML = this.props.templateForm instanceof Function
            ? this.props.templateForm(this.dataFromPrevForm, this.dataFromPrevRequest)
            : this.props.templateForm;

        this.$form.removeEventListener('submit', this.formHandler.bind(this));
        this.$form.addEventListener('submit', this.formHandler.bind(this));
    };

    getElement()
    {
        this.initForm();
        return this.$form;
    }
}

export default Form;