const DEFAULT_QUESTION = {
    type: 'text',
    label: '',
    options: []
}

function Questions({ questions, setQuestions }) {
    const onClickAddQuestion = () => {
        setQuestions([...questions, { ...DEFAULT_QUESTION }])
    }

    const onClickRemoveQuestion = index => {
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

    return <div>
        <h2 style={{ marginRight: '10px' }}>Questions</h2>
        <div>
            {
                questions.map((question, index) => {
                    return <div key={index} style={{ marginBottom: '10px', display: 'flex' }}>
                        <fieldset>
                            <Label value={question.label} onChange={value => onChangeLabel(index, value)} />
                            <Type onChange={value => onChangeType(index, value)} />
                            {
                                question.type == 'select' && <Options
                                    options={question.options}
                                    onAdd={() => onClickAddOption(question, index)}
                                    onRemove={optionIndex => onClickRemoveOption(index, optionIndex)}
                                    onChangeText={(optionIndex, text) => onChangeOptionText(index, optionIndex, text)}
                                />
                            }

                        </fieldset>
                        <div onClick={() => onClickRemoveQuestion(index)} style={{ width: '30px', fontSize: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            <span>X</span>
                        </div>
                    </div>
                })
            }
        </div>
        <button style={{ maxHeight: '30px', fontSize: '15px' }} type="button" onClick={onClickAddQuestion}>Add question</button>
    </div>
}

function Label({ value, onChange }) {
    return <div>
        <label>Label</label>
        <input type="text" required value={value} onChange={e => onChange(e.target.value)} />
    </div>
}

function Type({ onChange }) {
    return <div>
        <label>Type</label>
        <div>
            <button type="button" onClick={() => onChange('text')} >Text</button>
            <button type="button" onClick={() => onChange('number')}>Number</button>
            <button type="button" onClick={() => onChange('select')} >Select</button>
            <button type="button" onClick={() => onChange('url')} >URL</button>
            <button type="button" onClick={() => onChange('checkbox')} >Check Box</button>
            <button type="button" onClick={() => onChange('password')} >Password</button>
            <button type="button" onClick={() => onChange('range')} >Range</button>
            <button type="button" onClick={() => onChange('date')}>Date</button>
            <button type="button" onClick={() => onChange('datetime')}>Datetime</button>
            <button type="button" onClick={() => onChange('color')}>Color</button>
        </div>
    </div>
}

function Options({ options, onAdd, onRemove, onChangeText }) {
    return <div style={{ marginTop: '10px' }}>
        <div>
            {
                options.map((option, optionIndex) => {
                    return <div key={optionIndex}>
                        <input value={option} onChange={e => onChangeText(optionIndex, e.target.value)} />
                        <button type="button" onClick={() => onRemove(optionIndex)} >X</button>
                    </div>
                })
            }
        </div>
        <button type="button" onClick={onAdd}> Add Option</button>
    </div>
}

export default Questions