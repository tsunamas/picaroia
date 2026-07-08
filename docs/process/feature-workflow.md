# Feature Workflow (Branch -> PR -> Merge)

## 0) Validar alcance

Antes de tocar codigo, confirmar:

1. El cambio aporta al runtime de hardware o al contrato de payload.
2. El cambio no acopla el core a un proveedor cloud.
3. Si algo cloud es necesario, va en capa externa de soporte.

## 1) Crear branch desde main

```bash
git checkout main
git pull --ff-only
git checkout -b feature/<scope>-<short-name>
```

## 2) Desarrollo incremental

- Commits pequenos, claros y atomicos.
- Mantener cambios acotados al objetivo de la feature.
- Evitar mezclar refactors no relacionados.

## 3) Ejecutar quality gates locales

```bash
# Placeholder: reemplazar por scripts reales del proyecto
# npm run lint
# npm run typecheck
# npm test
# npm run test:integration
# npm run test:e2e
# npm run test:performance
```

## 4) Abrir PR

Checklist minimo:

1. Contexto y objetivo.
2. Que cambia y que no cambia.
3. Riesgos y mitigaciones.
4. Evidencia de tests (salidas, logs, capturas cuando aplique).
5. Impacto en latencia/estabilidad del runtime local.
6. Confirmacion de Scope Gate.

## 5) Merge

- Requerir checks en verde.
- Requerir al menos una aprobacion.
- Preferir merge limpio y trazable.

## 6) Post-merge

- Verificar salud del entorno principal.
- Revisar metricas de regresion (latencia, errores, interrupciones).
