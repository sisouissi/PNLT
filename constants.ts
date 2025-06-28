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
    },
    {
        question: "Devant une suspicion de tuberculose, quel signe radiologique sur un scanner thoracique (TDM) est très évocateur ?",
        options: ["Épanchement pleural unilatéral", "Opacités rondes multiples", "Aspect d'arbre en bourgeons", "Adénopathies calcifiées"],
        correct: 2,
        explanation: "L'aspect de 'micronodules centro-lobulaires réalisant l’aspect d'arbre en bourgeons' est un signe très spécifique de la tuberculose pulmonaire active sur un scanner."
    },
    {
        question: "Quel médicament est classiquement associé à un risque de neuropathie périphérique, nécessitant une supplémentation en vitamine B6 ?",
        options: ["Rifampicine", "Isoniazide", "Pyrazinamide", "Éthambutol"],
        correct: 1,
        explanation: "L'Isoniazide (H) peut provoquer une neuropathie périphérique, surtout chez les patients à risque (dénutrition, diabète, VIH). La vitamine B6 (pyridoxine) est donnée en prévention."
    },
    {
        question: "Quelle est la définition d'un 'échec thérapeutique' selon les critères de l'OMS/PNLT ?",
        options: ["Patient dont les symptômes persistent après 2 mois", "Patient avec un frottis positif après 5 mois de traitement", "Patient qui interrompt son traitement pendant 1 mois", "Patient qui ne prend pas de poids"],
        correct: 1,
        explanation: "L'échec thérapeutique est défini par un patient présentant des frottis d'expectoration positifs après 5 mois ou plus de traitement correctement suivi."
    },
    {
        question: "Pour un patient co-infecté TB-VIH avec un taux de CD4 à 35/mm³, quel est le délai optimal pour commencer le traitement antirétroviral (TAR) ?",
        options: ["Immédiatement avec le traitement anti-TB", "Dans les 2 semaines après le début du traitement anti-TB", "Après 2 mois de traitement anti-TB", "Après la fin du traitement anti-TB"],
        correct: 1,
        explanation: "Pour les patients avec une immunodépression sévère (CD4 < 50/ml), il est recommandé de commencer le TAR dans les 2 semaines suivant l'initiation du traitement anti-tuberculeux pour réduire la mortalité."
    },
    {
        question: "Quel est le traitement préventif de choix pour une infection tuberculeuse latente (ITL) chez un adulte sans contre-indications ?",
        options: ["6 mois d'Isoniazide (6H)", "3 mois d'Isoniazide et Rifampicine (3HR)", "9 mois de Rifampicine (9R)", "1 mois de quadrithérapie"],
        correct: 1,
        explanation: "Le schéma de 3 mois associant Isoniazide et Rifampicine (3HR) est l'un des schémas privilégiés car il est plus court et aussi efficace que des schémas plus longs."
    },
    {
        question: "Qu'est-ce qu'un résultat 'traces' sur un test GeneXpert Ultra ?",
        options: ["Une erreur du test", "Un résultat positif avec une très faible charge bactérienne", "Une contamination de l'échantillon", "Un signe de résistance"],
        correct: 1,
        explanation: "Un résultat 'traces' indique une très faible charge d'ADN de M. tuberculosis. Il doit être interprété avec prudence et souvent confirmé par la culture, surtout si le contexte clinique n'est pas fortement évocateur."
    },
    {
        question: "Lequel de ces médicaments n'est PAS dans le Groupe A pour le traitement de la TB-MR (selon les nouvelles recommandations) ?",
        options: ["Bédaquiline", "Linézolide", "Moxifloxacine", "Cyclosérine"],
        correct: 3,
        explanation: "Le Groupe A, qui constitue le noyau du traitement de la TB-MR, comprend la Bédaquiline, le Prétomanide, le Linézolide et une Fluoroquinolone (Lévofloxacine/Moxifloxacine). La Cyclosérine est dans le groupe B."
    },
    {
        question: "Chez un enfant de 4 ans, contact d'un patient avec une tuberculose pulmonaire active et examen normal, quelle est la conduite à tenir ?",
        options: ["Simple surveillance pendant 3 mois", "Faire un test IGRA", "Commencer une chimioprophylaxie systématique", "Vacciner avec le BCG immédiatement"],
        correct: 2,
        explanation: "Chez les enfants de moins de 5 ans, en raison du risque élevé de progression vers une maladie grave, une chimioprophylaxie (traitement préventif) est systématiquement recommandée après avoir écarté une maladie active."
    },
    {
        question: "Quelle est la principale limitation des tests IDR et IGRA ?",
        options: ["Ils sont souvent douloureux", "Ils manquent de spécificité", "Ils ne peuvent pas distinguer une infection latente d'une maladie active", "Leur résultat prend plusieurs semaines"],
        correct: 2,
        explanation: "L'IDR et les IGRA détectent une réponse immunitaire à M. tuberculosis mais ne peuvent pas faire la différence entre une infection ancienne (latente) et une maladie en cours (active)."
    },
    {
        question: "Dans le nouveau schéma court de 4 mois pour la tuberculose non sévère de l'enfant, quelle est la composition de la phase intensive ?",
        options: ["2 mois de HRZ", "2 mois de HRZE", "4 mois de HR", "2 mois de HR"],
        correct: 0,
        explanation: "Le schéma court pour la TB non sévère de l'enfant est 2HRZ(E)/2HR. La phase intensive est de 2 mois avec Isoniazide, Rifampicine et Pyrazinamide (HRZ). L'Éthambutol (E) est ajouté en cas de doute ou de forme plus sévère."
    },
    {
        question: "Quelle adaptation de traitement est nécessaire chez un patient sous hémodialyse ?",
        options: ["Arrêter tous les médicaments", "Diminuer la dose de Rifampicine", "Administrer Éthambutol et Pyrazinamide après la dialyse", "Aucune adaptation n'est nécessaire"],
        correct: 2,
        explanation: "L'Éthambutol et le Pyrazinamide sont éliminés par le rein. Chez un patient dialysé, ils doivent être administrés après la séance de dialyse (souvent 1 jour sur 2 ou 3 fois par semaine)."
    },
    {
        question: "Quelle est la définition d'une tuberculose pré-ultrarésistante (Pré-XDR) ?",
        options: ["Résistance à la Rifampicine et à une fluoroquinolone", "Résistance à l'Isoniazide et à une fluoroquinolone", "TB-MR avec résistance additionnelle à une fluoroquinolone", "TB-MR avec résistance à un médicament injectable"],
        correct: 2,
        explanation: "La définition d'une Pré-XDR est une Tuberculose Multirésistante (TB-MR) qui présente en plus une résistance à n'importe quelle fluoroquinolone."
    },
    {
        question: "Quelle est l'indication principale de la corticothérapie dans la tuberculose ?",
        options: ["Pour accélérer la négativation des frottis", "Pour réduire l'inflammation dans les formes graves (méningite, péricardite)", "Pour tous les cas de tuberculose de l'enfant", "Pour éviter les nausées"],
        correct: 1,
        explanation: "Les corticoïdes sont utilisés pour leur puissant effet anti-inflammatoire dans les formes graves où l'inflammation met en jeu le pronostic vital ou fonctionnel, comme la méningite ou la péricardite constrictive."
    },
    {
        question: "Quel est le 'gold standard' pour confirmer le diagnostic de la tuberculose ?",
        options: ["La radiographie thoracique", "Le test GeneXpert MTB/RIF", "L'intradermo-réaction (IDR)", "La culture sur milieu spécifique"],
        correct: 3,
        explanation: "Bien que les tests moléculaires soient rapides et sensibles, la culture reste le 'gold standard' car elle permet de confirmer la viabilité du bacille et est indispensable pour réaliser un antibiogramme complet."
    },
    {
        question: "Un patient est traité pour une TB-VIH. Il commence son traitement antirétroviral et son état clinique s'aggrave paradoxalement avec de nouvelles adénopathies. De quoi s'agit-il le plus probablement ?",
        options: ["Un échec du traitement antituberculeux", "Une nouvelle infection opportuniste", "Un syndrome de reconstitution immunitaire (IRIS)", "Un effet secondaire des antirétroviraux"],
        correct: 2,
        explanation: "L'IRIS est une réaction inflammatoire qui survient après l'initiation du TAR, lorsque le système immunitaire 'se réveille' et réagit de manière exagérée aux antigènes de la tuberculose, causant une aggravation paradoxale des symptômes."
    },
    {
        question: "Quel est le schéma thérapeutique de référence pour une tuberculose ostéo-articulaire (Mal de Pott) ?",
        options: ["2HRZE / 4HR (6 mois)", "2HRZE / 7HR (9 mois)", "2HRZE / 10HR (12 mois)", "Traitement chirurgical seul"],
        correct: 1,
        explanation: "Les formes ostéo-articulaires sont considérées comme des formes graves nécessitant un traitement prolongé de 9 mois au total, avec 2 mois de quadrithérapie et 7 mois de bithérapie."
    },
    {
        question: "Quelle est la conduite à tenir si un frottis de contrôle est toujours positif à 2 mois de traitement bien conduit ?",
        options: ["Prolonger la phase intensive de 2 mois supplémentaires", "Arrêter le traitement et changer de médicaments", "Vérifier l'observance, s'assurer de l'absence de résistance (Xpert), et poursuivre la phase d'entretien", "Ajouter un cinquième médicament"],
        correct: 2,
        explanation: "Un frottis positif à 2 mois n'est pas synonyme d'échec. Il faut s'assurer de la bonne prise du traitement et de l'absence de résistance, puis passer à la phase d'entretien comme prévu. Il ne faut pas prolonger la phase intensive."
    },
    {
        question: "Lequel de ces médicaments est connu pour colorer les urines et autres fluides corporels en orange ?",
        options: ["Isoniazide", "Pyrazinamide", "Éthambutol", "Rifampicine"],
        correct: 3,
        explanation: "La Rifampicine est bien connue pour donner une coloration orangée aux larmes, à la sueur et aux urines. C'est un effet secondaire bénin mais qu'il est important de signaler au patient."
    },
    {
        question: "Quel est le nom du nouveau schéma thérapeutique de 4 mois recommandé pour les adultes avec une TB sensible non compliquée ?",
        options: ["Schéma de Genève", "Protocole SHINE", "2HPMZ/2HPM", "4HRZE"],
        correct: 2,
        explanation: "Le schéma 2HPMZ/2HPM, composé d'Isoniazide, Rifapentine, Moxifloxacine et Pyrazinamide, est une nouvelle option de traitement de 4 mois pour certains adultes."
    },
    {
        question: "Quelle est la forme la plus fréquente de tuberculose extra-pulmonaire en Tunisie ?",
        options: ["Pleurale", "Méningée", "Ganglionnaire", "Osseuse"],
        correct: 2,
        explanation: "La tuberculose ganglionnaire est la localisation extra-pulmonaire la plus fréquente en Tunisie, représentant environ 69% des cas de TBEP."
    },
    {
        question: "Quelle classe d'âge a l'incidence la plus élevée de TB en Tunisie ?",
        options: ["0-4 ans", "15-24 ans", "45-54 ans", ">65 ans"],
        correct: 2,
        explanation: "Pic d'incidence dans la tranche 45-54 ans selon les données épidémiologiques tunisiennes."
    },
    {
        question: "Quel est le délai de rendu moyen d'une culture de BK sur milieu solide ?",
        options: ["24-48 heures", "3-5 jours", "2-3 semaines", "6-8 semaines"],
        correct: 3,
        explanation: "Délai moyen de 4-8 semaines pour les milieux solides (Lowenstein-Jensen)."
    },
    {
        question: "Quelle complication justifie l'arrêt définitif de la Pyrazinamide ?",
        options: ["Hyperuricémie asymptomatique", "Arthralgies", "Hépatite fulminante", "Rash cutané"],
        correct: 2,
        explanation: "Une hépatite fulminante (INR > 1.5 sans autre cause) contre-indique définitivement la Pyrazinamide."
    },
    {
        question: "Quelle est la spécificité du Gene Xpert MTB/RIF ?",
        options: ["85-90%", "91-94%", "95-98%", ">99%"],
        correct: 3,
        explanation: "Spécificité >99% pour la détection de M. tuberculosis et de la résistance à la rifampicine."
    },
    {
        question: "Quelle est la principale cause de décès dans la TB méningée ?",
        options: ["Hydrocéphalie", "Vasculite cérébrale", "Œdème cérébral", "Hyponatrémie"],
        correct: 1,
        explanation: "La vasculite tuberculeuse entraîne des infarctus cérébraux irréversibles et constitue la principale cause de mortalité."
    },
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
    },

    // Nouvelles questions (25)
    {
        question: "Quelle est la période de contagiosité maximale en cas de TB pulmonaire ?",
        options: ["Avant le traitement", "Pendant les 2 premières semaines de traitement", "Entre 1 et 3 mois de traitement", "Après guérison"],
        correct: 1,
        explanation: "La contagiosité maximale se situe pendant les 2 premières semaines de traitement antituberculeux."
    },
    {
        question: "Quelle est la posologie quotidienne recommandée de Rifampicine chez l'adulte ?",
        options: ["5 mg/kg", "10 mg/kg", "15 mg/kg", "20 mg/kg"],
        correct: 1,
        explanation: "La posologie recommandée est de 10 mg/kg/jour (max 600 mg/j)."
    },
    {
        question: "Quelle complication est spécifiquement associée au traitement par Ethambutol ?",
        options: ["Neuropathie périphérique", "Névrite optique", "Hépatotoxicité", "Surdité"],
        correct: 1,
        explanation: "L'Ethambutol peut provoquer une névrite optique réversible nécessitant une surveillance ophtalmologique."
    },
    {
        question: "Quel examen est obligatoire avant d'instaurer un traitement par Streptomycine ?",
        options: ["Fonction hépatique", "Fonction rénale", "Acuité visuelle", "Audiogramme"],
        correct: 3,
        explanation: "Un audiogramme est requis avant traitement en raison du risque ototoxique de la streptomycine."
    },
    {
        question: "Quelle est la conduite à tenir devant un patient TB perdant 2% de son poids initial pendant le traitement ?",
        options: ["Arrêt immédiat du traitement", "Augmentation des doses", "Investigation pour échec thérapeutique", "Suivi normal sans modification"],
        correct: 2,
        explanation: "Une perte de poids ≥2% nécessite une investigation pour échec thérapeutique ou mauvaise observance."
    },
    {
        question: "Quelle est la durée minimale de traitement pour une ostéite tuberculeuse ?",
        options: ["6 mois", "9 mois", "12 mois", "18 mois"],
        correct: 1,
        explanation: "Le traitement standard pour une TB ostéo-articulaire est de 9 mois (2HRZE/7HR)."
    },
    {
        question: "Quelle classe thérapeutique est recommandée en cas de TB multirésistante ?",
        options: ["Fluoroquinolones", "Aminoglycosides", "Bêta-lactamines", "Macrolides"],
        correct: 0,
        explanation: "Les fluoroquinolones (lévofloxacine/moxifloxacine) sont des piliers du traitement des MDR-TB."
    },
    {
        question: "Quelle est la période requise pour déclarer un cas de TB comme guéri ?",
        options: ["2 mois après le début du traitement", "À la fin du traitement", "6 mois après la fin du traitement", "12 mois de suivi"],
        correct: 2,
        explanation: "La guérison est confirmée par l'absence de rechute 6 mois après la fin du traitement."
    },
    {
        question: "Quel est le délai maximal pour l'introduction des ARV chez un patient TB-VIH avec CD4 < 50/mm³ ?",
        options: ["2 semaines", "4 semaines", "8 semaines", "12 semaines"],
        correct: 0,
        explanation: "Introduction des ARV dans les 2 semaines suivant le début du traitement TB pour CD4 < 50/mm³."
    },
    {
        question: "Quelle est la première étape devant une suspicion d'hépatite médicamenteuse sous TB ?",
        options: ["Arrêt immédiat de tous les médicaments", "Diminution des doses de 50%", "Ajout d'hépatoprotecteurs", "Bilan hépatique complet"],
        correct: 3,
        explanation: "Première étape : bilan hépatique (transaminases, bilirubine) avant toute décision thérapeutique."
    },
    {
        question: "Quelle est la sensibilité de l'intradermoréaction à la tuberculine (IDR) chez les patients immunodéprimés ?",
        options: ["< 20%", "40-60%", "70-90%", "> 95%"],
        correct: 1,
        explanation: "La sensibilité de l'IDR chute à 40-60% chez les immunodéprimés en raison de l'anergie."
    },
    {
        question: "Quelle complication justifie l'arrêt définitif de la Pyrazinamide ?",
        options: ["Hyperuricémie asymptomatique", "Arthralgies", "Hépatite fulminante", "Rash cutané"],
        correct: 2,
        explanation: "Hépatite fulminante (INR > 1.5 sans autre cause) contre-indique définitivement la Pyrazinamide."
    },
    {
        question: "Quel est le traitement de première intention d'une tuberculose péricardique ?",
        options: ["6HR", "2SHRZ/4HR", "2HRZE/4HR", "2HRZE/7HR + prednisolone"],
        correct: 3,
        explanation: "Schéma : 2HRZE/7HR associé à la prednisolone (1-2 mg/kg/j) pendant 6-8 semaines."
    },
    {
        question: "Quelle est la principale mesure préventive chez les contacts d'un cas de TB pulmonaire ?",
        options: ["Isoniazide 6 mois", "Vaccination BCG", "Dépistage radiologique", "Chimioprohylaxie selon bilan"],
        correct: 3,
        explanation: "La chimioprohylaxie est décidée après évaluation du risque (âge, immunité, proximité)."
    },
    {
        question: "Quelle situation nécessite un allongement du traitement à 9 mois pour une TB pulmonaire ?",
        options: ["Cavités résiduelles", "Retard à la négativation", "Antécédent de TB", "Diabète associé"],
        correct: 1,
        explanation: "Un retard de négativation des crachats à 2 mois justifie une prolongation à 9 mois."
    },
    {
        question: "Quel est le mécanisme d'action de la Rifampicine ?",
        options: ["Inhibition de la synthèse protéique", "Inhibition de la synthèse d'ARN", "Altération de la membrane", "Antimétabolite"],
        correct: 1,
        explanation: "La Rifampicine inhibe l'ARN polymérase dépendante de l'ADN bactérien."
    },
    {
        question: "Quelle est la surveillance obligatoire pendant le traitement par Isoniazide ?",
        options: ["Fonction rénale mensuelle", "Acuité visuelle trimestrielle", "Bilan hépatique initial", "Dosage systématique des anticorps antinucléaires"],
        correct: 2,
        explanation: "Bilan hépatique initial et devant tout symptôme évocateur (pas de surveillance systématique)."
    },
    {
        question: "Quel est le critère microbiologique d'échec thérapeutique ?",
        options: ["Présence de BAAR à 1 mois", "Culture positive à 2 mois", "Résistance à un médicament", "Nouveau site infectieux"],
        correct: 1,
        explanation: "Culture positive à M2 malgré une bonne observance est un critère d'échec."
    },
    {
        question: "Quelle est la stratégie recommandée pour améliorer l'observance ?",
        options: ["Traitement totalement auto-administré", "DOT (Traitement directement observé)", "Doses hebdomadaires", "Traitement injectable mensuel"],
        correct: 1,
        explanation: "Le DOT (Directly Observed Therapy) est la stratégie de référence pour l'observance."
    },
    {
        question: "Quelle population doit recevoir systématiquement de la Pyridoxine avec l'Isoniazide ?",
        options: ["Enfants < 5 ans", "Femmes enceintes", "Patients diabétiques", "Patients alcooliques"],
        correct: 3,
        explanation: "La pyridoxine (vitamine B6) est systématique chez les alcooliques pour prévenir la neuropathie."
    },
    {
        question: "Quelle est la durée du traitement d'une tuberculose miliaire sans localisation méningée ?",
        options: ["6 mois", "9 mois", "12 mois", "18 mois"],
        correct: 0,
        explanation: "La TB miliaire sans méningite suit le schéma standard de 6 mois (2HRZE/4HR)."
    },
    {
        question: "Quel examen permet le diagnostic définitif de la tuberculose ?",
        options: ["Radiographie pulmonaire", "IDR à la tuberculine", "PCR positive", "Culture positive"],
        correct: 3,
        explanation: "La culture reste le gold standard (permet identification et antibiogramme)."
    },
    {
        question: "Quel effet indésirable est commun à l'Isoniazide et à la Rifampicine ?",
        options: ["Ototoxicité", "Neuropathie périphérique", "Hépatotoxicité", "Troubles visuels"],
        correct: 2,
        explanation: "Hépatotoxicité cumulée pour ces deux médicaments (surveillance clinique indispensable)."
    },
    {
        question: "Quelle est la conduite devant une TB ganglionnaire avec fluctuation ?",
        options: ["Ponction évacuatrice", "Exérèse chirurgicale", "Drainage externe", "Antibiothérapie seule"],
        correct: 0,
        explanation: "La ponction évacuatrice est recommandée pour prévenir la fistulisation."
    },
    {
        question: "Quelle est la spécificité du Gene Xpert MTB/RIF ?",
        options: ["85-90%", "91-94%", "95-98%", ">99%"],
        correct: 3,
        explanation: "Spécificité >99% pour M. tuberculosis et détection de la rifampicine-résistance."
    },
    {
        question: "Quelle est la principale cause de décès dans la TB méningée ?",
        options: ["Hydrocéphalie", "Vasculite cérébrale", "Œdème cérébral", "Hyponatrémie"],
        correct: 1,
        explanation: "La vascularite tuberculeuse entraîne des infarctus cérébraux irréversibles."
    },
    {
        question: "Quelle classe d'âge a l'incidence la plus élevée de TB en Tunisie ?",
        options: ["0-4 ans", "15-24 ans", "45-54 ans", ">65 ans"],
        correct: 2,
        explanation: "Pic d'incidence dans la tranche 45-54 ans selon les données épidémiologiques tunisiennes."
    },
    {
        question: "Quel est le délai de rendu moyen d'une culture de BK sur milieu solide ?",
        options: ["24-48 heures", "3-5 jours", "2-3 semaines", "6-8 semaines"],
        correct: 3,
        explanation: "Délai moyen de 4-8 semaines pour les milieux solides (Lowenstein-Jensen)."
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

const normalizeText = (text: string) => 
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const SEARCH_INDEX = NAV_ITEMS.map(navItem => {
    let content = navItem.label;
    // This is a simplified search index. In a real app, you'd fetch this content.
    switch(navItem.id) {
        case SectionId.Epidemiologie:
            content += " incidence tunisie monde chiffres statistiques risque bovis personnel sante carceral vih zoonotique";
            break;
        case SectionId.Diagnostic:
            content += " signes toux fievre hemoptysie radiographie tdm scanner xpert culture baar pcr ganglionnaire pleuresie meningite osteo-articulaire pott adenopathie algorithme bourgeons traces";
            break;
        case SectionId.Traitement:
            content += " schema hrz hrze phase intensive entretien posologie medicaments corticotherapie grossesse allaitement insuffisance renale hepatopathie";
            break;
        case SectionId.Calculateur:
            content += " dose poids adulte enfant hrz hrze";
            break;
        case SectionId.Suivi:
            content += " calendrier controle guerison echec resultat frottis";
            break;
        case SectionId.CasParticuliers:
            content += " enfant adolescent vih grossesse cd4 tar iris interactions medicamenteuses";
            break;
        case SectionId.Resistance:
            content += " mdr xdr pre-xdr rr rh rifampicine isoniazide schema long court bpalm bdellfxC";
            break;
        case SectionId.Latente:
            content += " itl infection idr igra quantiferon traitement preventif 3hr 6h contact risque";
            break;
        case SectionId.Quiz:
            content += " test questions evaluation connaissances";
            break;
        case SectionId.References:
            content += " contacts checklist pnlt";
            break;
    }
    return {
        id: navItem.id,
        label: navItem.label,
        content: normalizeText(content)
    };
});
