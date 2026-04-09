# Catálogo Flora Iquitos

Catálogo virtual de flora ornamental de Iquitos con identificación morfológica asistida.

Aplicación móvil desarrollada como actividad de Responsabilidad Social Universitaria (RSU) del curso de Botánica Sistemática, en la Universidad Nacional de la Amazonía Peruana (UNAP).

## Stack Tecnológico

- **Frontend:** React Native + Expo (SDK 54)
- **UI Components:** Tamagui
- **Navegación:** React Navigation (JS Stack + Bottom Tabs)
- **Backend / CMS:** Sanity.io (NoSQL)
- **Autenticación:** Clerk (Email + Google OAuth)
- **Lenguaje:** TypeScript
- **Íconos:** @expo/vector-icons (MaterialCommunityIcons)

## Estructura del Proyecto

```
app/
├── _layout.tsx              # Root layout (Clerk + Tamagui + Theme)
├── oauth-callback.tsx       # Callback de Google OAuth
└── (app)/
    ├── _layout.tsx           # Auth guard + JS Stack navigator
    ├── sign-in.tsx           # Inicio de sesión
    ├── sign-up.tsx           # Registro
    ├── about.tsx             # Acerca del proyecto (RSU)
    ├── alert-modal.tsx       # Modal de alertas
    ├── plant/
    │   └── [id].tsx          # Ficha técnica de planta
    └── (tabs)/
        ├── _layout.tsx       # Tab navigator
        ├── index.tsx         # Buscador principal + filtros
        └── profile.tsx       # Perfil de usuario

components/
├── PlantCard.tsx             # Tarjeta de planta
├── SignInWithGoogle.tsx       # Botón de Google OAuth
├── SignOutButton.tsx          # Botón de cerrar sesión
├── Logo.tsx                   # Logo de la app
├── Alert.tsx                  # Componente de alerta
└── haptic-tab.tsx             # Tab con haptic feedback

sanity/                        # Panel administrativo (Sanity Studio)
├── schemaTypes/
│   └── planta.ts             # Schema de fichas técnicas
└── sanity.config.ts

lib/
├── sanity.ts                  # Cliente de Sanity + image builder
└── utils/
    └── user.ts                # Utilidades de usuario (display name, initials)
```

## Cómo Ejecutar

### App Móvil
```bash
npm install
npx expo start --offline -c
```

### Panel Administrativo (Sanity Studio)
```bash
cd sanity
npm install
npm run dev
```

## Variables de Entorno (.env)

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
EXPO_PUBLIC_SANITY_PROJECT_ID=...
EXPO_PUBLIC_SANITY_DATASET=production
```

## Equipo

- **Danilo Alvarado** — Programador / Líder Técnico
- **Marlon Rengifo** — Programador / Líder Técnico
- **Angie Cabanillas** — Programadora / Tester
- **Brittany Rengifo** — Programadora / Tester
- **Walter Zumaeta** — Programador / Tester

**Docente:** Rafael Vilca Barbarán  
**Curso:** Taller de Software II — Ciclo IX  
**Universidad:** UNAP — Iquitos, 2026
