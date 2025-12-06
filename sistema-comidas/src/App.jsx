import { useState } from 'react';
import './App.css';
import PersonasManager from './components/PersonasManager';
import ComidasManager from './components/ComidasManager';
import { isSupabaseConfigured } from './lib/supabase';

function App() {
  const [activeTab, setActiveTab] = useState('personas');
  const usingSupabase = isSupabaseConfigured();

  return (
    <div className="app">
      <header className="header">
        <h1>🍽️ Sistema de Control de Comidas</h1>
        <p>Gestiona personas y registra sus comidas diarias</p>
      </header>

      <nav className="tabs">
        <button 
          className={`tab ${activeTab === 'personas' ? 'active' : ''}`}
          onClick={() => setActiveTab('personas')}
        >
          👥 Personas
        </button>
        <button 
          className={`tab ${activeTab === 'comidas' ? 'active' : ''}`}
          onClick={() => setActiveTab('comidas')}
        >
          📋 Comidas
        </button>
      </nav>

      <main className="content">
        {activeTab === 'personas' ? (
          <PersonasManager />
        ) : (
          <ComidasManager />
        )}
      </main>
    </div>
  );
}

export default App;
