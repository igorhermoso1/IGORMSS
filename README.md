# Zerbitzuak · Laborategia

Herramienta de estudio para la asignatura **Zerbitzuak** (servicios de red sobre servidor Ubuntu).
Sitio estático: teoría + instalación paso a paso + ejercicios + autoevaluación. Sin servidor, sin login.

## Publicar en GitHub Pages

1. Crea un repositorio (sugerencia de nombre: `proyecto-zerbitzuak-basico`).
2. Sube el contenido de esta carpeta.
3. En **Settings → Pages**, elige *Deploy from a branch*, rama `main`, carpeta **`/docs`**.
4. URL resultante: `https://<usuario>.github.io/proyecto-zerbitzuak-basico/`

## Estructura

```
docs/
├── index.html            ← Hub: mapa de topología de los 9 temas + progreso
├── assets/
│   ├── styles.css        ← Sistema de diseño "consola de red"
│   └── app.js            ← Motor: progreso, quiz, copiar comandos, checklist
├── tema-0/index.html     ← VMs + IPs  (patrón: instalación paso a paso)
└── tema-1/index.html     ← TCP/IP     (patrón: teoría + simulador + test)
```

## Estado del temario

| Tema | Contenido | Estado |
|------|-----------|--------|
| 0 | Máquinas virtuales + IPs | ✅ completo |
| 1 | TCP/IP y enrutamiento | ✅ completo (2 simuladores) |
| 2 | DNS · bind9 | pendiente |
| 3 | DHCP | pendiente |
| 4 | SSH · Webmin · VNC · AnyDesk | pendiente |
| 5 | Samba + Proxy (Squid) | pendiente |
| 6 | FTP · vsftpd | pendiente |
| 7 | Posta (correo) | pendiente |
| 8 | Apache · Moodle · WordPress · XAMPP · OpenLDAP | pendiente |

Los temas 2–8 se construyen reutilizando uno de los dos patrones ya cerrados
(instalación paso a paso / teoría + simulador). Los enlaces a esos nodos del
mapa están bloqueados hasta que se publique cada página.

## Notas

- El progreso se guarda en `localStorage` del navegador del alumno.
- Para añadir un tema nuevo: duplica una carpeta `tema-N/`, escribe el contenido
  y desbloquéalo poniendo su `href` en el array `TEMAS` de `docs/index.html`.
- Material teórico basado en los apuntes de Joseba Mirena Bilbao Requena (CC BY-NC-SA 2.5).
