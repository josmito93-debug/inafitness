export type Macro = { label: string; value: number; goal: number; unit: string };

export type Exercise = {
  id: number;
  name: string;
  category: "gluteos" | "core" | "superior" | "hiit";
  detail: string;
  sets: number;
  repsOrDuration: string;
  durationSec: number;
  restSec: number;
  completed: boolean;
  targetMuscles: string[];
  secondaryMuscles: string[];
  equipment: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  tempo: string;
  estKcal: number;
  imageUrl: string;
  images?: string[];
  gifUrl: string;
  youtubeQuery: string;
  coachTips: string;
  commonMistakes: string[];
  instrucciones: string[];
};

export const usuario = {
  nombre: "Mike Wheeler",
  plan: "Reto 30 Días · Pro",
  inicial: "M",
  meta: "Recomposición corporal & Hipertrofia",
  nivel: "Level 3 · Advanced Athlete",
  xpActual: 380,
  xpSiguienteNivel: 500,
  desde: "Marzo 2026",
};

export const heartRateData = {
  currentBpm: 95,
  averageBpm: 110,
  restingBpm: 58,
  maxBpm: 168,
  status: "Zona Quema de Grasa Activa",
  waveHeights: [30, 45, 25, 80, 60, 95, 40, 85, 50, 70, 35, 90, 45, 65, 30, 85, 75, 40, 90, 60],
};

export const stepDistanceData = {
  distanceKm: 11.98,
  stepsToday: 14320,
  stepsTarget: 15000,
  percentage: 95,
};

export const bodyFatData = {
  percentage: 18.5,
  fatKg: 12.2,
  muscleKg: 58.4,
  status: "Atleta Óptimo",
  targetPct: 15.0,
};

export const sleepScoresData = {
  totalPct: 89,
  lightPct: 25,
  remPct: 30,
  deepPct: 45,
  hoursTotal: 7.8,
  scoreLabel: "Recuperación Excelente",
};

export const nutritionOverviewData = {
  adherencePct: 92,
  status: "Excelente Adherencia",
  caloriesCurrent: 1340,
  proteinGrams: 160,
  carbsGrams: 158,
  fatsGrams: 45,
  caloriesLeft: 460,
  eatenTime: "1:22",
  burnedCal: 540,
};

export const glucoseData = {
  valueMgDl: 118,
  status: "Normal",
  targetRange: "70-130 mg/dL",
};

export const caloriesBurnData = {
  percentage: 74,
  targetKcal: 2200,
  burnedKcal: 1640,
};

export const waterIntakeData = {
  liters: 2.0,
  targetLiters: 3.0,
  pct: 67,
};

