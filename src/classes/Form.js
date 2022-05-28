import EventEmitter from "../core/classes/EventEmitter";

class Form
{
    events = EventEmitter;
    $form = document.createElement('form');
    _state = Object.create({});

    isDone = false;

    constructor(props)
    {
        console.log( props)
    }

//Core::ShowLoading

    request()
    {

    }


    getTemplate()
    {
        return `
            <p>Test</p>
        `
    }
}

export default Form;