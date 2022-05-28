const Anmut = window.Anmut;

window.anmutInstance = new Anmut(
    {
        insertTo: document.body,
    },
    [
        {
            url: '/path/to/fetch/1',
            templateForm: `
                <input type="text" name="TYPE_1">
                <input type="text" name="NAME_1">
            `
        }, // step 1
        {
            url: '/path/to/fetch/2',
            timer: true,
            stepCondition(responseFetch2Result)
            {
                if (responseFetch2Result) {
                    return true;
                }

                return false
            }
        }, // step 2
        {
            templateForm: `
                <p>Success submitting forms</p>
            `,
        }, // step 3
    ],
);