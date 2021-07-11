import { useMemo } from 'react'
import { parse } from 'js2xmlparser'
import XMLViewerWidget from 'react-xml-viewer'

export default function XMLViewer({ title, description, questions }) {
    const xml = useMemo(() => parseFormToXML(title, description, questions), [title, description, questions])

    return <div className="xml-viewer">
        <XMLViewerWidget xml={xml} />
    </div>
}

const parseFormToXML = (title, description, questions) => {
    return parse("survey", {
        metadata: parseMetadata(title, description),
        issues: parseIssues(questions)
    })
}

const parseMetadata = (title, description) => {
    return {
        title: {
            '#': title
        },
        description: {
            '#': description
        },
    }
}

const parseIssues = questions => {
    return {
        question: questions.map(q => parseQuestion(q))
    }
}

const parseQuestion = question => {
    const result = {
        '@': {
            type: question.type,
            isRequired: question.isRequired === '1'
        },
        label: {
            '#': question.label
        }
    }

    if (['select', 'checkbox'].includes(question.type)) {
        result.option = question.options.map(option => {
            return {
                '#': option.label,
                '@': {
                    value: option.value,
                    selected: option.isSelected,
                }
            }
        })
    }

    if (['text', 'password', 'number', 'range'].includes(question.type)) {
        if (question.min) {
            result['@'].min = question.min
        }

        if (question.max) {
            result['@'].max = question.max
        }
    }


    return result
}