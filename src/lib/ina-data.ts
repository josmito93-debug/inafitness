export type Macro = { label: string; value: number; goal: number; unit: string };

export const usuario = {
  nombre: "Mike Wheeler",
  plan: "Reto 30 Días · Pro",
  inicial: "M",
  meta: "Recomposición corporal",
  desde: "Marzo 2026",
};

export const heartRateData = {
  currentBpm: 95,
  averageBpm: 110,
  status: "Normal",
  waveHeights: [30, 45, 25, 80, 60, 95, 40, 85, 50, 70, 35, 90, 45, 65, 30],
};

export const stepDistanceData = {
  distanceKm: 11.98,
  stepsToday: 14320,
  stepsTarget: 15000,
  percentage: 80,
};

export const bodyFatData = {
  percentage: 24.5,
  fatKg: 13.6,
  status: "Normal",
  targetPct: 20.0,
};

export const sleepScoresData = {
  totalPct: 89,
  lightPct: 25,
  remPct: 30,
  deepPct: 45,
  hoursTotal: 7.8,
};

export const nutritionOverviewData = {
  adherencePct: 70,
  status: "Excellent",
  caloriesCurrent: 637,
  proteinGrams: 65,
  carbsGrams: 45,
  fatsGrams: 18,
  caloriesLeft: 1707,
  eatenTime: "1:22",
  burnedCal: 233,
};

export const glucoseData = {
  valueMgDl: 118,
  status: "Normal",
  targetRange: "70-130 mg/dL",
};

export const caloriesBurnData = {
  percentage: 65,
  targetKcal: 2200,
  burnedKcal: 1430,
};

export const waterIntakeData = {
  liters: 1.5,
  targetLiters: 2.5,
  pct: 60,
};

export const hikingWidgetData = {
  bpm: 110,
  distanceMeters: 100,
  cadence: 90,
};

export const neonGraphData = {
  conversionRate: "300%",
  subtitle: "increase vs last month",
  updatedText: "Data updated 4h ago",
  points: [
    { day: "1", val: 30 },
    { day: "5", val: 45 },
    { day: "10", val: 40 },
    { day: "15", val: 95 },
    { day: "20", val: 50 },
    { day: "25", val: 42 },
    { day: "30", val: 65 },
  ],
};

export const workoutStudioData = {
  mainBlockMin: 22,
  activeSet: "3/3",
  timeRemaining: "26:43",
  currentExercise: {
    nombre: "Reverse Lunge",
    timerDisplay: "00:06",
    next: "Side Bend",
  },
  workoutsCompleted: 10,
  totalMinutesThisMonth: 95,
  streakWeeks: 2,
  featuredWorkout: {
    title: "Full Burn Intro",
    audioTrack: "DJ Armin",
    kcalBurned: 420,
    exercisesCount: 10,
    durationMinutes: 35,
    tag: "Burn",
  },
  exercisesList: [
    { id: 1, name: "Seated Knee Tuck", detail: "30 sec × 2", durationSec: 30, completed: true },
    { id: 2, name: "Deep Lunge", detail: "45 sec × 3", durationSec: 45, completed: true },
    { id: 3, name: "Squat Hold", detail: "45 sec × 3", durationSec: 45, completed: true },
    { id: 4, name: "Reverse Lunge", detail: "00:06 timer", durationSec: 60, completed: false },
    { id: 5, name: "Side Bend", detail: "40 sec × 2", durationSec: 40, completed: false },
  ],
  monthName: "Abril 2026",
  calendarDays: [
    { day: 30, month: "Marzo", isCurrent: false },
    { day: 31, month: "Marzo", isCurrent: false },
    { day: 1, isCurrent: true, type: null },
    { day: 2, isCurrent: true, type: "burn" },
    { day: 3, isCurrent: true, type: "power" },
    { day: 4, isCurrent: true, type: null },
    { day: 5, isCurrent: true, type: null },
    { day: 6, isCurrent: true, type: null },
    { day: 7, isCurrent: true, type: "burn" },
    { day: 8, isCurrent: true, type: null },
    { day: 9, isCurrent: true, type: "power" },
    { day: 10, isCurrent: true, type: null },
    { day: 11, isCurrent: true, type: null },
    { day: 12, isCurrent: true, type: "burn" },
    { day: 13, isCurrent: true, type: null },
    { day: 14, isCurrent: true, type: "power" },
    { day: 15, isCurrent: true, type: null },
    { day: 16, isCurrent: true, type: null },
    { day: 17, isCurrent: true, type: "burn" },
    { day: 18, isCurrent: true, type: null },
    { day: 19, isCurrent: true, type: null },
    { day: 20, isCurrent: true, type: null },
    { day: 21, isCurrent: true, type: null },
    { day: 22, isCurrent: true, type: null },
    { day: 23, isCurrent: true, type: null },
    { day: 24, isCurrent: true, type: null },
    { day: 25, isCurrent: true, type: null },
    { day: 26, isCurrent: true, type: null },
    { day: 27, isCurrent: true, type: null },
    { day: 28, isCurrent: true, type: null },
    { day: 29, isCurrent: true, type: null },
    { day: 30, isCurrent: true, type: null },
  ],
};

