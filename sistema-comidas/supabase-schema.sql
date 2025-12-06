-- ============================================================================
-- ESQUEMA DE BASE DE DATOS PARA SISTEMA DE CONTROL DE COMIDAS
-- Supabase / PostgreSQL
-- ============================================================================

-- Tabla de Personas
CREATE TABLE personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_completo VARCHAR(255) NOT NULL,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Comidas
CREATE TABLE comidas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Desayuno', 'Almuerzo', 'Cena')),
  fecha DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Asistencias (registro de quién comió)
CREATE TABLE asistencias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comida_id UUID NOT NULL REFERENCES comidas(id) ON DELETE CASCADE,
  persona_id UUID NOT NULL REFERENCES personas(id) ON DELETE CASCADE,
  comio BOOLEAN DEFAULT false,
  fecha_hora_entrega TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(comida_id, persona_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_personas_nombre ON personas(nombre_completo);
CREATE INDEX idx_personas_activo ON personas(activo);
CREATE INDEX idx_comidas_fecha ON comidas(fecha);
CREATE INDEX idx_comidas_tipo ON comidas(tipo);
CREATE INDEX idx_asistencias_comida ON asistencias(comida_id);
CREATE INDEX idx_asistencias_persona ON asistencias(persona_id);
CREATE INDEX idx_asistencias_fecha_entrega ON asistencias(fecha_hora_entrega);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para actualizar updated_at
CREATE TRIGGER update_personas_updated_at
  BEFORE UPDATE ON personas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comidas_updated_at
  BEFORE UPDATE ON comidas
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_asistencias_updated_at
  BEFORE UPDATE ON asistencias
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para registrar fecha/hora de entrega automáticamente
CREATE OR REPLACE FUNCTION set_fecha_hora_entrega()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.comio = true AND OLD.comio = false THEN
    NEW.fecha_hora_entrega = NOW();
  ELSIF NEW.comio = false THEN
    NEW.fecha_hora_entrega = NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_fecha_hora_entrega
  BEFORE UPDATE ON asistencias
  FOR EACH ROW
  EXECUTE FUNCTION set_fecha_hora_entrega();

-- Políticas de seguridad RLS (Row Level Security)
-- Habilitar RLS en todas las tablas
ALTER TABLE personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE comidas ENABLE ROW LEVEL SECURITY;
ALTER TABLE asistencias ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir todas las operaciones (ajustar según necesidades)
CREATE POLICY "Permitir todo en personas" ON personas
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permitir todo en comidas" ON comidas
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Permitir todo en asistencias" ON asistencias
  FOR ALL USING (true) WITH CHECK (true);

-- Vista para obtener estadísticas de comidas
CREATE OR REPLACE VIEW vista_estadisticas_comidas AS
SELECT 
  c.id,
  c.nombre,
  c.tipo,
  c.fecha,
  COUNT(a.id) as total_personas,
  COUNT(CASE WHEN a.comio = true THEN 1 END) as comieron,
  COUNT(CASE WHEN a.comio = false THEN 1 END) as faltan,
  c.created_at
FROM comidas c
LEFT JOIN asistencias a ON c.id = a.comida_id
GROUP BY c.id, c.nombre, c.tipo, c.fecha, c.created_at
ORDER BY c.fecha DESC, c.created_at DESC;

-- Vista para obtener detalle de asistencias
CREATE OR REPLACE VIEW vista_detalle_asistencias AS
SELECT 
  c.id as comida_id,
  c.nombre as comida_nombre,
  c.tipo as comida_tipo,
  c.fecha as comida_fecha,
  p.id as persona_id,
  p.nombre_completo,
  a.comio,
  a.fecha_hora_entrega,
  a.created_at
FROM comidas c
CROSS JOIN personas p
LEFT JOIN asistencias a ON c.id = a.comida_id AND p.id = a.persona_id
WHERE p.activo = true
ORDER BY c.fecha DESC, c.created_at DESC, p.nombre_completo;

-- Función para crear comida con asistencias automáticas
CREATE OR REPLACE FUNCTION crear_comida_con_asistencias(
  p_nombre VARCHAR,
  p_tipo VARCHAR,
  p_fecha DATE
)
RETURNS UUID AS $$
DECLARE
  v_comida_id UUID;
BEGIN
  -- Crear la comida
  INSERT INTO comidas (nombre, tipo, fecha)
  VALUES (p_nombre, p_tipo, p_fecha)
  RETURNING id INTO v_comida_id;
  
  -- Crear asistencias para todas las personas activas
  INSERT INTO asistencias (comida_id, persona_id, comio)
  SELECT v_comida_id, id, false
  FROM personas
  WHERE activo = true;
  
  RETURN v_comida_id;
END;
$$ LANGUAGE plpgsql;

-- Datos de ejemplo (opcional - comentar si no se necesitan)
/*
INSERT INTO personas (nombre_completo) VALUES
  ('Juan Pérez'),
  ('María García'),
  ('Carlos López'),
  ('Ana Martínez'),
  ('Pedro Rodríguez');

-- Crear una comida de ejemplo
SELECT crear_comida_con_asistencias('Desayuno del Viernes', 'Desayuno', CURRENT_DATE);
*/

-- ============================================================================
-- INSTRUCCIONES DE USO:
-- ============================================================================
-- 1. Copia todo este código
-- 2. Ve a tu proyecto en Supabase
-- 3. Abre el SQL Editor
-- 4. Pega el código y ejecuta
-- 5. Verifica que las tablas se crearon correctamente
-- 6. Configura las credenciales en el archivo .env del proyecto
-- ============================================================================
