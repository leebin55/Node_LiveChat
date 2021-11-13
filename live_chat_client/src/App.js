import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Join from './component/Join/Join.jsx';
import Chat from './component/Chat/Chat.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
