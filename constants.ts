import { SectionId, NavItem, QuizQuestion } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: SectionId.Epidemiologie, label: 'Épidémiologie', icon: '📊' },
  { id: SectionId.Diagnostic, label: 'Diagnostic', icon: '🔍' },
  { id: SectionId.Traitement, label: 'Traitement', icon: '💊' },
  { id: SectionId.Calculateur, label: 'Calculateur', icon: '🧮' },
  { id: SectionId.Suivi, label: 'Suivi', icon: '📅' },
  { id: SectionId.CasParticuliers, label: 'Cas Particuliers', icon: '👥' },
  { id: SectionId.Resistance, label: 'Tuberculose résistante', icon: '⚠️' },
  { id: SectionId.Latente, label: 'Infection Latente', icon: '🤫' },
  { id: SectionId.Quiz, label: 'Quiz', icon: '🧠' },
  { id: SectionId.References, label: 'Références', icon: '📚' },
];

export const QUIZ_DATA: QuizQuestion[] = [
    {
        question: "Quelle est la durée minimale de toux pour suspecter une tuberculose ?",
        options: ["1 semaine", "2-3 semaines", "1 mois", "6 semaines"],
        correct: 1,
        explanation: "Une toux productive persistant 2-3 semaines ou plus doit faire suspecter une tuberculose."
    },
    {
        question: "Quel est le schéma thérapeutique standard pour un nouveau cas de TB pulmonaire ?",
        options: ["6HRZE", "2HRZE/4HR", "9HR", "2HRZ/4HR"],
        correct: 1,
        explanation: "Le schéma standard est 2HRZE (2 mois) suivi de 4HR (4 mois), soit 6 mois au total."
    },
    {
        question: "Quelle est la sensibilité du Gene Xpert MTB/RIF chez un patient BAAR+ ?",
        options: ["50%", "75%", ">95%", "100%"],
        correct: 2,
        explanation: "La sensibilité du Gene Xpert MTB/RIF est supérieure à 95% chez les patients BAAR+."
    },
    {
        question: "En cas de co-infection TB-VIH, quel traitement débuter en premier ?",
        options: ["Antirétroviraux", "Antituberculeux", "Les deux simultanément", "Dépend du taux de CD4"],
        correct: 1,
        explanation: "Il faut TOUJOURS débuter le traitement antituberculeux en premier, puis introduire les ARV selon le taux de CD4."
    },
    {
        question: "Quelle est la durée du traitement pour une tuberculose neuro-méningée ?",
        options: ["6 mois", "9 mois", "12 mois", "18 mois"],
        correct: 2,
        explanation: "La tuberculose neuro-méningée nécessite 12 mois de traitement : 2HRZE/10HR."
    },
    {
        question: "Quel pourcentage de TB ganglionnaire est dû à M. bovis en Tunisie ?",
        options: ["45%", "60%", "78,9%", "85%"],
        correct: 2,
        explanation: "Selon le guide PNLT 2025, M. bovis est responsable de 78,9% des cas de tuberculose ganglionnaire en Tunisie."
    }
];

export const PRESIDENTE = 'TRITAR Fatma';
export const COORDINATEUR = 'MANSOURI Abderraouf';
export const CONCEPTION_MISE_EN_PAGE = 'SOUISSI Zouhair';

export const COMITE_LECTURE: string[] = [
    "ABDALLAH Maya", "AIDLI Sihem", "AKROUT Feriel", "BEJI Majed", 
    "BEN KHEDER Ali", "BOUACHA Hind", "BOUSSETTA Khadija", "DAGHFOUS Hafaoua", 
    "DRIRA Ikram", "EL GHARBI Leila", "GHRAIRI Hédia", "HAMZAOUI Agnès", 
    "HAMMAMI Boutheina", "KAMOUN Samy", "KHEMIRI Monia", "KILANI Badreddine", 
    "LOUZIR Béchir", "MBAREK Chiraz", "MOOTEMRI Zied", "Rezaig CHEIKH", 
    "SAHTOUT Samia", "SAID Yosra", "SLIM Leila", "SOUISSI Zouhair", 
    "TIOUIRI Hanène", "TOUMI Adnene", "ZARROUK Mourad"
];

