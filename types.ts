
export enum SectionId {
  Epidemiologie = 'epidemiologie',
  Diagnostic = 'diagnostic',
  Traitement = 'traitement',
  Calculateur = 'calculateur',
  Suivi = 'suivi',
  CasParticuliers = 'cas-particuliers',
  Resistance = 'resistance',
  Latente = 'infection-latente',
  Quiz = 'quiz',
  References = 'references',
}

export interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}