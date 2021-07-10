import { useState } from 'react'
import { parse } from 'js2xmlparser'
import MetaData from './components/MetaData'
import Questions from './components/Questions'
import { DEFAULT_QUESTION } from './constants'

function App() {
  const [title, setTitle] = useState("TítuloTítuloTítulo")
  const [description, setDescription] = useState("DescriçãoDescriçãoDescrição")
  const [questions, setQuestions] = useState([{ ...DEFAULT_QUESTION }])

  const onSubmit = event => {
    event.preventDefault()

    const obj = {
      metadata: {
        title: {
          '#': title
        },
        description: {
          '#': description
        },
      },
      issues: {
        question: questions.map(q => {
          const parsed = {
            type: {
              '#': q.type
            },
            label: {
              '#': q.label
            }
          }

          if (q.type == 'select') {
            parsed.option = q.options.map(option => {
              return {
                '#': option
              }
            })
          }

          return parsed
        })
      }
    }

    console.log(parse("survey", obj));
  }


  return (
    <main>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <MetaData title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
        <Questions questions={questions} setQuestions={setQuestions} />
        <input className="submit-button" type="submit" value="Submit" />
      </form>
    </main >
  );
}

export default App;
