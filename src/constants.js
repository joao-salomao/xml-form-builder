export const DEFAULT_QUESTION = {
    type: 'text',
    label: '',
    options: [],
    min: '',
    max: '',
    isRequired: '0',
}

export const DEFAULT_OPTION = {
    label: '',
    value: '',
    isSelected: false
}

export const TYPES = [
    {
        value: 'text',
        label: 'Text'
    },
    {
        value: 'number',
        label: 'Number'
    },
    {
        value: 'select',
        label: 'Select'
    },
    {
        value: 'url',
        label: 'URL'
    },
    {
        value: 'checkbox',
        label: 'Check Box'
    },
    {
        value: 'password',
        label: 'Password'
    },
    {
        value: 'range',
        label: 'Range'
    },
    {
        value: 'date',
        label: 'Date'
    },
    {
        value: 'datetime',
        label: 'Datetime'
    },
    {
        value: 'color',
        label: 'Color'
    },
]