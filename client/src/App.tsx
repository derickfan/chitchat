import React from 'react';
import './App.css';
import { UserProvider } from './hooks/UserContext';
import RouterPage from './pages/RouterPage';

function App() {
  return (
    <UserProvider>
			<RouterPage />
		</UserProvider>
  );
}

export default App;
