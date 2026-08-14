export type ExerciseDBItem = {
  id: string;
  name: string;
  category: string;
  equipment: string;
  force?: string;
  level: "beginner" | "intermediate" | "expert";
  mechanic?: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  images: string[];
  gifUrl?: string;
};

// CDN Base for Free Exercise DB Images
const CDN_BASE = "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises";

export const getExerciseImageUrl = (imagePath: string) => {
  if (imagePath.startsWith("http")) return imagePath;
  return `${CDN_BASE}/${imagePath}`;
};

// Curated top exercises with animated frames and GIFs
export const popularExercisesDB: ExerciseDBItem[] = [
  {
    id: "Barbell_Full_Squat",
    name: "Barbell Full Squat (Sentadilla Profunda)",
    category: "gluteos",
    equipment: "Barra olímpica",
    level: "intermediate",
    primaryMuscles: ["Cuádriceps", "Glúteo Mayor"],
    secondaryMuscles: ["Isquiotibiales", "Core"],
    images: ["Barbell_Full_Squat/0.jpg", "Barbell_Full_Squat/1.jpg"],
    gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
    instructions: [
      "Coloca la barra apoyada sobre los trapecios con agarre firme.",
      "Desciende flexionando cadera y rodillas manteniendo el pecho erguido.",
      "Rompe el paralelo (90°) con las rodillas alineadas a la punta de los pies.",
      "Empuja el suelo con fuerza desde los talones para volver a la posición inicial.",
    ],
  },
  {
    id: "Barbell_Hip_Thrust",
    name: "Barbell Hip Thrust (Empuje de Cadera)",
    category: "gluteos",
    equipment: "Barra & Banco",
    level: "intermediate",
    primaryMuscles: ["Glúteo Mayor"],
    secondaryMuscles: ["Isquiotibiales", "Aductores"],
    images: ["Barbell_Hip_Thrust/0.jpg", "Barbell_Hip_Thrust/1.jpg"],
    gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Hip-Thrust.gif",
    instructions: [
      "Apoya la parte media de la espalda sobre el banco acolchado.",
      "Coloca la barra sobre el pliegue de la cadera con protector de esponja.",
      "Extiende la cadera de forma explosiva hasta alinear muslos con el torso.",
      "Aprieta al máximo los glúteos arriba durante 1 segundo antes de descender.",
    ],
  },
  {
    id: "Dumbbell_Lunges",
    name: "Dumbbell Lunges (Zancadas con Mancuernas)",
    category: "gluteos",
    equipment: "Mancuernas",
    level: "beginner",
    primaryMuscles: ["Glúteo Mayor", "Cuádriceps"],
    secondaryMuscles: ["Isquiotibiales", "Gemelos"],
    images: ["Dumbbell_Lunges/0.jpg", "Dumbbell_Lunges/1.jpg"],
    gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lunge.gif",
    instructions: [
      "Sostén una mancuerna en cada mano a los costados con el torso erguido.",
      "Da un paso adelante amplio y desciende la rodilla trasera hacia el suelo.",
      "Forma un ángulo de 90° en ambas rodillas sin tocar el piso bruscamente.",
      "Empuja a través del talón delantero para volver al punto de partida.",
    ],
  },
  {
    id: "Plank",
    name: "Plank Isométrico (Plancha Abdominal)",
    category: "core",
    equipment: "Peso corporal",
    level: "beginner",
    primaryMuscles: ["Abdomen Recto", "Transverso"],
    secondaryMuscles: ["Hombros", "Glúteos"],
    images: ["Plank/0.jpg", "Plank/1.jpg"],
    instructions: [
      "Apoya los antebrazos en el suelo alineados debajo de los hombros.",
      "Extiende las piernas hacia atrás apoyando las puntas de los pies.",
      "Contrae el abdomen y los glúteos formando una línea recta continua.",
      "Sostén la posición respirando de forma controlada sin arquear la zona lumbar.",
    ],
  },
  {
    id: "Side_Bridge",
    name: "Side Plank (Plancha Lateral Oblicua)",
    category: "core",
    equipment: "Peso corporal",
    level: "intermediate",
    primaryMuscles: ["Oblicuos"],
    secondaryMuscles: ["Glúteo Medio", "Core"],
    images: ["Side_Bridge/0.jpg", "Side_Bridge/1.jpg"],
    instructions: [
      "Acuéstate de lado apoyando el antebrazo bajo el hombro.",
      "Eleva la pelvis del suelo hasta formar una línea recta de pies a cabeza.",
      "Mantén la contracción lateral activa sin dejar caer la cadera.",
      "Completa el tiempo indicado y repite sobre el lateral opuesto.",
    ],
  },
  {
    id: "Mountain_Climbers",
    name: "Mountain Climbers (Escaladores HIIT)",
    category: "hiit",
    equipment: "Peso corporal",
    level: "intermediate",
    primaryMuscles: ["Core Total", "Cardiovascular"],
    secondaryMuscles: ["Hombros", "Flexores de Cadera"],
    images: ["Mountain_Climbers/0.jpg", "Mountain_Climbers/1.jpg"],
    instructions: [
      "Inicia en posición de flexión con las manos firmes bajo los hombros.",
      "Lleva una rodilla hacia el pecho sin tocar el piso con ese pie.",
      "Alterna piernas a ritmo ágil continuo manteniendo la cadera baja.",
      "Mantén el core rígido para estabilizar la columna torácica.",
    ],
  },
  {
    id: "Dumbbell_Bent_Over_Row",
    name: "Dumbbell Row (Remo con Mancuernas)",
    category: "superior",
    equipment: "Mancuernas",
    level: "intermediate",
    primaryMuscles: ["Dorsal Ancho", "Romboides"],
    secondaryMuscles: ["Bíceps", "Deltoides Posterior"],
    images: ["Dumbbell_Bent-Over_Row/0.jpg", "Dumbbell_Bent-Over_Row/1.jpg"],
    gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif",
    instructions: [
      "Inclina el torso a 45° con la espalda recta y rodillas ligeramente flexionadas.",
      "Sostén las mancuernas con brazos extendidos hacia el suelo.",
      "Jala los codos hacia atrás rozando el tronco y aprieta las escápulas.",
      "Desciende controladamente sintiendo la elongación dorsal.",
    ],
  },
  {
    id: "Push-Ups",
    name: "Push-Ups (Flexiones de Pecho)",
    category: "superior",
    equipment: "Peso corporal",
    level: "beginner",
    primaryMuscles: ["Pectorales", "Tríceps"],
    secondaryMuscles: ["Deltoides Anterior", "Core"],
    images: ["Push-Ups/0.jpg", "Push-Ups/1.jpg"],
    gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif",
    instructions: [
      "Coloca las manos en el suelo ligeramente más anchas que los hombros.",
      "Baja el pecho hasta casi rozar el suelo con los codos a 45° del cuerpo.",
      "Empuja el suelo con fuerza hasta extender los brazos.",
      "Mantén el abdomen y glúteos tensos para no arquear la columna.",
    ],
  },
];

// Fetch full database from open repository
let cachedDatabase: ExerciseDBItem[] | null = null;

export async function fetchFullExerciseDB(): Promise<ExerciseDBItem[]> {
  if (cachedDatabase) return cachedDatabase;
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json",
    );
    if (!res.ok) throw new Error("No se pudo cargar la base de ejercicios");
    const data = await res.json();
    cachedDatabase = data as ExerciseDBItem[];
    return cachedDatabase;
  } catch (err) {
    console.warn("Usando catálogo base pre-cargado de ExerciseDB:", err);
    return popularExercisesDB;
  }
}
