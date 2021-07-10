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

    const onChangeQuestionProperty = (index, prop, value) => {
        const newQuestions = [...questions]
        newQuestions[index][prop] = value
        setQuestions(newQuestions)
    }

    return <div>
        <div style={{ display: 'flex' }}>
            <h2 style={{ marginRight: '10px' }}>Questions</h2>
            <button type="button" onClick={onClickAddQuestion}> Add question</button>
        </div>
        <div>
            {
                questions.map((question, index) => {
                    return <div key={index} style={{ marginBottom: '10px', display: 'flex' }}>
                        <fieldset>
                            <div>
                                <label>Label</label>
                                <input type="text" required value={question.label} onChange={e => onChangeQuestionProperty(index, 'label', e.target.value)} />
                            </div>
                            <div>
                                <label>Type</label>
                                <div>
                                    <button type="button" onClick={() => onChangeType(index, 'text')} >Text</button>
                                    <button type="button" onClick={() => onChangeType(index, 'number')}>Number</button>
                                    <button type="button" onClick={() => onChangeType(index, 'select')} >Select</button>
                                    <button type="button" onClick={() => onChangeType(index, 'url')} >URL</button>
                                    <button type="button" onClick={() => onChangeType(index, 'checkbox')} >Check Box</button>
                                    <button type="button" onClick={() => onChangeType(index, 'password')} >Password</button>
                                    <button type="button" onClick={() => onChangeType(index, 'range')} >Range</button>
                                    <button type="button" onClick={() => onChangeType(index, 'date')}>Date</button>
                                    <button type="button" onClick={() => onChangeType(index, 'datetime')}>Datetime</button>
                                    <button type="button" onClick={() => onChangeType(index, 'color')}>Color</button>
                                </div>
                            </div>
                            {
                                question.type == 'select' && <div>
                                    <button type="button" onClick={() => onClickAddOption(question, index)}> Add Option</button>
                                    <div>
                                        {
                                            question.options.map((option, optionIndex) => {
                                                return <div key={optionIndex}>
                                                    <input value={option} onChange={e => onChangeOptionText(index, optionIndex, e.target.value)} />
                                                    <button type="button" onClick={() => onClickRemoveOption(index, optionIndex)} >Remove Option</button>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </fieldset>
                        <div onClick={() => onClickRemoveQuestion(index)} style={{ backgroundColor: 'red', width: '30px', fontSize: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                            <span>X</span>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}

export default Questions