export const workoutStudioData = {
  mainBlockMin: 32,
  activeSet: "3/4",
  timeRemaining: "18:43",
  streakWeeks: 3,
  workoutsCompletedThisMonth: 14,
  featuredWorkout: {
    title: "Glúteo, Pierna & Core Esculpido",
    subtitle: "Sobrecarga Progresiva & Tensión Mecánica",
    audioTrack: "Energía High-Tempo · Andre Ina Beats",
    kcalBurned: 485,
    exercisesCount: 6,
    durationMinutes: 32,
    tag: "Fuerza & Hipertrofia",
  },
  exercisesList: [
    {
      id: 1,
      name: "Seated Knee Tuck con Compresión",
      category: "core",
      detail: "4 series × 30 seg (Isometría final)",
      sets: 4,
      repsOrDuration: "30 seg",
      durationSec: 30,
      restSec: 20,
      completed: true,
      targetMuscles: ["Abdomen Recto", "Transverso"],
      secondaryMuscles: ["Flexores de Cadera", "Core Lateral"],
      equipment: "Banco plano o Esterilla",
      difficulty: "Intermedio",
      tempo: "2-0-1-1",
      estKcal: 42,
      imageUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
      images: ["3_4_Sit-Up/0.jpg", "3_4_Sit-Up/1.jpg"],
      gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif",
      youtubeQuery: "seated+knee+tuck+core+exercise+tutorial",
      coachTips:
        "Mantén el torso inclinado a 45° y no dejes que los talones toquen el suelo entre repeticiones. Exhala con fuerza al comprimir las rodillas hacia el pecho.",
      commonMistakes: [
        "Arquear la espalda lumbar en la extensión",
        "Mover solo las piernas sin activar el recto abdominal",
      ],
      instrucciones: [
        "Siéntate en el borde de una colchoneta o banco plano con las manos detrás de la cadera para apoyo.",
        "Extiende las piernas hacia adelante a 10 cm del suelo con los cuádriceps tensos.",
        "Lleva ambas rodillas hacia el pecho de manera explosiva mientras acercas el torso.",
        "Pausa 1 segundo en máxima contracción y regresa de forma controlada.",
      ],
    },
    {
      id: 2,
      name: "Deep Bulgarian Lunge con Pausa",
      category: "gluteos",
      detail: "4 series × 12 reps por pierna (45 seg)",
      sets: 4,
      repsOrDuration: "12 reps / pierna",
      durationSec: 45,
      restSec: 30,
      completed: true,
      targetMuscles: ["Glúteo Mayor", "Cuádriceps"],
      secondaryMuscles: ["Isquiotibiales", "Aductores"],
      equipment: "Mancuernas / Banco de apoyo",
      difficulty: "Avanzado",
      tempo: "3-1-1-0",
      estKcal: 68,
      imageUrl:
        "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80",
      images: ["Dumbbell_Lunges/0.jpg", "Dumbbell_Lunges/1.jpg"],
      gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
      youtubeQuery: "bulgarian+split+squat+glutes+form+tutorial",
      coachTips:
        "Inclina el torso ligeramente hacia adelante a 15° para maximizar el reclutamiento del glúteo mayor y empuja el suelo a través de tu talón.",
      commonMistakes: [
        "Dejar que la rodilla delantera colapse hacia adentro (valgo)",
        "Colocar el pie trasero demasiado cerca perdiendo profundidad",
      ],
      instrucciones: [
        "Coloca el empeine de un pie elevado sobre un banco detrás de ti.",
        "Baja de forma lenta durante 3 segundos hasta que la rodilla trasera roce el suelo.",
        "Mantén una pausa isométrica de 1 segundo en el punto de máxima tensión.",
        "Empuja fuerte a través del talón delantero para ascender de manera controlada.",
      ],
    },
    {
      id: 3,
      name: "Squat Hold Isométrico & Pulse",
      category: "gluteos",
      detail: "3 series × 45 seg bajo tensión constante",
      sets: 3,
      repsOrDuration: "45 seg tensión",
      durationSec: 45,
      restSec: 25,
      completed: true,
      targetMuscles: ["Cuádriceps", "Glúteo Medio", "Vasto Medial"],
      secondaryMuscles: ["Core", "Erectores Espinales"],
      equipment: "Peso corporal / Banda",
      difficulty: "Intermedio",
      tempo: "Isometría Continua",
      estKcal: 55,
      imageUrl:
        "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=800&auto=format&fit=crop&q=80",
      images: ["Barbell_Full_Squat/0.jpg", "Barbell_Full_Squat/1.jpg"],
      gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
      youtubeQuery: "isometric+squat+hold+glute+burn+tutorial",
      coachTips:
        "Abre las rodillas hacia afuera alineadas con la punta de tus pies. El pecho siempre erguido y las manos al frente para equilibrar el centro de gravedad.",
      commonMistakes: [
        "Subir la cadera por encima de los 90° perdiendo la tensión muscular",
        "Redondear la espalda o bajar la mirada al suelo",
      ],
      instrucciones: [
        "Separa los pies al ancho de hombros con puntas rotadas 15° hacia afuera.",
        "Desciende hasta que los muslos queden paralelos al suelo (90° de flexión).",
        "Sostén la postura sin rebotar, respirando con ritmo constante.",
        "En los últimos 10 segundos realiza micro-pulsos de 2 cm.",
      ],
    },
    {
      id: 4,
      name: "Reverse Lunge de Potencia & Elevación",
      category: "gluteos",
      detail: "3 series × 60 seg alternando piernas",
      sets: 3,
      repsOrDuration: "60 seg continuo",
      durationSec: 60,
      restSec: 30,
      completed: false,
      targetMuscles: ["Glúteo Mayor", "Isquiotibiales"],
      secondaryMuscles: ["Cuádriceps", "Gemelos"],
      equipment: "Mancuernas livianas o Peso libre",
      difficulty: "Avanzado",
      tempo: "2-0-1-0",
      estKcal: 75,
      imageUrl:
        "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&auto=format&fit=crop&q=80",
      images: ["Dumbbell_Lunges/0.jpg", "Dumbbell_Lunges/1.jpg"],
      gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
      youtubeQuery: "reverse+lunge+knee+drive+glute+tutorial",
      coachTips:
        "Al regresar del paso hacia atrás, impulsa la rodilla hacia arriba hasta la altura del ombligo para activar el glúteo de apoyo en equilibrio.",
      commonMistakes: [
        "Impactar la rodilla trasera contra el suelo bruscamente",
        "Perder la verticalidad del tronco",
      ],
      instrucciones: [
        "Párate con pies al ancho de cadera y abdomen contraído.",
        "Da un paso amplio hacia atrás aterrizando sobre la punta del pie.",
        "Desciende verticalmente flexionando ambas rodillas en ángulo de 90°.",
        "Empuja con potencia el talón delantero y sube la rodilla trasera al pecho.",
      ],
    },
    {
      id: 5,
      name: "Side Plank con Abducción Glútea",
      category: "core",
      detail: "3 series × 40 seg por lateral",
      sets: 3,
      repsOrDuration: "40 seg / lado",
      durationSec: 40,
      restSec: 20,
      completed: false,
      targetMuscles: ["Oblicuos", "Glúteo Medio"],
      secondaryMuscles: ["Core Profundo", "Hombros"],
      equipment: "Esterilla de entrenamiento",
      difficulty: "Intermedio",
      tempo: "2-1-2-1",
      estKcal: 48,
      imageUrl:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
      images: ["Side_Bridge/0.jpg", "Side_Bridge/1.jpg"],
      gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bicycle-Crunch.gif",
      youtubeQuery: "side+plank+leg+lift+glute+abduction",
      coachTips:
        "Alinea tobillo, cadera y hombro en una sola línea recta. No dejes caer la cadera hacia el piso en ningún momento.",
      commonMistakes: [
        "Rotar la cadera hacia el frente perdiendo el plano frontal",
        "Sobrecargar el cuello mirando hacia abajo",
      ],
      instrucciones: [
        "Colócate de lado apoyando el antebrazo bajo el hombro.",
        "Eleva la cadera del suelo formando una línea recta continua.",
        "Eleva la pierna superior a 30° contrayendo el glúteo lateral.",
        "Baja la pierna con suavidad sin que la cadera ceda hacia el suelo.",
      ],
    },
    {
      id: 6,
      name: "Remo con Mancuerna & Apertura Escapular",
      category: "superior",
      detail: "4 series × 12 reps (Espalda & Postura)",
      sets: 4,
      repsOrDuration: "12 reps / brazo",
      durationSec: 45,
      restSec: 30,
      completed: false,
      targetMuscles: ["Dorsal Ancho", "Romboides"],
      secondaryMuscles: ["Deltoides Posterior", "Bíceps"],
      equipment: "Mancuernas",
      difficulty: "Intermedio",
      tempo: "2-1-1-1",
      estKcal: 52,
      imageUrl:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",
      images: ["Dumbbell_Bent-Over_Row/0.jpg", "Dumbbell_Bent-Over_Row/1.jpg"],
      gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif",
      youtubeQuery: "dumbbell+row+back+muscles+technique",
      coachTips:
        "Inicia el movimiento jalando desde el codo hacia la cadera, no desde la mano. Aprieta las escápulas al tope del movimiento durante 1 segundo.",
      commonMistakes: [
        "Usar impulso con la columna torácica",
        "Llevar la mancuerna al pecho en lugar de hacia la cadera",
      ],
      instrucciones: [
        "Apoya una mano y rodilla sobre el banco con la espalda neutra.",
        "Sostén la mancuerna con el brazo extendido apuntando al suelo.",
        "Jala el codo hacia atrás y arriba rozando las costillas.",
        "Contrae la espalda alta en el tope y desciende con control.",
      ],
    },
    {
      id: 7,
      name: "Mountain Climbers HIIT Explosivos",
      category: "hiit",
      detail: "4 series × 30 seg ritmo anaeróbico",
      sets: 4,
      repsOrDuration: "30 seg ritmo alto",
      durationSec: 30,
      restSec: 20,
      completed: false,
      targetMuscles: ["Core Total", "Sistema Cardiovascular"],
      secondaryMuscles: ["Hombros", "Flexores de Cadera"],
      equipment: "Peso corporal",
      difficulty: "Avanzado",
      tempo: "Máxima Velocidad",
      estKcal: 65,
      imageUrl:
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=800&auto=format&fit=crop&q=80",
      images: ["Mountain_Climbers/0.jpg", "Mountain_Climbers/1.jpg"],
      gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif",
      youtubeQuery: "mountain+climbers+form+cardio+core",
      coachTips:
        "Mantén las caderas bajas, hombros exactamente sobre las muñecas y los pies rozando el piso con velocidad constante.",
      commonMistakes: [
        "Elevar los glúteos como una carpa",
        "Rebotar sobre las muñecas sin amortiguar",
      ],
      instrucciones: [
        "Inicia en posición de plancha alta con manos al ancho de hombros.",
        "Lleva una rodilla hacia el pecho sin tocar el piso con ese pie.",
        "Alterna rápidamente con la otra pierna como si corrieras en el lugar.",
        "Mantén el abdomen ultra apretado y la mirada entre las manos.",
      ],
    },
  ] as Exercise[],
};

