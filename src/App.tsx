import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateFormPage from './pages/CreateFormPage';
import PreviewPage from './pages/PreviewPage';
import MyFormsPage from './pages/MyFormsPage';
import { AppBar, Toolbar, Button, Container, Box } from '@mui/material';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/create">
            Create Form
          </Button>
          <Button color="inherit" component={Link} to="/myforms">
            My Forms
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/create" element={<CreateFormPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/myforms" element={<MyFormsPage />} />
          <Route path="/" element={<MyFormsPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;