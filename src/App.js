import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      {/* <div style={{display:'flex', justifyContent:'center',height:'100%'}}>

      </div> */}
      <Header/>
      
      <HomePage/>
    </DndProvider>
  );
}

export default App;
