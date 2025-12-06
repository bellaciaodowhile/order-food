import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEY = 'sistema_comidas_data';

// ============================================================================
// FUNCIONES DE LOCALSTORAGE (Fallback)
// ============================================================================

export const loadDataLocal = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
  return { personas: [], comidas: [] };
};

export const saveDataLocal = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// ============================================================================
// FUNCIONES DE SUPABASE
// ============================================================================

// Personas
export const getPersonas = async () => {
  if (!isSupabaseConfigured()) {
    return loadDataLocal().personas;
  }

  try {
    const { data, error } = await supabase
      .from('personas')
      .select('*')
      .eq('activo', true)
      .order('nombre_completo');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener personas:', error);
    return [];
  }
};

export const createPersona = async (nombreCompleto) => {
  if (!isSupabaseConfigured()) {
    const data = loadDataLocal();
    const newPersona = {
      id: Date.now().toString(),
      nombre_completo: nombreCompleto,
      activo: true
    };
    data.personas.push(newPersona);
    saveDataLocal(data);
    return newPersona;
  }

  try {
    const { data, error } = await supabase
      .from('personas')
      .insert([{ nombre_completo: nombreCompleto }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error al crear persona:', error);
    throw error;
  }
};

export const updatePersona = async (id, nombreCompleto) => {
  if (!isSupabaseConfigured()) {
    const data = loadDataLocal();
    const index = data.personas.findIndex(p => p.id === id);
    if (index !== -1) {
      data.personas[index].nombre_completo = nombreCompleto;
      saveDataLocal(data);
    }
    return;
  }

  try {
    const { error } = await supabase
      .from('personas')
      .update({ nombre_completo: nombreCompleto })
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    throw error;
  }
};

export const deletePersona = async (id) => {
  if (!isSupabaseConfigured()) {
    const data = loadDataLocal();
    data.personas = data.personas.filter(p => p.id !== id);
    saveDataLocal(data);
    return;
  }

  try {
    const { error } = await supabase
      .from('personas')
      .update({ activo: false })
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    throw error;
  }
};

// Comidas
export const getComidas = async () => {
  if (!isSupabaseConfigured()) {
    return loadDataLocal().comidas;
  }

  try {
    const { data, error } = await supabase
      .from('vista_estadisticas_comidas')
      .select('*')
      .order('fecha', { ascending: false })
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener comidas:', error);
    return [];
  }
};

export const createComida = async (nombre, tipo, fecha) => {
  if (!isSupabaseConfigured()) {
    const data = loadDataLocal();
    const newComida = {
      id: Date.now().toString(),
      nombre: nombre,
      tipo: tipo,
      fecha: fecha,
      asistencias: data.personas.map(p => ({
        personaId: p.id,
        comio: false,
        fecha_hora_entrega: null
      }))
    };
    data.comidas.unshift(newComida);
    saveDataLocal(data);
    return newComida;
  }

  try {
    const { data: comidaData, error } = await supabase
      .rpc('crear_comida_con_asistencias', {
        p_nombre: nombre,
        p_tipo: tipo,
        p_fecha: fecha
      });
    
    if (error) throw error;
    return comidaData;
  } catch (error) {
    console.error('Error al crear comida:', error);
    throw error;
  }
};

export const deleteComida = async (id) => {
  if (!isSupabaseConfigured()) {
    const data = loadDataLocal();
    data.comidas = data.comidas.filter(c => c.id !== id);
    saveDataLocal(data);
    return;
  }

  try {
    const { error } = await supabase
      .from('comidas')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error al eliminar comida:', error);
    throw error;
  }
};

// Asistencias
export const getAsistencias = async (comidaId) => {
  if (!isSupabaseConfigured()) {
    const data = loadDataLocal();
    const comida = data.comidas.find(c => c.id === comidaId);
    return comida ? comida.asistencias : [];
  }

  try {
    const { data, error } = await supabase
      .from('asistencias')
      .select(`
        *,
        persona:personas(*)
      `)
      .eq('comida_id', comidaId);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error al obtener asistencias:', error);
    return [];
  }
};

export const toggleAsistencia = async (comidaId, personaId, comio) => {
  if (!isSupabaseConfigured()) {
    const data = loadDataLocal();
    const comida = data.comidas.find(c => c.id === comidaId);
    if (comida) {
      const asistencia = comida.asistencias.find(a => a.personaId === personaId);
      if (asistencia) {
        asistencia.comio = comio;
        asistencia.fecha_hora_entrega = comio ? new Date().toISOString() : null;
      }
      saveDataLocal(data);
    }
    return;
  }

  try {
    const { error } = await supabase
      .from('asistencias')
      .update({ comio: comio })
      .eq('comida_id', comidaId)
      .eq('persona_id', personaId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error al actualizar asistencia:', error);
    throw error;
  }
};

// ============================================================================
// EXPORTACIÓN
// ============================================================================

export const exportToTxt = async () => {
  let content = '=== SISTEMA DE CONTROL DE COMIDAS ===\n\n';
  content += `Generado el: ${new Date().toLocaleString('es-ES')}\n\n`;
  
  const personas = await getPersonas();
  const comidas = await getComidas();
  
  content += '--- PERSONAS REGISTRADAS ---\n';
  personas.forEach((persona, index) => {
    content += `${index + 1}. ${persona.nombre_completo}\n`;
  });
  
  content += `\nTotal de personas: ${personas.length}\n`;
  
  content += '\n--- REGISTRO DE COMIDAS ---\n';
  
  for (const comida of comidas) {
    content += `\n${'='.repeat(60)}\n`;
    content += `Nombre: ${comida.nombre}\n`;
    content += `Tipo: ${comida.tipo}\n`;
    content += `Fecha: ${new Date(comida.fecha).toLocaleDateString('es-ES')}\n`;
    
    if (isSupabaseConfigured()) {
      content += `Total personas: ${comida.total_personas}\n`;
      content += `Comieron: ${comida.comieron}\n`;
      content += `Pendientes: ${comida.faltan}\n`;
      
      // Obtener detalle de asistencias
      const asistencias = await getAsistencias(comida.id);
      content += '\nDetalle:\n';
      asistencias.forEach(asistencia => {
        const estado = asistencia.comio ? '✓' : '✗';
        const hora = asistencia.fecha_hora_entrega 
          ? ` - ${new Date(asistencia.fecha_hora_entrega).toLocaleString('es-ES')}`
          : '';
        content += `  ${estado} ${asistencia.persona.nombre_completo}${hora}\n`;
      });
    } else {
      const total = comida.asistencias?.length || 0;
      const comieron = comida.asistencias?.filter(a => a.comio).length || 0;
      content += `Total personas: ${total}\n`;
      content += `Comieron: ${comieron}\n`;
      content += `Pendientes: ${total - comieron}\n`;
      
      content += '\nDetalle:\n';
      comida.asistencias?.forEach(asistencia => {
        const persona = personas.find(p => p.id === asistencia.personaId);
        if (persona) {
          const estado = asistencia.comio ? '✓' : '✗';
          const hora = asistencia.fecha_hora_entrega 
            ? ` - ${new Date(asistencia.fecha_hora_entrega).toLocaleString('es-ES')}`
            : '';
          content += `  ${estado} ${persona.nombre_completo}${hora}\n`;
        }
      });
    }
  }
  
  content += `\n${'='.repeat(60)}\n`;
  content += `\nTotal de comidas registradas: ${comidas.length}\n`;
  
  return content;
};

export const downloadTxt = async () => {
  const content = await exportToTxt();
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `registro_comidas_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Función de compatibilidad para cargar datos iniciales
export const loadData = loadDataLocal;
export const saveData = saveDataLocal;
