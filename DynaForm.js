const _ = window._;
const m = window.m;

class InputField {
    constructor(vnode) {
        this.input = vnode.attrs.input;
        this.state = vnode.attrs.state;
        this.componentFactory = vnode.attrs.componentFactory;
    }

    view() {
        const comp = this.componentFactory.getComponent(this.input);
        return m(comp, { input: this.input, state: this.state });
    }

    getBaseAttributes() {
        let attrs = {
            id: this.input.ref,
            name: this.input.ref
        };

        if (this.input.ref in this.state.params) {
            attrs.value = this.state.params[this.input.ref];
        }
        return attrs;
    }
}

class FieldLabel {
    constructor(vnode) {
        this.input = vnode.attrs.input;
    }

    view() {
        return m('label[class=col-sm-2 col-form-label]',
            { 'for': this.input.ref },
            this.getLabel());
    }

    getLabel() {
        if ('label' in this.input) {
            return this.input.label;
        } else if ('label' in this.input.field) {
            return this.input.field.label;
        } else {
            return this.input.ref;
        }
    }
}

class CheckboxLabel extends FieldLabel {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        return m('div[class=col-sm-2]', super.getLabel());
    }
}

class InputText extends InputField {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        let attrs = super.getBaseAttributes();

        return m('div[class=.dyn-field form-group row]', { 'class': this.input.hidden ? 'd-none' : '' }, [
            m(FieldLabel, { input: this.input }),
            m('div[class=col-sm-10]', [
                m('input[type=text][class=form-control]', attrs)
            ])
        ]);
    }
}

class InputInteger extends InputField {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        let attrs = super.getBaseAttributes();

        return m('div[class=.dyn-field form-group row]', { 'class': this.input.hidden ? 'd-none' : '' }, [
            m(FieldLabel, { input: this.input }),
            m('div[class=col-sm-10]', [
                m('input[type=number][class=form-control]', {
                    ...attrs,
                    'min': this.input.field.min,
                    'max': this.input.field.max
                })
            ])
        ]);
    }
}

class InputSelect extends InputField {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        let attrs = super.getBaseAttributes();

        return m('div[class=.dyn-field form-group row]', { 'class': this.input.hidden ? 'd-none' : '' }, [
            m(FieldLabel, { input: this.input }),
            m('div[class=col-sm-10]', [
                m('select[class=form-control]', attrs, [
                    m('option[disabled][selected][value]', '-- select an option --'),
                    this.input.field.options.map(opt => {
                        return m('option', {
                            'value': opt.key,
                            'selected': (('value' in attrs) && attrs.value === opt.key) ? true : false
                        }, opt.value);
                    })
                ])
            ])
        ]);
    }
}

class InputBoolean extends InputField {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        let attrs = super.getBaseAttributes();

        return m('div[class=.dyn-field form-group row]', { 'class': this.input.hidden ? 'd-none' : '' }, [
            m(CheckboxLabel, { input: this.input }),
            m('div[class=col-sm-10]', [
                m('div[class=form-check]', [
                    m('input[type=checkbox][class=form-check-input]', {
                        ...attrs,
                        'value': (('value' in attrs) && attrs.value) ? true : false,
                        'checked': (('value' in attrs) && attrs.value) ? true : false
                    }),
                ])
            ])
        ]);
    }
}

class InputCheckbox extends InputField {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        let attrs = super.getBaseAttributes();

        return m('div[class=.dyn-field form-group row]', { 'class': this.input.hidden ? 'd-none' : '' }, [
            m(CheckboxLabel, { input: this.input }),
            m('div[class=col-sm-10]', [
                ('options' in this.input.field)
                    ? this.input.field.options.map(opt => {
                        return m('div[class=form-check]', [
                            m('input[type=checkbox][class=form-check-input][data-format=multiselect]', {
                                ...attrs,
                                'value': opt.key,
                                'checked': (('value' in attrs) && attrs.value.includes(opt.key)) ? true : false
                            }),
                            m('label[class=form-check-label]', { 'for': this.input.ref }, opt.value)
                        ]);
                    })
                    : m('div[class=form-check]', [
                        m('input[type=checkbox][class=form-check-input]', {
                            ...attrs,
                            'value': (('value' in attrs) && attrs.value) ? true : false,
                            'checked': (('value' in attrs) && attrs.value) ? true : false
                        })
                    ])
            ])
        ]);
    }
}

