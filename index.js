const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3000;

// ---------------------------------------------------------------------------
// Catálogos — un solo array por tabla, igual que estadosReporte
// ---------------------------------------------------------------------------

const estadosReporte = [
    { id: 1, nombre: 'En revisión' },
    { id: 2, nombre: 'Pendiente' },
    { id: 3, nombre: 'Aprobado' },
];

const tiposReporte = [
    { id: 1, nombre: 'Auditoría' },
    { id: 2, nombre: 'Cumplimiento' },
    { id: 3, nombre: 'Incidencias' },
    { id: 4, nombre: 'Financiero' },
    { id: 5, nombre: 'Evaluación' },
];

const areas = [
    { id: 1, nombre: 'Contabilidad' },
    { id: 2, nombre: 'Operaciones' },
    { id: 3, nombre: 'Tecnología' },
    { id: 4, nombre: 'Recursos Humanos' },
    { id: 5, nombre: 'Dirección' },
];

// ---------------------------------------------------------------------------
// Helpers de catálogos — misma lógica que obtenerEstado()
// ---------------------------------------------------------------------------

const obtenerEstado = id => estadosReporte.find(e => e.id === id);
const obtenerTipoReporte = id => tiposReporte.find(t => t.id === id);
const obtenerArea = id => areas.find(a => a.id === id);

// ---------------------------------------------------------------------------
// Datos
// ---------------------------------------------------------------------------

const reportes = [
    { id: 1, numeracion: 'REP-2026-0001' },
    { id: 2, numeracion: 'REP-2026-0002' },
    { id: 3, numeracion: 'REP-2026-0003' },
    { id: 4, numeracion: 'REP-2026-0004' },
    { id: 5, numeracion: 'REP-2026-0005' },
];

const reportesDetalle = {
    1: { id: 1, numeracion: 'REP-2026-0001', descripcion: 'Reporte de auditoría trimestral Q1', fecha_creacion: '2026-01-15', estado_id: 1, tipo_reporte_id: 1, area_id: 1 },
    2: { id: 2, numeracion: 'REP-2026-0002', descripcion: 'Reporte de cumplimiento normativo', fecha_creacion: '2026-02-10', estado_id: 3, tipo_reporte_id: 2, area_id: 5 },
    3: { id: 3, numeracion: 'REP-2026-0003', descripcion: 'Reporte de incidencias operativas', fecha_creacion: '2026-03-05', estado_id: 2, tipo_reporte_id: 3, area_id: 3 },
    4: { id: 4, numeracion: 'REP-2026-0004', descripcion: 'Reporte financiero semestral', fecha_creacion: '2026-04-01', estado_id: 1, tipo_reporte_id: 4, area_id: 1 },
    5: { id: 5, numeracion: 'REP-2026-0005', descripcion: 'Reporte de evaluación de proveedores', fecha_creacion: '2026-05-12', estado_id: 3, tipo_reporte_id: 5, area_id: 2 },
};

const acuerdos = {
    1: [
        { id: 101, numero: 'ACU-101', fecha: '2026-01-20' },
        { id: 102, numero: 'ACU-102', fecha: '2026-02-05' },
        { id: 103, numero: 'ACU-103', fecha: '2026-02-18' },
    ],
    2: [
        { id: 201, numero: 'ACU-201', fecha: '2026-02-15' },
        { id: 202, numero: 'ACU-202', fecha: '2026-03-01' },
    ],
    3: [
        { id: 301, numero: 'ACU-301', fecha: '2026-03-10' },
        { id: 302, numero: 'ACU-302', fecha: '2026-03-22' },
        { id: 303, numero: 'ACU-303', fecha: '2026-04-01' },
        { id: 304, numero: 'ACU-304', fecha: '2026-04-15' },
    ],
    4: [{ id: 401, numero: 'ACU-401', fecha: '2026-04-10' }],
    5: [
        { id: 501, numero: 'ACU-501', fecha: '2026-05-20' },
        { id: 502, numero: 'ACU-502', fecha: '2026-06-01' },
    ],
};

