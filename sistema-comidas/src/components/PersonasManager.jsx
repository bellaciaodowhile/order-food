import { useState, useEffect } from 'react';
import './PersonasManager.css';
import { getPersonas, createPersona, updatePersona, deletePersona } from '../utils/storage';

function PersonasManager({ onPersonasChange }) {
  const [personas, setPersonas] = useState([]);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    setLoading(true);
    try {
      const data = await getPersonas();
      setPersonas(data);
      if (onPersonasChange) onPersonasChange(data);
    } catch (error) {
      console.error('Error al cargar personas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombreCompleto.trim()) return;

    setLoading(true);
    try {
      if (editingId) {
        await updatePersona(editingId, nombreCompleto.trim());
        setEditingId(null);
      } else {
        await createPersona(nombreCompleto.trim());
      }
      setNombreCompleto('');
      await loadPersonas();
    } catch (error) {
      console.error('Error al guardar persona:', error);
      alert('Error al guardar la persona');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (persona) => {
    setNombreCompleto(persona.nombre_completo);
    setEditingId(persona.id);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta persona?')) {
      setLoading(true);
      try {
        await deletePersona(id);
        await loadPersonas();
      } catch (error) {
        console.error('Error al eliminar persona:', error);
        alert('Error al eliminar la persona');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setNombreCompleto('');
    setEditingId(null);
  };

  const personasFiltradas = personas.filter(persona =>
    persona.nombre_completo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="personas-manager">
      <h2>Gestión de Personas</h2>
      
      <form onSubmit={handleSubmit} className="persona-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre y Apellido"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
            className="input input-full"
            disabled={loading}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Guardando...' : editingId ? '✏️ Actualizar' : '➕ Agregar Persona'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancel} className="btn btn-secondary" disabled={loading}>
              ❌ Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="personas-list">
        <div className="list-header">
          <h3>Personas Registradas ({personas.length})</h3>
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Buscar persona..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="input-search"
            />
            {busqueda && (
              <button 
                onClick={() => setBusqueda('')} 
                className="btn-clear-search"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        {loading && personas.length === 0 ? (
          <p className="empty-message">⏳ Cargando...</p>
        ) : personas.length === 0 ? (
          <p className="empty-message">No hay personas registradas aún</p>
        ) : personasFiltradas.length === 0 ? (
          <p className="empty-message">No se encontraron personas con "{busqueda}"</p>
        ) : (
          <div className="personas-grid">
            {personasFiltradas.map((persona) => (
              <div key={persona.id} className="persona-card">
                <div className="persona-info">
                  <span className="persona-icon">👤</span>
                  <div>
                    <strong>{persona.nombre_completo}</strong>
                  </div>
                </div>
                <div className="persona-actions">
                  <button 
                    onClick={() => handleEdit(persona)} 
                    className="btn-icon btn-edit"
                    title="Editar"
                    disabled={loading}
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(persona.id)} 
                    className="btn-icon btn-delete"
                    title="Eliminar"
                    disabled={loading}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonasManager;
