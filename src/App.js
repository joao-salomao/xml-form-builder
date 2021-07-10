import { useState } from 'react'
import MetaData from './components/MetaData'
import Questions from './components/Questions'
import XMLViewer from './components/XMLViewer'
import { DEFAULT_QUESTION } from './constants'

function App() {
  const [title, setTitle] = useState("TítuloTítuloTítulo")
  const [description, setDescription] = useState("DescriçãoDescriçãoDescrição")
  const [questions, setQuestions] = useState([{ ...DEFAULT_QUESTION }])

  return (
    <main>
      <MetaData title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
      <Questions questions={questions} setQuestions={setQuestions} />
      <XMLViewer title={title} description={description} questions={questions} />
    </main >
  );
}

export default App;