export const COMITE_REDACTION: string[] = [
    "ABDELMLEK Rim", "AISSA Sana", "AOUINTITI Imen", "AYADI Hajer", 
    "BEJI Imen", "BEN AMMAR Jihene", "BEN MANSOUR Amani", "BEN ZAZIA Rahma", 
    "BERRICHE Aida", "BEN SAAD Soumaya", "CHAHED Houda", "FOURATI Rachid", 
    "GARGOURI Rahma", "GHARIANI Asma", "HABOURIA Chaima", "HAMDI Besma", 
    "HAMOUDA Samia", "HAMZAOUI Saloua", "HANTOUS Saoussen", "JOOBER Sameh", 
    "HEMISSI Khaoula", "KASTALLI Sarra", "KHALSI Fatma", "KHAMESSI Madiha", 
    "KHEMEKHEM Rim", "KWASS Hamida", "LOUHAICHI Sabrine", "MAALEJ Sonia", 
    "MANSOURI Abderraouf", "Mehiri Emna", "MEJRI Islem", "MOUSSA Ines", 
    "NEJI Henda", "REJEIBI Salsabil", "ROMDHANE Nadia", "SMAOUI Selma", 
    "SNENE Houda", "TRITAR Fatma", "YENGUI Ferdaous", "ZAIBI Haifa", 
    "ZOGHLAMI Imen"
];

export const ABBREVIATIONS: { term: string; definition: string }[] = [
  { term: 'ALT', definition: 'Alanine-aminotransférase' },
  { term: 'AST', definition: 'Aspartate aminotransférase' },
  { term: 'BAAR', definition: 'Bacilles acido-alcoolo-résistants' },
  { term: 'BCG', definition: 'Bacille de Calmette et Guérin' },
  { term: 'CDC', definition: 'Centres de prévention et de contrôle des maladies' },
  { term: 'CQE', definition: 'Contrôle de qualité externe' },
  { term: 'DAT', definition: 'Dispensaire anti-tuberculeux' },
  { term: 'DOT', definition: 'Directly Observed Treatment' },
  { term: 'DPP', definition: 'Dérivé protéinique purifié' },
  { term: 'DST', definition: 'Drug sensitivity testing (antibiogramme)' },
  { term: 'IDR', definition: 'Intradermo-Réaction' },
  { term: 'INNTI', definition: 'Inhibiteurs non nucléosidiques de la transcriptase inverse' },
  { term: 'INTI', definition: 'Inhibiteurs nucléosidiques de la transcriptase inverse' },
  { term: 'IRIS', definition: 'Immune Reconstitution Inflammatory Syndrome (Syndrome inflammatoire de reconstitution immunitaire)' },
  { term: 'ITL', definition: 'Infection tuberculeuse latente' },
  { term: 'LAT', definition: 'Lutte antituberculeuse' },
  { term: 'MAMT', definition: 'Mycobactérie Autre que Mycobacterium Tuberculosis' },
  { term: 'NVP', definition: 'Névirapine' },
  { term: 'OMD', definition: 'Objectif du millénaire pour le développement' },
  { term: 'OMS', definition: 'Organisation mondiale de la Santé' },
  { term: 'ONUSIDA', definition: 'Programme commun des Nations Unies sur le VIH/sida' },
  { term: 'PCIME', definition: "Prise en charge intégrée des maladies de l'enfant" },
  { term: 'PNLT', definition: 'Programme national de lutte contre la tuberculose' },
  { term: 'PPC', definition: 'Pneumonie à Pneumocystis Jirovecii' },
  { term: 'PVVIH', definition: 'Personnes vivant avec le VIH/SIDA' },
  { term: 'SIDA', definition: 'Syndrome d’immunodéficience acquise' },
  { term: 'SITT', definition: 'Standards internationaux pour le traitement de la tuberculose' },
  { term: 'SL-LPA', definition: 'Second-Line Line Probe Assays' },
  { term: 'TAR', definition: 'Traitement antirétroviral Tuberculose' },
  { term: 'TBC', definition: 'Tuberculose' },
  { term: 'TB-MR', definition: 'Tuberculose multirésistante (en anglais MDR-TB)' },
  { term: 'TB-rH', definition: 'Tuberculose résistante à l’isoniazide (en anglaise Hr-TB)' },
  { term: 'TB-RR', definition: 'Tuberculose résistante à la rifampicine (en anglais RR-TB)' },
  { term: 'TB-UR', definition: 'Tuberculose ultrarésistante (en anglais XDR)' },
  { term: 'TBEP', definition: 'Tuberculose extra-pulmonaire' },
  { term: 'TBP', definition: 'Tuberculose pulmonaire' },
  { term: 'TCT', definition: 'Test cutané à la tuberculine' },
  { term: 'TOD', definition: 'Traitement sous observation directe (en anglais DOT)' },
  { term: 'TPI', definition: 'Traitement préventif à l’isoniazide' },
  { term: 'UICTMR', definition: 'Union Internationale Contre la Tuberculose et les Maladies Respiratoires' },
  { term: 'VIH', definition: 'Virus de l’immunodéficience humaine' }
];