import { useState, useEffect } from 'react';
import './ComidasManager.css';
import { 
  getPersonas, 
  getComidas, 
  createComida, 
  deleteComida, 
  getAsistencias, 
  toggleAsistencia,
  downloadTxt
} from '../utils/storage';
import { isSupabaseConfigured } from '../lib/supabase';

function ComidasManager() {
  const [personas, setPersonas] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [nombreComida, setNombreComida] = useState('');
  const [selectedComida, setSelectedComida] = useState(null);
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [busquedaComida, setBusquedaComida] = useState('');
  const [busquedaPersona, setBusquedaPersona] = useState('');

  const tipos = ['Desayuno', 'Almuerzo', 'Cena'];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (selectedComida) {
      loadAsistencias(selectedComida.id);
    }
  }, [selectedComida]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [personasData, comidasData] = await Promise.all([
        getPersonas(),
        getComidas()
      ]);
      setPersonas(personasData);
      setComidas(comidasData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAsistencias = async (comidaId) => {
    try {
      const data = await getAsistencias(comidaId);
      setAsistencias(data);
    } catch (error) {
      console.error('Error al cargar asistencias:', error);
    }
  };

  const handleCrearComida = async () => {
    if (!selectedTipo) {
      alert('Por favor selecciona un tipo de comida');
      return;
    }

    if (!nombreComida.trim()) {
      alert('Por favor ingresa un nombre para la comida');
      return;
    }

    if (personas.length === 0) {
      alert('Primero debes registrar personas');
      return;
    }

    setLoading(true);
    try {
      const fecha = new Date().toISOString().split('T')[0];
      await createComida(nombreComida.trim(), selectedTipo, fecha);
      await loadData();
      setSelectedTipo('');
      setNombreComida('');
    } catch (error) {
      console.error('Error al crear comida:', error);
      alert('Error al crear la comida');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAsistencia = async (personaId, comio) => {
    if (!selectedComida) return;

    try {
      await toggleAsistencia(selectedComida.id, personaId, !comio);
      await loadAsistencias(selectedComida.id);
      await loadData();
    } catch (error) {
      console.error('Error al actualizar asistencia:', error);
      alert('Error al actualizar la asistencia');
    }
  };

  const handleEliminarComida = async (id) => {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      setLoading(true);
      try {
        await deleteComida(id);
        if (selectedComida?.id === id) {
          setSelectedComida(null);
          setAsistencias([]);
        }
        await loadData();
      } catch (error) {
        console.error('Error al eliminar comida:', error);
        alert('Error al eliminar la comida');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleExportarTxt = async () => {
    try {
      await downloadTxt();
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error al exportar los datos');
    }
  };

  const handleSelectComida = async (comida) => {
    setSelectedComida(comida);
  };

  const getEstadisticas = (comida) => {
    if (isSupabaseConfigured()) {
      return {
        total: comida.total_personas || 0,
        comieron: comida.comieron || 0,
        faltan: comida.faltan || 0
      };
    } else {
      const total = comida.asistencias?.length || 0;
      const comieron = comida.asistencias?.filter(a => a.comio).length || 0;
      return { total, comieron, faltan: total - comieron };
    }
  };

  const getAsistenciaInfo = (personaId) => {
    if (isSupabaseConfigured()) {
      return asistencias.find(a => a.persona_id === personaId);
    } else {
      return selectedComida?.asistencias?.find(a => a.personaId === personaId);
    }
  };

  const formatFechaHora = (fechaHora) => {
    if (!fechaHora) return null;
    return new Date(fechaHora).toLocaleString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="comidas-manager">
      <div className="header-section">
        <h2>Gestión de Comidas</h2>
        <button onClick={handleExportarTxt} className="btn btn-export" disabled={loading}>
          💾 Exportar a TXT
        </button>
      </div>

      <div className="crear-comida-section">
        <h3>Crear Nueva Comida</h3>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="Nombre de la comida (ej: Desayuno del Viernes)"
            value={nombreComida}
            onChange={(e) => setNombreComida(e.target.value)}
            className="input input-nombre-comida"
            disabled={loading}
          />
        </div>

        <div className="tipo-selector">
          {tipos.map(tipo => (
            <button
              key={tipo}
              className={`tipo-btn ${selectedTipo === tipo ? 'selected' : ''}`}
              onClick={() => setSelectedTipo(tipo)}
              disabled={loading}
            >
              {tipo === 'Desayuno' && '🌅'}
              {tipo === 'Almuerzo' && '☀️'}
              {tipo === 'Cena' && '🌙'}
              {' '}{tipo}
            </button>
          ))}
        </div>
        <button onClick={handleCrearComida} className="btn btn-crear" disabled={loading}>
          {loading ? '⏳ Creando...' : `➕ Crear ${selectedTipo || 'Comida'}`}
        </button>
      </div>

      {selectedComida && (
        <div className="comida-activa">
          <div className="comida-header">
            <div>
              <h3>
                {selectedComida.tipo === 'Desayuno' && '🌅'}
                {selectedComida.tipo === 'Almuerzo' && '☀️'}
                {selectedComida.tipo === 'Cena' && '🌙'}
                {' '}{selectedComida.nombre}
              </h3>
              <p className="fecha">{new Date(selectedComida.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div className="estadisticas">
              <div className="stat">
                <span className="stat-label">Total:</span>
                <span className="stat-value">{getEstadisticas(selectedComida).total}</span>
              </div>
              <div className="stat success">
                <span className="stat-label">Comieron:</span>
                <span className="stat-value">{getEstadisticas(selectedComida).comieron}</span>
              </div>
              <div className="stat pending">
                <span className="stat-label">Faltan:</span>
                <span className="stat-value">{getEstadisticas(selectedComida).faltan}</span>
              </div>
            </div>
          </div>

          <div className="search-asistencias">
            <input
              type="text"
              placeholder="🔍 Buscar persona en la lista..."
              value={busquedaPersona}
              onChange={(e) => setBusquedaPersona(e.target.value)}
              className="input-search-asistencias"
            />
            {busquedaPersona && (
              <button 
                onClick={() => setBusquedaPersona('')} 
                className="btn-clear-search-inline"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          <div className="asistencias-list">
            {personas
              .filter(persona => 
                persona.nombre_completo.toLowerCase().includes(busquedaPersona.toLowerCase())
              )
              .map(persona => {
              const asistenciaInfo = getAsistenciaInfo(persona.id);
              const comio = asistenciaInfo?.comio || false;
              const fechaHora = asistenciaInfo?.fecha_hora_entrega;
              
              return (
                <div 
                  key={persona.id} 
                  className={`asistencia-item ${comio ? 'comio' : ''}`}
                  onClick={() => handleToggleAsistencia(persona.id, comio)}
                >
                  <div className="checkbox">
                    {comio && '✓'}
                  </div>
                  <div className="asistencia-content">
                    <span className="persona-nombre">
                      {persona.nombre_completo}
                    </span>
                    {fechaHora && (
                      <span className="fecha-hora-entrega">
                        🕐 {formatFechaHora(fechaHora)}
                      </span>
                    )}
                  </div>
                  <span className="estado">
                    {comio ? '✅ Comió' : '⏳ Pendiente'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="historial-section">
        <div className="historial-header">
          <h3>Historial de Comidas</h3>
          <div className="search-box-historial">
            <input
              type="text"
              placeholder="🔍 Buscar comida..."
              value={busquedaComida}
              onChange={(e) => setBusquedaComida(e.target.value)}
              className="input-search"
            />
            {busquedaComida && (
              <button 
                onClick={() => setBusquedaComida('')} 
                className="btn-clear-search"
                title="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        {loading && comidas.length === 0 ? (
          <p className="empty-message">⏳ Cargando...</p>
        ) : comidas.length === 0 ? (
          <p className="empty-message">No hay comidas registradas aún</p>
        ) : comidas.filter(comida => 
            comida.nombre.toLowerCase().includes(busquedaComida.toLowerCase()) ||
            comida.tipo.toLowerCase().includes(busquedaComida.toLowerCase())
          ).length === 0 ? (
          <p className="empty-message">No se encontraron comidas con "{busquedaComida}"</p>
        ) : (
          <div className="comidas-list">
            {comidas
              .filter(comida => 
                comida.nombre.toLowerCase().includes(busquedaComida.toLowerCase()) ||
                comida.tipo.toLowerCase().includes(busquedaComida.toLowerCase())
              )
              .map(comida => {
              const stats = getEstadisticas(comida);
              const tienePendientes = stats.faltan > 0;
              return (
                <div 
                  key={comida.id} 
                  className={`comida-card ${selectedComida?.id === comida.id ? 'active' : ''} ${tienePendientes ? 'pendientes' : ''}`}
                  onClick={() => handleSelectComida(comida)}
                >
                  <div className="comida-info">
                    <h4>
                      {comida.tipo === 'Desayuno' && '🌅'}
                      {comida.tipo === 'Almuerzo' && '☀️'}
                      {comida.tipo === 'Cena' && '🌙'}
                      {' '}{comida.nombre}
                    </h4>
                    <p className="fecha-small">{new Date(comida.fecha).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div className="comida-stats">
                    <span className="badge">{stats.comieron}/{stats.total}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEliminarComida(comida.id);
                    }}
                    className="btn-delete-small"
                    disabled={loading}
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComidasManager;