const acuerdosDetalle = {
    101: { id: 101, numero: 'ACU-101', fecha: '2026-01-20', contenido: 'Se acuerda iniciar revisión de estados financieros del primer trimestre con el equipo contable.', firmante: 'Lic. García Torres' },
    102: { id: 102, numero: 'ACU-102', fecha: '2026-02-05', contenido: 'Se aprueba la contratación de auditor externo para validar hallazgos preliminares del reporte.', firmante: 'Dr. Martínez López' },
    103: { id: 103, numero: 'ACU-103', fecha: '2026-02-18', contenido: 'Se establece plazo máximo del 15 de marzo para entrega de observaciones por parte de los departamentos.', firmante: 'Lic. García Torres' },
    201: { id: 201, numero: 'ACU-201', fecha: '2026-02-15', contenido: 'Se acuerda actualización del manual de procedimientos conforme a la normativa vigente NOM-2026.', firmante: 'Ing. Sánchez Ruiz' },
    202: { id: 202, numero: 'ACU-202', fecha: '2026-03-01', contenido: 'Se aprueba el plan de capacitación para el personal operativo en materia de cumplimiento.', firmante: 'Lic. García Torres' },
    301: { id: 301, numero: 'ACU-301', fecha: '2026-03-10', contenido: 'Se documenta incidencia crítica en sistema de inventario, con afectación a 3 sucursales durante 4 horas.', firmante: 'Ing. Ramírez Vega' },
    302: { id: 302, numero: 'ACU-302', fecha: '2026-03-22', contenido: 'Se asigna equipo técnico para diagnóstico y corrección de fallas recurrentes en el módulo de reportes.', firmante: 'Ing. Sánchez Ruiz' },
    303: { id: 303, numero: 'ACU-303', fecha: '2026-04-01', contenido: 'Se aprueba adquisición de nuevo servidor de respaldo para prevenir futuras interrupciones operativas.', firmante: 'Dr. Martínez López' },
    304: { id: 304, numero: 'ACU-304', fecha: '2026-04-15', contenido: 'Se establece protocolo de monitoreo continuo con alertas automáticas para el área de tecnología.', firmante: 'Ing. Ramírez Vega' },
    401: { id: 401, numero: 'ACU-401', fecha: '2026-04-10', contenido: 'Se acuerda revisión detallada del presupuesto ejercido vs presupuesto autorizado para el primer semestre.', firmante: 'Lic. García Torres' },
    501: { id: 501, numero: 'ACU-501', fecha: '2026-05-20', contenido: 'Se aprueba descontinuar contrato con proveedor P-004 por incumplimiento en tiempos de entrega.', firmante: 'Dr. Martínez López' },
    502: { id: 502, numero: 'ACU-502', fecha: '2026-06-01', contenido: 'Se autoriza apertura de licitación para selección de nuevos proveedores en categoría de insumos de oficina.', firmante: 'Lic. García Torres' },
};

// ---------------------------------------------------------------------------
// Helpers de respuesta HTTP
// ---------------------------------------------------------------------------

const ok = (res, data, msg = 'Operación exitosa') => res.status(200).json({ status: true, code: 200, message: msg, data });
const notFound = (res, msg = 'Recurso no encontrado') => res.status(404).json({ status: false, code: 404, message: msg, data: null });
const unauth = (res) => res.status(401).json({ status: false, code: 401, message: 'Token inválido o expirado', data: null });
const server = (res) => res.status(500).json({ status: false, code: 500, message: 'Error interno del servidor', data: null });

function randomOutcome() {
    const r = Math.random();
    if (r < 0.70) return 'success';
    if (r < 0.85) return 'unauthorized';
    return 'server_error';
}

const withDelay = fn => (req, res) => setTimeout(() => fn(req, res), 600);
const log = (ep, o) => console.log(`[${new Date().toISOString()}] ${ep} → ${o}`);

// Resuelve los IDs del reporte a objetos completos para la respuesta
function resolverReporte(r) {
    return {
        id: r.id,
        numeracion: r.numeracion,
        descripcion: r.descripcion,
        fecha_creacion: r.fecha_creacion,
        estado: obtenerEstado(r.estado_id),
        tipo_reporte: obtenerTipoReporte(r.tipo_reporte_id),
        area: obtenerArea(r.area_id),
    };
}

// ---------------------------------------------------------------------------
// Endpoints de catálogos
// ---------------------------------------------------------------------------

app.get('/catalogos/estados-reporte', withDelay((req, res) => {
    // const o = randomOutcome(); log('GET /catalogos/estados-reporte', o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);
    ok(res, estadosReporte, 'Estados obtenidos exitosamente');
}));

app.get('/catalogos/tipos-reporte', withDelay((req, res) => {
    // const o = randomOutcome(); log('GET /catalogos/tipos-reporte', o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);
    ok(res, tiposReporte, 'Tipos de reporte obtenidos exitosamente');
}));

app.get('/catalogos/areas', withDelay((req, res) => {
    // const o = randomOutcome(); log('GET /catalogos/areas', o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);
    ok(res, areas, 'Áreas obtenidas exitosamente');
}));

// ---------------------------------------------------------------------------
// Endpoints de reportes
// ---------------------------------------------------------------------------

app.get('/reportes', withDelay((req, res) => {
    // const o = randomOutcome(); log('GET /reportes', o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);
    const lista = [...reportes].sort((a, b) => b.id - a.id);
    ok(res, lista, 'Reportes obtenidos exitosamente');
}));

app.get('/reportes/:id', withDelay((req, res) => {
    // const o = randomOutcome(); log(`GET /reportes/${req.params.id}`, o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);

    const r = reportesDetalle[parseInt(req.params.id)];
    if (!r) return notFound(res, 'Reporte no encontrado');
    ok(res, resolverReporte(r), 'Reporte obtenido exitosamente');
}));

