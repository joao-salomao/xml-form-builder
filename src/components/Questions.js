import { DEFAULT_QUESTION, TYPES } from '../constants'

function Questions({ questions, setQuestions }) {
    const onClickAddQuestion = () => {
        setQuestions([...questions, { ...DEFAULT_QUESTION }])
    }

    const onClickRemoveQuestion = index => {
        if (questions.length == 1) {
            return
        }

        const newQuestions = questions.filter((_, i) => i !== index)
        setQuestions(newQuestions)
    }

    const onClickAddOption = (question, index) => {
        const options = [...question.options, '']
        onChangeQuestionProperty(index, 'options', options)
    }

    const onChangeOptionText = (questionIndex, optionIndex, newValue) => {
        const question = questions[questionIndex]
        const options = [...question.options]
        options[optionIndex] = newValue
        onChangeQuestionProperty(questionIndex, 'options', options)
    }

    const onClickRemoveOption = (questionIndex, optionIndex) => {
        const question = questions[questionIndex]
        const options = question.options.filter((_, index) => index !== optionIndex)
        onChangeQuestionProperty(questionIndex, 'options', options)
    }

    const onChangeType = (questionIndex, type) => {
        if (type !== 'select') {
            onChangeQuestionProperty(questionIndex, 'options', [])
        }
        onChangeQuestionProperty(questionIndex, 'type', type)
    }

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
                    return <div key={index} style={{ marginBottom: '10px', display: 'flex' }}>
                        <fieldset>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Label value={question.label} onChange={value => onChangeLabel(index, value)} />
                                <div style={{ marginLeft: '10px' }}>
                                    <button className="remove-question" onClick={() => onClickRemoveQuestion(index)}>
                                        X
                                    </button>
                                </div>
                            </div>
                            <Type selected={question.type} onChange={value => onChangeType(index, value)} />
                            <Required value={question.isRequired} onChange={value => onChangeQuestionProperty(index, 'isRequired', value)} />
                            {
                                question.type == 'select' && <Options
                                    options={question.options}
                                    onAdd={() => onClickAddOption(question, index)}
                                    onRemove={optionIndex => onClickRemoveOption(index, optionIndex)}
                                    onChangeText={(optionIndex, text) => onChangeOptionText(index, optionIndex, text)}
                                />
                            }
                        </fieldset>
                    </div>
                })
            }
        </div>
        <button style={{ maxHeight: '30px', fontSize: '15px' }} type="button" onClick={onClickAddQuestion}>Add question</button>
    </div>
}

function Label({ value, onChange }) {
    return <div className="form-group" style={{ width: '100%' }}>
        <label>Label</label>
        <input style={{ width: '100%' }} type="text" required value={value} onChange={e => onChange(e.target.value)} />
    </div>
}

function Type({ selected, onChange }) {
    const getTypeClasses = type => {
        if (type == selected) {
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

function Options({ options, onAdd, onRemove, onChangeText }) {
    return <div className="options">
        <div>
            {
                options.map((option, optionIndex) => {
                    return <div className="form-group" key={optionIndex}>
                        <input style={{ width: '90%' }} value={option} onChange={e => onChangeText(optionIndex, e.target.value)} />
                        <button type="button" onClick={() => onRemove(optionIndex)} >X</button>
                    </div>
                })
            }
        </div>
        <button type="button" onClick={onAdd}> Add Option</button>
    </div>
}

export default Questions