export const programas = [
  {
    nombre: "Cambia tu Cuerpo y Mente",
    semanas: "4 semanas",
    precio: "$30",
    puntos: ["Plan de alimentación gourmet", "Rutinas en video HD", "Seguimiento semanal"],
  },
  {
    nombre: "Reto de 30 Días Andre Ina",
    semanas: "4 semanas",
    precio: "$30",
    puntos: [
      "Comunidad & ranking de XP",
      "Acompañamiento directo 1 a 1",
      "Ajustes semanales de macros",
    ],
    destacado: true,
  },
  {
    nombre: "Entrenamiento Personalizado",
    semanas: "4 semanas",
    precio: "$30",
    puntos: [
      "Evaluación corporal completa",
      "Plan de hábitos & motivación",
      "Soporte directo por chat",
    ],
  },
];

export const resumenHoy = {
  caloriasConsumidas: 1340,
  caloriasMeta: 1800,
  pasos: 9240,
  pasosMeta: 12000,
  racha: 5,
};

export type Comida = {
  momento: string;
  hora: string;
  kcal: number;
  p: number; // proteína g
  c: number; // carbohidratos g
  g: number; // grasas g
  items: string[];
  receta?: string;
  chefTip?: string;
};

export const comidas: Comida[] = [
  {
    momento: "Desayuno Gourmet",
    hora: "07:10",
    kcal: 380,
    p: 32,
    c: 38,
    g: 10,
    items: [
      "4 claras de huevo + 1 huevo completo a la copa",
      "80g avena con canela de Ceilán y arándanos silvestres",
      "½ plátano en finas rodajas con semillas de chía",
      "Café negro filtrado sin azúcar añadido",
    ],
    receta:
      "Cocina la avena a fuego lento con agua y canela. Añade los arándanos al final para conservar sus antioxidantes.",
    chefTip: "Usa canela en rama rallada para un dulzor natural sin calorías.",
  },
  {
    momento: "Snack Acelerador",
    hora: "10:30",
    kcal: 180,
    p: 18,
    c: 16,
    g: 5,
    items: [
      "1 manzana verde Granny Smith en lonjas crujientes",
      "20g mantequilla de almendras natural 100% pura",
      "Infusión de té verde con gotas de limón fresco",
    ],
    receta:
      "Corta la manzana y acompáñala de mantequilla de almendra para ralentizar la absorción de glucosa.",
    chefTip: "El ácido málico de la manzana verde optimiza tu energía matutina.",
  },
  {
    momento: "Almuerzo Principal",
    hora: "13:00",
    kcal: 520,
    p: 45,
    c: 52,
    g: 12,
    items: [
      "180g pechuga de pollo marinada con orégano y limón",
      "150g arroz jazmín o quinoa real tricolor",
      "1 taza brócoli al vapor con sal marina",
      "1 cda aceite de oliva extra virgen prensado en frío",
    ],
    receta:
      "Dora la pechuga a la plancha a fuego medio-alto 4 min por lado para que quede jugosa por dentro.",
    chefTip: "Agrega el aceite de oliva en crudo después de servir para no oxidar sus polifenoles.",
  },
  {
    momento: "Pre-entreno Energético",
    hora: "16:30",
    kcal: 220,
    p: 25,
    c: 22,
    g: 4,
    items: [
      "1 scoop proteína whey aislada sabor choco-avellana",
      "150ml leche de almendras sin azúcar",
      "1 plátano pequeño en cubos",
    ],
    receta:
      "Licúa la proteína con hielo y la leche de almendra para crear una textura de frappé energizante.",
    chefTip: "Consúmelo entre 30 y 45 minutos antes de tu bloque de entrenamiento.",
  },
  {
    momento: "Cena Reparadora",
    hora: "19:30",
    kcal: 420,
    p: 40,
    c: 30,
    g: 14,
    items: [
      "160g filete de salmón salvaje al horno con eneldo",
      "180g camote asado con páprika dulce",
      "Ensalada de espinacas baby, rúcula y aguacate",
      "Aderezo de vinagre balsámico de Módena",
    ],
    receta:
      "Hornea el salmón a 190°C durante 12-14 minutos. Acompaña con camote dorado y ensalada crujiente.",
    chefTip: "El omega-3 del salmón disminuye la inflamación muscular mientras duermes.",
  },
];

export const macros: Macro[] = [
  { label: "Proteína", value: 160, goal: 180, unit: "g" },
  { label: "Carbos", value: 158, goal: 200, unit: "g" },
  { label: "Grasas", value: 45, goal: 55, unit: "g" },
  { label: "Kcal", value: 1340, goal: 1800, unit: "" },
];
