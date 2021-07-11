import { DEFAULT_QUESTION, DEFAULT_OPTION, TYPES } from '../constants'

function Questions({ questions, setQuestions }) {
    const onClickAddQuestion = () => {
        setQuestions([...questions, { ...DEFAULT_QUESTION }])
    }

    const onClickRemoveQuestion = index => {
        if (questions.length === 1) {
            return
        }

        const newQuestions = questions.filter((_, i) => i !== index)
        setQuestions(newQuestions)
    }

    const onClickAddOption = (question, index) => {
        const options = [...question.options, { ...DEFAULT_OPTION }]
        onChangeQuestionProperty(index, 'options', options)
    }

    const onChangeOptionProperty = (questionIndex, optionIndex, prop, newValue) => {
        const question = questions[questionIndex]
        const options = [...question.options]
        options[optionIndex][prop] = newValue
        onChangeQuestionProperty(questionIndex, 'options', options)
    }

    const onClickRemoveOption = (questionIndex, optionIndex) => {
        const question = questions[questionIndex]
        const options = question.options.filter((_, index) => index !== optionIndex)
        onChangeQuestionProperty(questionIndex, 'options', options)
    }

    const onChangeType = (index, type) => {
        if (!['text', 'password', 'number', 'range'].includes(type)) {
            onChangeQuestionProperty(index, 'min', '')
            onChangeQuestionProperty(index, 'max', '')
        }

        if (inputTypeHasOptions(type)) {
            onChangeQuestionProperty(index, 'options', [{ ...DEFAULT_OPTION }])
        } else {
            onChangeQuestionProperty(index, 'options', [])
        }

        onChangeQuestionProperty(index, 'type', type)
    }

    const inputTypeHasOptions = type => ['select', 'checkbox'].includes(type)

    const onChangeLabel = (index, value) => {
        onChangeQuestionProperty(index, 'label', value)
    }

    const onChangeQuestionProperty = (index, prop, value) => {
        const newQuestions = [...questions]
        newQuestions[index][prop] = value
        setQuestions(newQuestions)
    }

    return <div className="section">
        <div className="section-title">Questions</div>
        <div>
            {
                questions.map((question, index) => {
                    return <fieldset key={index} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex' }}>
                            <Label value={question.label} onChange={value => onChangeLabel(index, value)} />
                            <div style={{ display: 'flex', marginLeft: '10px' }}>
                                <button className="remove-question" onClick={() => onClickRemoveQuestion(index)}>
                                    X
                                </button>
                            </div>
                        </div>
                        <Type selected={question.type} onChange={value => onChangeType(index, value)} />
                        <Required value={question.isRequired} onChange={value => onChangeQuestionProperty(index, 'isRequired', value)} />
                        {
                            ['text', 'password', 'number', 'range'].includes(question.type) && <Limits
                                min={question.minValue}
                                max={question.maxValue}
                                onChangeMin={value => onChangeQuestionProperty(index, 'min', value)}
                                onChangeMax={value => onChangeQuestionProperty(index, 'max', value)}
                            />
                        }
                        {
                            inputTypeHasOptions(question.type) && <Options
                                options={question.options}
                                inputType={question.type}
                                onAdd={() => onClickAddOption(question, index)}
                                onRemove={optionIndex => onClickRemoveOption(index, optionIndex)}
                                onChangeProperty={(optionIndex, prop, value) => onChangeOptionProperty(index, optionIndex, prop, value)}
                            />
                        }
                    </fieldset>
                })
            }
        </div>
        <button className="add-question-button" type="button" onClick={onClickAddQuestion}>Add question</button>
    </div>
}

function Limits({ min, max, onChangeMin, onChangeMax }) {
    return <div className="form-group">
        <div>
            <label>Min</label>
            <input type="number" value={min} onChange={e => onChangeMin(e.target.value)} />
        </div>
        <div>
            <label>Max</label>
            <input type="number" value={max} onChange={e => onChangeMax(e.target.value)} />
        </div>
    </div>
}

function Label({ value, onChange }) {
    return <div className="form-group" style={{ width: '100%' }}>
        <label style={{ marginBottom: '1px' }}>Label</label>
        <input style={{ width: '100%' }} type="text" value={value} onChange={e => onChange(e.target.value)} />
    </div>
}

function Type({ selected, onChange }) {
    const getTypeClasses = type => {
        if (type === selected) {
            return 'is-selected'
        }
        return ''
    }

    return <div className="form-group">
        <label>Input Type</label>
        <div>
            {
                TYPES.map(type => {
                    return <button
                        type="button"
                        key={type.value}
                        className={getTypeClasses(type.value)}
                        onClick={() => onChange(type.value)}
                    >{type.label}</button>
                })
            }
        </div>
    </div>
}


function Required({ value, onChange }) {
    return <div className="form-group" >
        <label style={{ display: 'inline-block', marginRight: '10px' }}>Is Required?</label>
        <select value={value} onChange={e => onChange(e.target.value)}>
            <option value="1">Yes</option>
            <option value="0">No</option>
        </select>
    </div>
}

function Options({ inputType, options, onAdd, onRemove, onChangeProperty }) {

    const onChangeSelected = (newValue, optionIndex) => {
        if (inputType === 'select' && !newValue) {
            return
        }

        onChangeProperty(optionIndex, 'isSelected', newValue)

        if (inputType === 'select') {
            options.forEach((_, i) => {
                if (i !== optionIndex) {
                    onChangeProperty(i, 'isSelected', !newValue)
                }
            })
        }
    }

    const onClickRemoveOption = index => {
        if (options.length === 1) {
            return
        }

        onRemove(index)
    }

    return <div className="options">
        <label>Options</label>
        <fieldset>
            {
                options.map((option, index) => {
                    return <div className="form-group" key={index}>
                        <div className="w-100" >
                            <label>Label</label>
                            <input value={option.label} onChange={e => onChangeProperty(index, 'label', e.target.value)} />
                        </div>
                        <div className="w-100" >
                            <label>Value</label>
                            <input value={option.value} onChange={e => onChangeProperty(index, 'value', e.target.value)} />
                        </div>
                        <div className="w-100" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: '10px' }}>
                            <button
                                style={{ marginRight: '10px' }} type="button"
                                className={option.isSelected ? 'is-selected' : ''}
                                onClick={() => onChangeSelected(!option.isSelected, index)}
                            >{inputType === 'select' ? 'Is default' : 'Is selected by default'}</button>
                            <button type="button" onClick={() => onClickRemoveOption(index)} >X</button>
                        </div>
                    </div>
                })
            }
            <button type="button" onClick={onAdd}> Add Option</button>
        </fieldset>
    </div>
}


export default Questions