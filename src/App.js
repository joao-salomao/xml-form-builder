import { useState } from 'react'
import MetaData from './components/MetaData'
import Questions from './components/Questions'

function App() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState([])

  return (
    <div style={{ padding: '30px' }}>
      <form>
        <MetaData title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
        <Questions questions={questions} setQuestions={setQuestions} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