class InputRadio extends InputField {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        let attrs = super.getBaseAttributes();

        return m('div[class=.dyn-field form-group row]', { 'class': this.input.hidden ? 'd-none' : '' }, [
            m(CheckboxLabel, { input: this.input }),
            m('div[class=col-sm-10]', [
                this.input.field.options.map(opt => {
                    return m('div[class=form-check]', [
                        m('input[type=radio][class=form-check-input]', {
                            ...attrs,
                            'value': opt.key,
                            'checked': (('value' in attrs) && attrs.value === opt.key) ? true : false
                        }),
                        m('label[class=form-check-label]', { 'for': this.input.ref }, opt.value)
                    ]);
                })
            ])
        ]);
    }
}

class InputTextArea extends InputField {
    constructor(vnode) {
        super(vnode);
    }

    view() {
        let attrs = super.getBaseAttributes();

        return m('div[class=.dyn-field form-group row]', { 'class': this.input.hidden ? 'd-none' : '' }, [
            m(FieldLabel, { input: this.input }),
            m('div[class=col-sm-10]', [
                m('textarea[rows=5][class=form-control]', attrs)
            ])
        ]);
    }
}

class LayoutItem {
    constructor(vnode) {
        this.layoutItem = vnode.attrs.layoutItem;
        this.state = vnode.attrs.state;
        this.componentFactory = vnode.attrs.componentFactory;
    }

    view() {
        if (this.layoutItem.type === 'section') {
            return m('.dyn-section', { 'class': this.layoutItem.hidden ? 'd-none' : '' }, [
                ('label' in this.layoutItem) ? m('h2.section-label', this.layoutItem.label) : '',
                this.layoutItem.items.map(child => {
                    return m(LayoutItem, { layoutItem: child, state: this.state, componentFactory: this.componentFactory });
                })
            ]);
        } else if (this.layoutItem.type === 'group') {
            return m('.dyn-group', { 'class': this.layoutItem.hidden ? 'd-none' : '' }, [
                ('label' in this.layoutItem) ? m('h6.group-label', this.layoutItem.label) : '',
                this.layoutItem.items.map(child => {
                    return m(LayoutItem, { layoutItem: child, state: this.state, componentFactory: this.componentFactory });
                })
            ]);
        } else if (this.layoutItem.type === 'field' && 'field' in this.layoutItem) {
            return m(InputField, { input: this.layoutItem, state: this.state, componentFactory: this.componentFactory });
        }
    }
}

class ComponentFactory {
    constructor() {
        this.components = {
            'string': InputText,
            'string_dropdown': InputSelect,
            'string_multiline': InputTextArea,
            'integer': InputInteger,
            'boolean': InputBoolean,
            'checkbox': InputCheckbox,
            'radio': InputRadio
        };
    }

    getComponent(input) {
        const comps = [];
        if (input.field.format) {
            comps.push(input.field.type + '_' + input.field.format);
        }
        comps.push(input.field.type);

        for (const comp of comps) {
            if (comp in this.components) {
                return this.components[comp];
            }
        }
        return this.components['string'];
    }
}

class ActionExecutor {
    constructor(actionItem, action, state) {
        this.actionItem = actionItem;
        this.action = action;
        this.state = state;
    }

    execute() {
        try {
            if (this.action.action === 'show') {
                this.execActionShow();
            } else if (this.action.action === 'hide') {
                this.execActionHide();
            } else if (this.action.action === 'updateOptions' && this.actionItem.item.field.format === 'dropdown') {
                this.execActionUpdateOptions();
            } else if (this.action.action === 'script') {
                this.execActionScript();
            }
        } catch (err) {
            console.warn('Error evaluating action for ', this.actionItem, this.action, err);
        }
    }

