import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import HomePage from './components/HomePage';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <HomePage/>
    </DndProvider>
  );
}

export default App;
