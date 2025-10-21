
import './App.css'
import { Button } from './components/ui/Button'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'

function App() {

  return (
    <>
     <Button variant="primary" text="share" size="md" startIcon={<PlusIcon size="md"/>} endIcon={<ShareIcon size="md"/>}/>
     <Button variant="secondary" text="add content" size="md"/>
    </>
  )
}

export default App
