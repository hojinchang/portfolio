
import AppRouter from "./routers/AppRouter"
import DotCursor from "./components/DotCursor"

function App(): React.ReactElement {

  return (
    <>
      <DotCursor />
      <AppRouter /> 
    </>
  )
}

export default App