    evaluateActionExpression() {
        const expr =('when' in this.action)? this.action.when: true;
        var f = new Function('params', 'return (' + expr + ')');
        var result = f(this.state.params);
        return result;
    }

    execActionShow() {
        if (this.evaluateActionExpression()) {
            this.actionItem.item.hidden = false;
        } else {
            this.actionItem.item.hidden = true;
        }
    }

    execActionHide() {
        if (this.evaluateActionExpression()) {
            this.actionItem.item.hidden = true;
        } else {
            this.actionItem.item.hidden = false;
        }
    }

    execActionUpdateOptions() {
        if (this.action.script && typeof this.action.script === 'function') {
            if (this.evaluateActionExpression()) {
                const newopts = this.action.script(_.cloneDeep(this.actionItem), {'params': _.cloneDeep(this.state.params)});
                if (newopts) {
                    this.actionItem.item.field.options = newopts;
                }
            }
        }
    }

    execActionScript() {
        if (this.action.script && typeof this.action.script === 'function') {
            if (this.evaluateActionExpression()) {
                this.action.script(_.cloneDeep(this.actionItem), {'params': _.cloneDeep(this.state.params)});
            }
        }
    }
}

class DynaForm {
    constructor(vnode) {
        this.schema = vnode.attrs.schema;
        this.params = vnode.attrs.params;
        this.actionItems = [];
        this.componentFactory = new ComponentFactory();
    }

    processLayoutItem(layoutItem, idx, path) {
        const npath = path ? (path + '_' + idx) : (idx + '');
        if (layoutItem.type === 'section' || layoutItem.type === 'group') {
            layoutItem.items.forEach((childItem, cidx) => {
                this.processLayoutItem(childItem, cidx, npath);
            });
        } else if (layoutItem.type === 'field') {
            if (layoutItem.ref in this.schema.fields.properties) {
                layoutItem.field = _.cloneDeep(this.schema.fields.properties[layoutItem.ref]);
                
                if (!this.params) {
                    if (!this.state.params) {
                        this.state.params = {};
                    }
                    if ('default' in layoutItem.field) {
                        this.state.params[layoutItem.ref] = layoutItem.field.default;
                    }
                } else {
                    this.state.params = _.cloneDeep(this.params);
                }

                if ('options' in layoutItem.field) {
                    layoutItem.field.defaultOptions = _.cloneDeep(layoutItem.field.options);
                }
            }
        }

        if (layoutItem.actions && layoutItem.actions.length > 0) {
            this.actionItems.push({
                path: npath,
                item: layoutItem
            });
        }
    }
    
    processActions() {
        this.actionItems.forEach((actionItem) => {
            actionItem.item.actions.forEach((action) => {
                let executor = new ActionExecutor(actionItem, action, this.state);
                executor.execute();
            });
        });
    }

    oninit() {
        this.state = {
            'layout': _.cloneDeep(this.schema.layout)
        };
        this.state.layout.items.forEach((layoutItem, idx) => {
            this.processLayoutItem(layoutItem, idx);
        });
        this.processActions();
    }
    
    view() {
        return m('form', {
            'onchange': (e) => {
                if (e.target.type === 'checkbox') {
                    if (e.target.attributes['data-format'] && e.target.attributes['data-format'].value === 'multiselect') {
                        const opts = this.state.params[e.target.name] || [];
                        if (e.target.checked) {
                            opts.push(e.target.value);
                        } else {
                            const idx = opts.indexOf(e.target.value);
                            if (idx > -1) {
                                opts.splice(idx, 1);
                            }
                        }
                        this.state.params[e.target.name] = opts;
                    } else {
                        this.state.params[e.target.name] = e.target.checked;
                    }
                } else {
                    this.state.params[e.target.name] = e.target.value;
                }
                this.processActions();
            }
        }, this.state.layout.items.map((layoutItem) => {
            return m(LayoutItem, { layoutItem: layoutItem, state: this.state, componentFactory: this.componentFactory });
        }));
    }
}

export default DynaForm;
