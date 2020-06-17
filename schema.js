const layout = {
    'items': [{
        'type': 'section',
        'label': 'Dynamic Form',
        'items': [{
            'type': 'field',
            'ref': 'model'
        }, {
            'type': 'field',
            'ref': 'mode',
            'actions': [{
                'action': 'updateOptions',
                'script': function (actionItem, ctx) {
                    if (ctx.params.model === 'M2') {
                        return [{
                            'key': 'C',
                            'value': 'Mode C'
                        }, {
                            'key': 'D',
                            'value': 'Mode D'
                        }, {
                            'key': 'A',
                            'value': 'Mode A'
                        }];
                    } else {
                        return actionItem.item.field.defaultOptions;
                    }
                }
            }]
        }, {
            'type': 'field',
            'ref': 'gender',
            'hidden': 'true',
            'actions': [{
                'action': 'show',
                'when': 'params.model !== "M1" && params.mode === "A"'
            }, {
                'action': 'script',
                'when': 'params.mode === "B"',
                'script': function (action, ctx) {
                    console.log('~~~ executed script ~~~ :)', action, ctx);
                }
            }]
        }, {
            'type': 'field',
            'ref': 'recommendations'
        }, {
            'type': 'group',
            'label': 'Check Boxes',
            'hidden': true,
            'items': [{
                'type': 'field',
                'ref': 'fieldBoolean'
            }, {
                'type': 'field',
                'ref': 'fieldCheckbox'
            }],
            'actions': [{
                'action': 'show',
                'when': 'params.model !== "M1"'
            }]
        }, {
            'type': 'field',
            'ref': 'fieldRadio'
        }, {
            'type': 'field',
            'ref': 'fieldMultiline'
        }]
    }]
};

var fields = {
    'type': 'object',
    'properties': {
        'model': {
            'type': 'string',
            'label': 'Model',
            'format': 'dropdown',
            'default': 'M2',
            'options': [{
                'key': 'M1',
                'value': 'Model 1'
            }, {
                'key': 'M2',
                'value': 'Model 2'
            }]
        },
        'mode': {
            'type': 'string',
            'label': 'Mode',
            'format': 'dropdown',
            'options': [{
                'key': 'A',
                'value': 'Mode A'
            }, {
                'key': 'B',
                'value': 'Mode B'
            }]
        },
        'gender': {
            'type': 'string',
            'label': 'Gender',
            'format': 'dropdown',
            'options': [{
                'key': 'M',
                'value': 'Male'
            }, {
                'key': 'F',
                'value': 'Female'
            }]
        },
        'recommendations': {
            'type': 'integer',
            'format': 'dropdown',
            'min': 5,
            'max': 10,
            'options': [{
                'key': 1,
                'value': 1
            }, {
                'key': 2,
                'value': 2
            }, {
                'key': 3,
                'value': 3
            }, {
                'key': 4,
                'value': 4
            }, {
                'key': 5,
                'value': 5
            }]
        },
        'fieldBoolean': {
            'type': 'boolean',
            'label': 'Boolean Field'
        },
        'fieldCheckbox': {
            'type': 'checkbox',
            'label': 'Checkbox Field',
            'options': [{
                'key': 'home',
                'value': 'Home'
            }, {
                'key': 'remote',
                'value': 'Remote'
            }]
        },
        'fieldRadio': {
            'type': 'radio',
            'label': 'Radio Field',
            'options': [{
                'key': 'One',
                'value': 'One'
            }, {
                'key': 'Two',
                'value': 'Two'
            }]
        },
        'fieldMultiline': {
            'type': 'string',
            'label': 'Multi Line',
            'format': 'multiline'
        }
    }

};


export default { fields, layout };
