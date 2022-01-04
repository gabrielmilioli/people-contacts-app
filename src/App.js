import { Container } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './app/components/Menu';
import Person from './app/pages/Person';

function App() {
  return (
    <>
      <Menu />
      <Container className="full" style={{ paddingLeft: '264px' }}>
        <Routes>
          <Route path="/" exact element={<Navigate to="/person" />} />
          <Route exact path="/person" element={<Person />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
