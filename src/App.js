import { useState } from 'react'
import MetaData from './components/MetaData'

function App() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  return (
    <div style={{ padding: '30px' }}>
      <form>
        <MetaData title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
