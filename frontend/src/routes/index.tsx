import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateUserPage from '../features/users/pages/CreateUserPage';


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/criar-usuario" element={<CreateUserPage />} />
      </Routes>
    </BrowserRouter>
  );
}