export const resumenHoy = {
  caloriasConsumidas: 1642,
  caloriasMeta: 2100,
  caloriasQuemadas: 468,
  pasos: 14320,
  pasosMeta: 15000,
  agua: 1.5,
  aguaMeta: 2.5,
  fcMedia: 95,
  sueno: 7.8,
  racha: 14,
};

export const macros: Macro[] = [
  { label: "Proteína", value: 65, goal: 140, unit: "g" },
  { label: "Carbohidratos", value: 45, goal: 180, unit: "g" },
  { label: "Grasas", value: 18, goal: 55, unit: "g" },
  { label: "Fibra", value: 22, goal: 30, unit: "g" },
];

export const comidas = [
  {
    momento: "Desayuno",
    hora: "07:10",
    kcal: 420,
    items: ["Avena con canela y frutos rojos", "3 claras + 1 huevo", "Café negro"],
    p: 34,
    c: 48,
    g: 9,
  },
  {
    momento: "Snack",
    hora: "10:30",
    kcal: 210,
    items: ["Yogur griego 0%", "10 almendras"],
    p: 20,
    c: 12,
    g: 9,
  },
  {
    momento: "Almuerzo",
    hora: "13:15",
    kcal: 610,
    items: ["Pechuga a la plancha 180 g", "Arroz integral", "Ensalada verde + aguacate"],
    p: 52,
    c: 62,
    g: 16,
  },
  {
    momento: "Pre-entreno",
    hora: "17:00",
    kcal: 180,
    items: ["Banana", "Batido de proteína"],
    p: 24,
    c: 22,
    g: 2,
  },
  {
    momento: "Cena",
    hora: "20:20",
    kcal: 480,
    items: ["Salmón al horno", "Puré de calabaza", "Espárragos"],
    p: 40,
    c: 20,
    g: 22,
  },
];

export const programas = [
  {
    nombre: "Cambia tu Cuerpo y Mente",
    semanas: "4 semanas",
    precio: "$30",
    puntos: ["Plan de alimentación", "Rutinas en video HD", "Seguimiento semanal"],
  },
  {
    nombre: "Reto de 30 Días",
    semanas: "4 semanas",
    precio: "$30",
    puntos: ["Comunidad y ranking", "Retos diarios", "Ajustes de macros"],
    destacado: true,
  },
  {
    nombre: "Entrenamiento Presencial",
    semanas: "4 semanas",
    precio: "$30",
    puntos: ["Sesiones 1 a 1", "Evaluación corporal", "Plan de suplementación"],
  },
];