let nextId = 6;

app.post('/reportes', withDelay((req, res) => {
    // const o = randomOutcome(); log('POST /reportes', o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);

    const { numeracion, descripcion, tipo_reporte_id, area_id } = req.body;
    const errores = {};
    if (!numeracion) errores.numeracion = 'La numeración es requerida';
    if (!descripcion) errores.descripcion = 'La descripcion es requerida';
    if (!tipo_reporte_id) errores.tipo_reporte_id = 'El tipo de reporte es requerido';
    if (!area_id) errores.area_id = 'El área es requerida';

    if (tipo_reporte_id && !obtenerTipoReporte(tipo_reporte_id)) errores.tipo_reporte_id = 'Tipo de reporte inválido';
    if (area_id && !obtenerArea(area_id)) errores.area_id = 'Área inválida';

    if (Object.keys(errores).length > 0)
        return res.status(422).json({ status: false, code: 422, message: 'Error de validación', data: errores });

    const nuevo = {
        id: nextId++,
        numeracion,
        descripcion,
        fecha_creacion: new Date().toISOString().split('T')[0],
        estado_id: 2, // Pendiente al crear
        tipo_reporte_id,
        area_id,
    };

    reportes.push({ id: nuevo.id, numeracion: nuevo.numeracion });
    reportesDetalle[nuevo.id] = nuevo;

    ok(res, resolverReporte(nuevo), 'Reporte creado exitosamente');
}));

app.put('/reportes/:id', withDelay((req, res) => {
    const o = randomOutcome(); log(`PUT /reportes/${req.params.id}`, o);
    if (o === 'unauthorized') return unauth(res);
    if (o === 'server_error') return server(res);

    const r = reportesDetalle[parseInt(req.params.id)];
    if (!r) return notFound(res, 'Reporte no encontrado');

    const { numeracion, descripcion, tipo_reporte_id, area_id } = req.body;
    const errores = {};
    if (!numeracion) errores.numeracion = 'La numeración es requerida';
    if (!descripcion) errores.descripcion = 'La descripción es requerida';
    if (!tipo_reporte_id) errores.tipo_reporte_id = 'El tipo de reporte es requerido';
    if (!area_id) errores.area_id = 'El área es requerida';
    if (tipo_reporte_id && !obtenerTipoReporte(tipo_reporte_id)) errores.tipo_reporte_id = 'Tipo de reporte inválido';
    if (area_id && !obtenerArea(area_id)) errores.area_id = 'Área inválida';

    if (Object.keys(errores).length > 0)
        return res.status(422).json({ status: false, code: 422, message: 'Error de validación', data: errores });

    // Actualizar en memoria
    r.numeracion = numeracion;
    r.descripcion = descripcion;
    r.tipo_reporte_id = tipo_reporte_id;
    r.area_id = area_id;

    const enLista = reportes.find(rep => rep.id === r.id);
    if (enLista) enLista.numeracion = numeracion;

    ok(res, resolverReporte(r), 'Reporte actualizado exitosamente');
}));

// ---------------------------------------------------------------------------
// Endpoints de acuerdos
// ---------------------------------------------------------------------------

app.get('/acuerdos/reporte/:id', withDelay((req, res) => {
    // const o = randomOutcome(); log(`GET /acuerdos/reporte/${req.params.id}`, o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);

    const reporteId = parseInt(req.params.id);

    if (!reportesDetalle[reporteId]) {
        return notFound(res, 'Reporte no encontrado');
    }

    const lista = acuerdos[reporteId] ?? [];

    ok(res, lista, 'Acuerdos obtenidos exitosamente');
}));

app.get('/acuerdos/:id', withDelay((req, res) => {
    // const o = randomOutcome(); log(`GET /acuerdos/${req.params.id}`, o);
    // if (o === 'unauthorized') return unauth(res);
    // if (o === 'server_error') return server(res);

    const a = acuerdosDetalle[parseInt(req.params.id)];
    if (!a) return notFound(res, 'Acuerdo no encontrado');
    ok(res, a, 'Acuerdo obtenido exitosamente');
}));

// ---------------------------------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\nReportes API → http://localhost:${PORT}\n`);
    console.log('── Catálogos ──────────────────────────────────────────');
    console.log('GET  /catalogos/estados-reporte');
    console.log('GET  /catalogos/tipos-reporte');
    console.log('GET  /catalogos/areas');
    console.log('── Reportes ───────────────────────────────────────────');
    console.log('GET  /reportes');
    console.log('GET  /reportes/:id');
    console.log('POST /reportes');
    console.log('PUT  /reportes/:id');
    console.log('── Acuerdos ───────────────────────────────────────────');
    console.log('GET  /acuerdos/reporte/:id   lista resumen por reporte');
    console.log('GET  /acuerdos/:id           detalle de acuerdo\n');
});