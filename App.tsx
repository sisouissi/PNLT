
import React, { useState, useEffect, useRef } from 'react';
import { SectionId, NavItem, QuizQuestion } from './types';
import { NAV_ITEMS, QUIZ_DATA, PRESIDENTE, COORDINATEUR, CONCEPTION_MISE_EN_PAGE, COMITE_LECTURE, COMITE_REDACTION, ABBREVIATIONS } from './constants';
import { Card, Alert, Icon, CardTitle, StatCard, SymptomCard, FlowStep, ThemedList, TreatmentTable } from './components/common';

// --- Reusable Animated Section Wrapper ---
const SectionWrapper: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={`transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {children}
        </div>
    );
};

// --- Helper & Layout Components ---

const HamburgerIcon: React.FC = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
);

const Header: React.FC<{ activeSectionLabel: string; onMenuClick: () => void }> = ({ activeSectionLabel, onMenuClick }) => (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md p-4 shadow-sm flex items-center md:hidden">
        <button onClick={onMenuClick} className="p-2 mr-4 rounded-md text-gray-700 hover:bg-gray-200 transition-colors">
            <HamburgerIcon />
        </button>
        <h1 className="text-xl font-bold text-[#2c3e50]">{activeSectionLabel}</h1>
    </div>
);

const Navigation: React.FC<{ 
    activeSection: SectionId; 
    onSelectSection: (sectionId: SectionId) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onOpenCommittees: () => void;
    onOpenAbbreviations: () => void;
}> = ({ activeSection, onSelectSection, isOpen, setIsOpen, onOpenCommittees, onOpenAbbreviations }) => {
    
    const handleSelect = (sectionId: SectionId) => {
        onSelectSection(sectionId);
        setIsOpen(false); // Close sidebar on selection
    };

    const sidebarContent = (
        <div className="flex flex-col h-full">
            <header className="bg-gradient-to-br from-[#c41e3a] to-[#8b1538] p-5 text-center shadow-lg">
                <h1 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                    <span className="text-2xl">🫁</span>
                    <span>TB Guide 🇹🇳</span>
                </h1>
                <p className="text-white/80 text-xs mt-1">Guide de prise en charge de la tuberculose en Tunisie Edition 2025</p>
            </header>
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleSelect(item.id)}
                        className={`flex items-center gap-3 w-full text-left p-3 rounded-md transition-colors duration-200 ${
                            activeSection === item.id 
                            ? 'bg-red-700/90 text-white font-semibold' 
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <span className="text-xl w-6 text-center">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-white/10 space-y-2">
                <button
                    onClick={onOpenCommittees}
                    className="flex items-center justify-center gap-3 w-full text-center p-3 rounded-md transition-colors duration-200 text-white/70 bg-white/5 hover:bg-white/10"
                >
                    <span className="text-xl w-6 text-center">👥</span>
                    <span>Comités du Guide</span>
                </button>
                <button
                    onClick={onOpenAbbreviations}
                    className="flex items-center justify-center gap-3 w-full text-center p-3 rounded-md transition-colors duration-200 text-white/70 bg-white/5 hover:bg-white/10"
                >
                    <span className="text-xl w-6 text-center">📖</span>
                    <span>Abréviations</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Sidebar (off-canvas) */}
            <div className={`fixed inset-y-0 left-0 z-50 transform md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className="w-64 h-full bg-[#2c3e50] shadow-2xl">
                    {sidebarContent}
                </div>
            </div>
            {isOpen && <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsOpen(false)}></div>}

            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-[#2c3e50] h-screen shadow-lg flex-shrink-0">
                {sidebarContent}
            </aside>
        </>
    );
};


const FloatingButton: React.FC<{ scrollableRef: React.RefObject<HTMLElement> }> = ({ scrollableRef }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (scrollableRef.current && scrollableRef.current.scrollTop > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        scrollableRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const scrollableElement = scrollableRef.current;
        if (scrollableElement) {
            scrollableElement.addEventListener('scroll', toggleVisibility);
            return () => scrollableElement.removeEventListener('scroll', toggleVisibility);
        }
    }, [scrollableRef]);

    return (
        <button
            onClick={scrollToTop}
            title="Retour en haut"
            className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-full text-2xl shadow-lg transition-all duration-300 z-[1000] hover:-translate-y-1 hover:shadow-xl ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
        >
            ↑
        </button>
    );
};

const CommitteesModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative modal-animate"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-4xl transition-colors"
                    aria-label="Fermer"
                >
                    &times;
                </button>

                <h2 className="text-3xl font-bold text-center text-[#8b1538] mb-6">Comités du Guide</h2>
                
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold text-[#2c3e50] border-b-2 border-red-200 pb-2 mb-4">Présidence et Coordination</h3>
                        <p><strong>Présidente du Comité National de Lutte contre la Tuberculose:</strong> {PRESIDENTE}</p>
                        <p><strong>Coordinateur du Programme National de Lutte contre la Tuberculose:</strong> {COORDINATEUR}</p>
                         <p><strong>Conception, Mise en page du guide et Développent de l'Application d'Aide au Diagnostic :</strong> {CONCEPTION_MISE_EN_PAGE}</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-[#2c3e50] border-b-2 border-red-200 pb-2 mb-4">Comité de Rédaction</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                            {COMITE_REDACTION.map(name => <li key={name}>{name}</li>)}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-semibold text-[#2c3e50] border-b-2 border-red-200 pb-2 mb-4">Comité de Lecture</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                            {COMITE_LECTURE.map(name => <li key={name}>{name}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AbbreviationsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative modal-animate"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-4xl transition-colors"
                    aria-label="Fermer"
                >
                    &times;
                </button>

                <h2 className="text-3xl font-bold text-center text-[#2c3e50] mb-6">Abréviations et Acronymes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    {ABBREVIATIONS.sort((a, b) => a.term.localeCompare(b.term)).map(({ term, definition }) => (
                        <div key={term} className="border-b pb-2">
                            <strong className="font-bold text-red-700">{term}:</strong> {definition}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const AdenopathyAlgorithmModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative modal-animate"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-4xl transition-colors"
                    aria-label="Fermer"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold text-center text-[#2c3e50] mb-6">Stratégie Diagnostique (Adénopathie)</h2>
                <div className="space-y-4 text-gray-700">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800">1. Suspicion d'Adénopathie Chronique</h3>
                        <p>Face à une adénopathie d'origine inconnue, la première étape est la cytoponction ganglionnaire échoguidée.</p>
                    </div>
                    <div className="flex justify-center my-2"><span className="text-2xl text-blue-500">↓</span></div>
                    <div className="p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><h3 className="font-bold text-gray-800">2a. Étude Cytologique</h3><p>Analyse de la morphologie cellulaire.</p></div>
                        <div><h3 className="font-bold text-gray-800">2b. Étude Bactériologique</h3><p>ED + PCR (Gene Xpert) + Culture.</p></div>
                    </div>
                    <div className="flex justify-center my-2"><span className="text-2xl text-blue-500">↓</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <h3 className="font-bold text-green-800">Cas Positif (Examen Bactériologique)</h3>
                            <p>Si le résultat est positif (Type II de Das), le diagnostic de tuberculose est confirmé.</p>
                            <div className="mt-2 p-2 bg-green-200 text-green-900 rounded-md text-center font-bold">➡️ TRAITEMENT ANTITUBERCULEUX</div>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                             <h3 className="font-bold text-yellow-800">Cas Négatif / Douteux</h3>
                             <p>Si l'examen bactériologique est négatif et/ou la cytologie non concluante (Type I ou III de Das).</p>
                             <div className="mt-2 p-2 bg-yellow-200 text-yellow-900 rounded-md text-center font-bold">➡️ Adénectomie ou Biopsies</div>
                        </div>
                    </div>
                    <div className="flex justify-center my-2"><span className="text-2xl text-blue-500">↓</span></div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-blue-800">3. Analyse de la Pièce Chirurgicale</h3>
                        <p className="font-semibold">Observer la surface d'incision (Caséum ?)</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div><h4 className="font-bold">Examen Histologique</h4><p>Recherche de granulome avec nécrose caséeuse.</p></div>
                            <div><h4 className="font-bold">Examen Bactériologique</h4><p>ED + PCR (Gene Xpert) + Culture.</p></div>
                        </div>
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-lg text-center">
                            <p>Si <strong>Lymphadénite tuberculeuse</strong> confirmée et/ou <strong>examen bactériologique positif</strong> :</p>
                            <div className="mt-2 p-2 bg-green-200 text-green-900 rounded-md text-center font-bold">➡️ TRAITEMENT ANTITUBERCULEUX</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Algorithm1Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative modal-animate" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-4xl transition-colors" aria-label="Fermer">&times;</button>
                <h2 className="text-2xl font-bold text-center text-[#2c3e50] mb-6">Algorithme N°1 : Enfant Suspect de Tuberculose</h2>
                <div className="space-y-3">
                    <div className="p-3 bg-blue-100 rounded-lg text-center font-bold">Anomalies cliniques ou radiologiques évocatrices</div>
                    <div className="text-center text-2xl text-blue-500">↓</div>
                    <div className="p-3 bg-gray-100 rounded-lg text-center">Recherche d’un contage + Examen physique + Radiographie + IDR</div>
                    <div className="text-center text-2xl text-blue-500">↓</div>
                     <div className="p-3 bg-gray-100 rounded-lg text-center">Examens bactériologiques</div>
                     <div className="text-center text-2xl text-blue-500">↓</div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-green-100 rounded-lg text-center"><strong>Positifs</strong><br/>➡️ Tuberculose Traitement</div>
                        <div className="p-3 bg-yellow-100 rounded-lg text-center"><strong>Négatifs (dont PCR)</strong><br/>➡️ Répéter la radio après traitement antibiotique</div>
                     </div>
                     <div className="text-center text-2xl text-blue-500">↓ (Si persistance des anomalies RX)</div>
                     <div className="p-3 bg-gray-100 rounded-lg text-center">Évaluer le risque d’exposition / Envisager TDM thoracique</div>
                     <div className="text-center text-2xl text-blue-500">↓</div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-orange-100 rounded-lg"><strong>Risque important</strong> (Contaminateur proche ou IDR+) et Anomalies suggestives ➡️ Demander un avis spécialisé</div>
                        <div className="p-3 bg-indigo-100 rounded-lg"><strong>Risque faible</strong> (Pas de contaminateur et IDR-) et Anomalies non suggestives ➡️ Envisager un autre diagnostic</div>
                     </div>
                </div>
            </div>
        </div>
    );
};

const Algorithm2Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative modal-animate" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-4xl transition-colors" aria-label="Fermer">&times;</button>
                <h2 className="text-2xl font-bold text-center text-[#2c3e50] mb-6">Algorithme N°2 : Enfant Contact d’un Cas Index</h2>
                <div className="space-y-3">
                    <div className="p-3 bg-blue-100 rounded-lg text-center font-bold">Enfant contact d'un cas index</div>
                    <div className="text-center text-2xl text-blue-500">↓</div>
                    <div className="p-3 bg-gray-100 rounded-lg text-center">Interrogatoire, Examen physique, Radiographie thoracique, IDR</div>
                    <div className="text-center text-2xl text-blue-500">↓</div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-red-100 rounded-lg"><strong>Anomalies cliniques/radiologiques</strong><br/>➡️ Suspicion de maladie<br/>➡️ Voir Algorithme 1</div>
                        <div className="p-3 bg-green-100 rounded-lg"><strong>Examen normal</strong><br/>➡️ Poursuivre selon l'âge</div>
                    </div>
                     <div className="text-center text-2xl text-blue-500">↓ (Si examen normal)</div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-teal-100 rounded-lg text-center"><strong>Âge inférieur à 5 ans</strong><br/>➡️ Chimioprophylaxie</div>
                        <div className="p-3 bg-purple-100 rounded-lg text-center"><strong>Âge supérieur ou égal à 5 ans</strong><br/>➡️ Résultat de l'IDR</div>
                     </div>
                      <div className="text-center text-2xl text-blue-500">↓ (Si âge ≥ 5 ans)</div>
                       <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-teal-100 rounded-lg text-center"><strong>IDR supérieur ou égal à 10 mm</strong><br/>➡️ Chimioprophylaxie</div>
                        <div className="p-3 bg-gray-200 rounded-lg text-center"><strong>IDR inférieur à 10 mm</strong><br/>➡️ Contrôle dans 3 mois</div>
                     </div>
                </div>
                 <p className="text-xs text-gray-600 mt-4">* Un test IGRA peut remplacer l’IDR. ** Une IDR supérieur à 15 mm ou phlycténulaire peut témoigner d'une tuberculose évolutive. *** Le contrôle à 3 mois comprend : une évaluation clinique, une radiographie thoracique et une IDR.</p>
            </div>
        </div>
    );
};

const Algorithm3Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/70 z-[1001] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative modal-animate" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-4xl transition-colors" aria-label="Fermer">&times;</button>
                <h2 className="text-2xl font-bold text-center text-[#2c3e50] mb-6">Algorithme N°3 : Diagnostic de l'ITL (Groupes à Risque)</h2>
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold text-lg text-blue-800">1. Patient appartenant à un groupe à risque :</h3>
                        <p>Lui demander s'il présente des symptômes de tuberculose*.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                            <h4 className="font-bold text-yellow-800">Cas A : Le patient est symptomatique</h4>
                            <p className="mt-2">➡️ Procéder à la recherche d'une tuberculose active ou d'autres pathologies.***</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <h4 className="font-bold text-green-800">Cas B : Le patient est asymptomatique</h4>
                            <p className="mt-2">➡️ Réaliser un test IDR ou IGRA.</p>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-bold text-lg text-gray-800">2. Si le patient est asymptomatique (Cas B) :</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-2">
                            <li>
                                <strong>Si IDR/IGRA est positif :</strong>
                                <ul className="list-['▹'] pl-5 mt-1 space-y-1">
                                    <li>Faire une radiographie thoracique.</li>
                                    <li>Si la radio montre une <strong>anomalie</strong>, rechercher une TB active (revenir au Cas A).</li>
                                    <li>Si la radio est <strong>normale</strong>, poser le diagnostic d'ITL et discuter un traitement préventif.</li>
                                </ul>
                            </li>
                            <li><strong>Si IDR/IGRA est négatif** :</strong> Le risque est faible. Mettre en place une surveillance et informer le patient.</li>
                        </ul>
                    </div>
                </div>
                 <div className="text-xs text-gray-600 mt-6 border-t pt-4">
                    <p><strong>* Symptômes évocateurs :</strong> toux, hémoptysie, fièvre, sueurs nocturnes, perte de poids, etc.</p>
                    <p><strong>** Surveillance :</strong> Contrôle à 3 mois. Informer le patient de consulter rapidement si des symptômes apparaissent.</p>
                    <p><strong>*** Envisager de traiter l’ITL</strong> si les examens ont permis d’exclure une tuberculose maladie.</p>
                </div>
            </div>
        </div>
    );
};


// --- Dosage Calculator Component ---
const DosageCalculator: React.FC = () => {
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState<'adult' | 'child'>('adult');
    const [form, setForm] = useState<'hrze' | 'hr' | 'separate'>('hrze');
    const [result, setResult] = useState<React.ReactNode | null>(null);

    const calculateDosage = () => {
        const w = parseFloat(weight);
        if (!w || w <= 0) {
            alert('Veuillez entrer un poids valide');
            return;
        }

        let res: React.ReactNode = null;

        if (form === 'hrze') {
            if (age === 'adult') {
                let tablets;
                if (w >= 20 && w <= 24) tablets = '1.5';
                else if (w >= 25 && w <= 39) tablets = '2';
                else if (w >= 40 && w <= 55) tablets = '3';
                else if (w >= 56 && w <= 70) tablets = '4';
                else if (w > 70) tablets = '4';
                else tablets = 'Consulter pédiatre';
                res = <p><strong>HRZE Adulte (75mg+150mg+400mg+275mg):</strong> {tablets} comprimé(s) par jour</p>;
            } else {
                if (w < 4) {
                     res = <>
                        <p><strong>HRZ Enfant (50mg+75mg+150mg):</strong> Posologie calculée en fonction du poids</p>
                        <p><strong>Éthambutol:</strong> {Math.round(w * 20)} mg/jour (si indiqué)</p>
                    </>;
                } else {
                    let tablets;
                    if (w >= 4 && w <= 7) tablets = '1';
                    else if (w >= 8 && w <= 11) tablets = '2';
                    else if (w >= 12 && w <= 15) tablets = '3';
                    else if (w >= 16 && w <= 24) tablets = '4';
                    else tablets = 'Utiliser posologie adulte';
                    res = <>
                        <p><strong>HRZ Enfant (50mg+75mg+150mg):</strong> {tablets} comprimé(s) par jour</p>
                        <p><strong>Éthambutol:</strong> {Math.round(w * 20)} mg/jour (si indiqué)</p>
                    </>;
                }
            }
        } else if (form === 'hr') {
            if (age === 'adult') {
                let tablets;
                 if (w >= 20 && w <= 24) tablets = '1.5';
                else if (w >= 25 && w <= 39) tablets = '2';
                else if (w >= 40 && w <= 55) tablets = '3';
                else if (w >= 56 && w <= 70) tablets = '4';
                else if (w > 70) tablets = '4';
                else tablets = 'Consulter pédiatre';
                res = <p><strong>HR Adulte (75mg+150mg):</strong> {tablets} comprimé(s) par jour</p>;
            } else {
                if (w < 4) {
                    res = <p><strong>HR Enfant (50mg+75mg):</strong> Posologie calculée en fonction du poids</p>;
                } else {
                    let tablets;
                    if (w >= 4 && w <= 7) tablets = '1';
                    else if (w >= 8 && w <= 11) tablets = '2';
                    else if (w >= 12 && w <= 15) tablets = '3';
                    else if (w >= 16 && w <= 24) tablets = '4';
                    else tablets = 'Utiliser posologie adulte';
                    res = <p><strong>HR Enfant (50mg+75mg):</strong> {tablets} comprimé(s) par jour</p>;
                }
            }
        } else {
            const isoniazideDose = age === 'adult' ? Math.min(Math.round(w * 5), 300) : Math.min(Math.round(w * 10), 300);
            const rifampicineDose = age === 'adult' ? Math.min(Math.round(w * 10), 600) : Math.min(Math.round(w * 15), 600);
            const pyrazinamideDose = age === 'adult' ? Math.round(w * 30) : Math.round(w * 35);
            const ethambutolDose = Math.round(w * 20);
            res = <>
                <p><strong>Isoniazide:</strong> {isoniazideDose} mg/jour</p>
                <p><strong>Rifampicine:</strong> {rifampicineDose} mg/jour</p>
                <p><strong>Pyrazinamide:</strong> {pyrazinamideDose} mg/jour</p>
                <p><strong>Éthambutol:</strong> {ethambutolDose} mg/jour</p>
            </>;
        }
        setResult(res);
    };

    const InputGroup: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
        <div className="mb-5">
            <label className="block mb-2 font-bold text-[#2c3e50] text-lg">{label}</label>
            {children}
        </div>
    );
    const inputStyles = "w-full p-4 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 bg-white focus:border-green-500 focus:shadow-lg focus:shadow-green-500/10 focus:outline-none focus:-translate-y-0.5";

    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-4 border-green-500 rounded-3xl p-8 mt-6 relative">
             <div className="absolute top-5 right-7 text-5xl opacity-20">💊</div>
            <InputGroup label="Poids du patient (kg):">
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} min="1" max="150" placeholder="Ex: 70" className={inputStyles} />
            </InputGroup>
            <InputGroup label="Âge du patient:">
                <select value={age} onChange={(e) => setAge(e.target.value as 'adult' | 'child')} className={inputStyles}>
                    <option value="adult">Adulte (≥18 ans)</option>
                    <option value="child">Enfant (inférieur ou égal à 18 ans)</option>
                </select>
            </InputGroup>
            <InputGroup label="Forme combinée:">
                <select value={form} onChange={(e) => setForm(e.target.value as any)} className={inputStyles}>
                    <option value="hrze">HRZE (Phase intensive)</option>
                    <option value="hr">HR (Phase continuation)</option>
                    <option value="separate">Formes séparées</option>
                </select>
            </InputGroup>
            <button onClick={calculateDosage} className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-none py-4 px-8 rounded-full cursor-pointer text-lg font-bold transition-all duration-300 uppercase tracking-wider hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/40">
                Calculer les Doses
            </button>
            {result && (
                <div className="mt-6 p-5 bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-500 rounded-2xl">
                    <h4 className="text-xl font-bold mb-2 text-green-800">💊 Résultats du calcul :</h4>
                    <div className="space-y-1 text-green-900">{result}</div>
                    <Alert variant="warning" className="mt-4"><strong>Important :</strong> Prendre à jeun, 30 minutes avant le repas. Associer vitamine B6 (pyridoxine) 25-50 mg/jour.</Alert>
                </div>
            )}
        </div>
    );
};

// --- Quiz Component ---
const Quiz: React.FC = () => {
    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const startQuiz = () => {
        setIsStarted(true);
        setIsFinished(false);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
    };

    const handleSelectAnswer = (index: number) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(index);
        if (index === QUIZ_DATA[currentQuestionIndex].correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < QUIZ_DATA.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                setIsFinished(true);
            }
        }, 3000);
    };
    
    const question = QUIZ_DATA[currentQuestionIndex];

    return (
         <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-3xl p-8 mt-6 relative">
            <div className="absolute top-5 right-7 text-5xl opacity-20">🧠</div>
            <CardTitle icon="🧠">Quiz de Formation</CardTitle>
            {!isStarted ? (
                <button onClick={startQuiz} className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full font-bold text-lg hover:-translate-y-1 transition-transform">Commencer le Quiz</button>
            ) : isFinished ? (
                 <>
                    <Alert variant={score / QUIZ_DATA.length >= 0.8 ? 'success' : score / QUIZ_DATA.length >= 0.6 ? 'warning' : 'danger'}>
                        <h4 className="font-bold text-xl">Résultat Final</h4>
                        <p><strong>Score : {score}/{QUIZ_DATA.length} ({Math.round((score / QUIZ_DATA.length) * 100)}%)</strong></p>
                        <p>{score / QUIZ_DATA.length >= 0.8 ? '🎉 Excellent ! Vous maîtrisez bien la prise en charge.' : score / QUIZ_DATA.length >= 0.6 ? '👍 Bien ! Quelques révisions recommandées.' : '📚 Il est recommandé de revoir le guide.'}</p>
                    </Alert>
                    <button onClick={startQuiz} className="mt-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-3 px-8 rounded-full font-bold text-lg hover:-translate-y-1 transition-transform">Recommencer le Quiz</button>
                </>
            ) : (
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h4 className="font-bold text-[#2c3e50] mb-4 text-lg">Question {currentQuestionIndex + 1}/{QUIZ_DATA.length}</h4>
                    <p className="font-semibold mb-5">{question.question}</p>
                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            const isCorrect = index === question.correct;
                            const isSelected = selectedAnswer === index;
                            let optionClass = 'bg-gradient-to-br from-white to-gray-100 border-gray-300 hover:border-blue-500 hover:bg-blue-100/50';
                            if (selectedAnswer !== null) {
                                if(isCorrect) optionClass = 'bg-gradient-to-br from-green-200 to-green-300 border-green-500 text-green-800 font-bold';
                                else if(isSelected) optionClass = 'bg-gradient-to-br from-red-200 to-red-300 border-red-500 text-red-800';
                            }
                            return (
                                <div key={index} onClick={() => handleSelectAnswer(index)} className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${optionClass}`}>
                                    {option}
                                </div>
                            );
                        })}
                    </div>
                    {selectedAnswer !== null && (
                        <Alert variant="info" className="mt-5">
                            <strong className="font-bold">Explication :</strong> {question.explanation}
                        </Alert>
                    )}
                </div>
            )}
        </div>
    );
};


// --- SECTION COMPONENTS ---

const EpidemiologieSection: React.FC = () => (
    <SectionWrapper>
        <Card>
            <CardTitle icon="🌍">Situation Épidémiologique de la Tuberculose en Tunisie</CardTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 my-6">
                <StatCard number="26,3" label="Incidence /100 000 hab" />
                <StatCard number="9,6" label="TB Pulmonaire /100 000" />
                <StatCard number="16,7" label="TB Extra-pulmonaire /100 000" />
                <StatCard number="78,9%" label="TB ganglionnaire à M. bovis" />
            </div>
            <Alert variant="info">
                <strong><Icon>ℹ️</Icon>Points Clés :</strong>
                <ThemedList items={['La Tunisie est un pays à endémicité intermédiaire', 'Stabilité de l\'incidence ces dernières années', 'Impact du COVID-19 : diminution temporaire en 2020-2021', 'Retour aux chiffres habituels en 2022-2023', 'Prédominance des formes ganglionnaires (66,7% des TBEP)']} />
            </Alert>
        </Card>
        <Card>
            <CardTitle icon="🎯">Groupes à Risque</CardTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <SymptomCard title="🏥 Personnel de Santé" items={['Risque 2-3x supérieur', 'Exposition professionnelle', 'Surveillance renforcée', 'Formation continue']} />
                <SymptomCard title="🔒 Milieu Carcéral" items={['Prévalence : 28,6/100 000', 'Risque 5-50x supérieur', 'Conditions de confinement', 'Dépistage systématique']} />
                <SymptomCard title="🦠 Co-infection TB-VIH" items={['11 cas en 2023', '3,5% parmi les nouveaux cas', 'Risque accru de formes graves', 'Prise en charge spécialisée']} />
            </div>
        </Card>
        <Card>
            <CardTitle icon="🐄">Tuberculose Zoonotique (M. bovis)</CardTitle>
            <Alert variant="warning"><strong>⚠️ Attention :</strong> M. bovis est responsable de 78,9% des cas de tuberculose ganglionnaire en Tunisie</Alert>
            <p className="font-bold my-3">Prévention :</p>
            <ThemedList items={['Éviter la consommation de produits laitiers non pasteurisés', 'Contrôle vétérinaire du cheptel', 'Pasteurisation systématique du lait', 'Formation des professionnels exposés']} />
        </Card>
    </SectionWrapper>
);

const DiagnosticSection: React.FC<{ onOpenAdenopathyModal: () => void }> = ({ onOpenAdenopathyModal }) => (
    <SectionWrapper>
        <Card>
            <CardTitle icon="🔍">Signes d'Appel & Démarche Initiale</CardTitle>
            <Alert variant="warning">
                <strong>⚠️ Attention :</strong> Toute toux productive supérieure à 2-3 semaines, une hémoptysie, des sueurs nocturnes, une fièvre prolongée ou une perte de poids doivent faire suspecter une tuberculose.
            </Alert>
            <div className="mt-6">
                <h4 className="font-bold text-lg text-slate-700 mb-2">Recommandations pour la collecte des expectorations</h4>
                <ThemedList items={[
                    "Se rincer la bouche avec de l'eau pour éliminer les aliments.",
                    "Inhaler profondément 2–3 fois et expirer fort.",
                    "Tousser profondément pour produire l'expectoration.",
                    "Collecter l'échantillon dans un récipient stérile, en évitant la contamination extérieure.",
                    "Effectuer la collecte le matin à jeun, idéalement."
                ]}/>
            </div>
        </Card>
        
        <Card>
            <CardTitle icon="📸">Imagerie : Radiographie et TDM Thoracique</CardTitle>
            <p>La radiographie du thorax est l'examen de première intention. Elle a une sensibilité de 94% et une spécificité de 89%. Les signes évocateurs sont les micronodules, les nodules excavés et les condensations, particulièrement dans les lobes supérieurs.</p>
            <Alert variant="info" className="mt-4">
                <strong>Quand demander un scanner thoracique ?</strong>
                <ul className="list-disc pl-5 mt-2 text-sm">
                    <li>En cas de discordance radio-clinique (signes cliniques évocateurs mais radio normale).</li>
                    <li>En cas de suspicion de tuberculose pauci-bacillaire (examen direct négatif).</li>
                    <li>Signes évocateurs sur TDM : micronodules centro-lobulaires ("arbre en bourgeons"), nodules acinaires en "rosette", condensations excavées.</li>
                </ul>
                <p className="text-xs mt-2">L'OMS a aussi introduit l'aide au diagnostic par logiciel (CAD) pour le dépistage de masse.</p>
            </Alert>
        </Card>

        <Card>
            <CardTitle icon="🧪">Tests Diagnostiques : Prélèvements et Analyses</CardTitle>
            <h4 className="font-bold text-lg text-slate-700 mb-2">Autres méthodes de collecte</h4>
            <ThemedList items={[
                "Expectoration induite (aérosol salé hypertonique).",
                "Aspiration gastrique (surtout chez l'enfant).",
                "Lavage broncho-alvéolaire (LBA) et aspiration sous fibroscopie."
            ]}/>
            <h4 className="font-bold text-lg text-slate-700 mt-4 mb-2">Tests Moléculaires et Culture</h4>
             <p>Le <strong>Gene Xpert MTB/RIF</strong> est un test de première intention. Sa version <strong>Ultra</strong> est plus sensible. Un résultat "Détection de l’ADN à l’état de traces" doit être interprété avec prudence et confirmé par la culture, surtout si le contexte n'est pas celui d'une TB extra-pulmonaire.</p>
             <p className='mt-2'>La <strong>culture</strong> (sur milieu liquide MGIT ou solide Lowenstein-Jensen) reste le <strong>gold standard</strong> pour la confirmation diagnostique, surtout pour les formes paucibacillaires, et est indispensable pour l'antibiogramme.</p>
        </Card>

        <Card>
            <CardTitle icon="📊">Interprétation des Résultats Bactériologiques</CardTitle>
            <div className="overflow-x-auto">
                 <TreatmentTable
                    headers={['Test', 'Résultat', 'Interprétation et Conduite à Tenir']}
                    rows={[
                        ['Microscopie', <strong>Positif</strong>, 'Tuberculose très probable. MAMT non exclu.'],
                        ['Microscopie', <strong>Négatif</strong>, 'TB active possible, surtout si Xpert+ ou Culture+.'],
                        ['Xpert MTB/RIF', <strong>MTB non détecté</strong>, 'Réaliser un 2ème test si forte suspicion, envisager une culture.'],
                        ['Xpert MTB/RIF', <strong>MTB détecté, RIF non détectée</strong>, 'TB sensible à la RIF -> Traiter. Réaliser une culture pour tester les autres antituberculeux.'],
                        ['Xpert MTB/RIF', <strong>MTB détecté, RIF détectée</strong>, 'Évaluer le risque de résistance. Si risque élevé, traiter comme TB-MDR. Si faible, refaire un test. Culture et antibiogramme systématiques.'],
                        ['Xpert MTB/RIF', <strong>MTB détecté "trace"</strong>, 'Considérer comme positif si TB extra-pulmonaire. Confirmer par culture (milieu liquide).'],
                        ['Culture', <strong>Positive à M.tuberculosis</strong>, 'TB confirmée. Lancer antibiogramme.'],
                        ['Culture', <strong>Positive à MAMT</strong>, 'Mycobactériose non tuberculeuse. Confirmer l\'infection.'],
                        ['Culture', <strong>Négative</strong>, 'Pas de TB si Xpert négatif. Si Xpert positif, considérer comme un faux négatif (patient traité?).']
                    ]}
                 />
            </div>
        </Card>

        <Card>
            <CardTitle icon="🌐">Diagnostic de la Tuberculose Extra-Pulmonaire (TBEP)</CardTitle>
            <p>La TBEP touche des organes autres que les poumons. Le diagnostic est souvent difficile car les formes sont pauci-bacillaires. L'histologie (granulome épithélioïde avec nécrose caséeuse) est cruciale.</p>
            
            <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Tuberculose Ganglionnaire (69% des TBEP en Tunisie)</h4>
            <Alert variant="info">
                <ul className="list-disc pl-5 mt-2 text-sm">
                    <li><strong>Clinique :</strong> Tuméfaction cervicale d'apparition lente, souvent peu ou pas douloureuse. Peut fistuliser à la peau.</li>
                    <li><strong>Suspicion de M. bovis si :</strong> Consommation de lait non pasteurisé, exposition professionnelle (éleveurs, vétérinaires).</li>
                    <li><strong>Diagnostic :</strong> L'échographie est le premier examen. La confirmation se fait par cytoponction (FNA) ou biopsie exérèse pour examen cytologique, bactériologique (Xpert, culture) et histologique.</li>
                </ul>
            </Alert>

            <h4 className='font-bold text-lg text-slate-700 mt-6 mb-2'>Autres Formes Fréquentes</h4>
            <div className='space-y-4 text-sm'>
                <div className='p-3 bg-gray-50 rounded-lg'>
                    <p><strong>Pleurésie Tuberculeuse :</strong> Liquide pleural jaune citrin, lymphocytaire, exsudatif. La recherche de BK est souvent négative. Le diagnostic est confirmé par la biopsie pleurale (étude histologique et bactériologique).</p>
                </div>
                <div className='p-3 bg-gray-50 rounded-lg'>
                    <p><strong>Tuberculose Ostéo-articulaire (Mal de Pott) :</strong> L'IRM est l'examen de référence pour l'atteinte rachidienne. La confirmation se fait par biopsie disco-vertébrale pour analyse histologique et bactériologique.</p>
                </div>
                <div className='p-3 bg-gray-50 rounded-lg'>
                    <p><strong>Méningite Tuberculeuse :</strong> Urgence diagnostique. LCR clair, hypertendu, lymphocytaire avec hypoglycorachie. L'OMS recommande fortement le test Xpert sur le LCR.</p>
                </div>
            </div>

            <div className="mt-6 text-center">
                <button 
                    onClick={onOpenAdenopathyModal}
                    className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-2 px-6 rounded-full font-bold text-base hover:-translate-y-0.5 transition-transform shadow-md hover:shadow-lg"
                >
                    Voir l'Algorithme (Adénopathie)
                </button>
            </div>
        </Card>
    </SectionWrapper>
);

const TraitementSection: React.FC = () => (
    <SectionWrapper>
        <Card>
            <CardTitle icon="📋">Bilan Préthérapeutique</CardTitle>
            <p className="mb-4">Un bilan préthérapeutique doit être réalisé avant toute prescription pour rechercher des tares et adapter le traitement.</p>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-bold text-lg text-slate-700">Interrogatoire et Examen Clinique</h4>
                    <ThemedList items={[
                        "Recherche de tares : diabète, troubles psychiatriques, hépatopathie.",
                        "Prise de médicaments : AVK, oestroprogestatifs, antiépileptiques.",
                        "Mesure du poids et de la taille.",
                        "Recherche d'autres localisations : ictère, troubles neurologiques, adénopathies."
                    ]} />
                </div>
                <div>
                    <h4 className="font-bold text-lg text-slate-700">Bilan Biologique</h4>
                     <ThemedList items={[
                        "NFS, glycémie, bilan hépatique (transaminases, PAL, bilirubine), bilan rénal (urée, créatinine), uricémie.",
                        "Sérologies : Hépatite B, C et VIH.",
                        "Test d’acétylation (si possible).",
                        "Examen ophtalmologique (champ visuel et vision des couleurs)."
                    ]} />
                </div>
            </div>
        </Card>

        <Card>
            <CardTitle icon="🎯">Principes Fondamentaux du Traitement</CardTitle>
            <ThemedList items={[
                <strong>Traitement sous Observation Directe (TOD) :</strong>,
                "Essentiel pour garantir l'observance, surtout en phase intensive. Il réduit le risque de résistance et d'échec.",
                <strong>Vitamine B6 (Pyridoxine) :</strong>,
                "Association systématique pour prévenir la neuropathie périphérique induite par l'Isoniazide.",
                <strong>Formes Combinées (ADF) :</strong>,
                "À privilégier pour limiter les erreurs de prescription et améliorer l'observance en réduisant le nombre de comprimés."
            ]} />
        </Card>

        <Card>
            <CardTitle icon="💊">Schémas Thérapeutiques</CardTitle>
            <Alert variant="info"><strong>Principe :</strong> Le traitement standard comprend une phase intensive (quadrithérapie) pour réduire rapidement la charge bactérienne, suivie d'une phase d'entretien (bithérapie) pour stériliser les lésions.</Alert>
            
            <h4 className='font-bold text-xl text-slate-800 mt-6 mb-2'>Schémas Standards (6 à 12 mois)</h4>
            <TreatmentTable
                headers={['Forme de TB', 'Phase Intensive', 'Phase d\'Entretien', 'Durée Totale']}
                rows={[
                    [<strong>TB Pulmonaire</strong>, '2HRZE', '4HR', '6 mois'],
                    [<><strong>TB Extra-pulmonaire</strong><br/>(pleurale, ganglionnaire)</>, '2HRZE', '4HR', '6 mois'],
                    [<strong>TB Ostéo-articulaire</strong>, '2HRZE', '7HR', '9 mois'],
                    [<strong>TB Neuro-méningée</strong>, '2HRZE', '10HR', '12 mois*']
                ]}
            />
            <p className="text-xs text-gray-600 mt-2">* Associer la pyridoxine (vitamine B6).</p>

            <h4 className='font-bold text-xl text-slate-800 mt-8 mb-2'>Nouveaux Schémas Courts (4 mois)</h4>
             <div className="grid md:grid-cols-2 gap-6 mt-4">
                <Alert variant='success'>
                    <h5 className="font-bold">Schéma 4 mois Adulte : 2HPMZ/2HPM</h5>
                    <p className="text-sm mt-2">Pour patients d'âge supérieur ou égal à 12 ans, et de poids supérieur à 40 kg, avec TB sensible. Inclus les PVVIH (CD4 supérieur à 100) et diabétiques. Composition: Isoniazide, Rifapentine, Moxifloxacine, Pyrazinamide.</p>
                </Alert>
                <Alert variant='success'>
                    <h5 className="font-bold">Schéma 4 mois Enfant : 2HRZ(E)/2HR</h5>
                    <p className="text-sm mt-2">Pour enfants et adolescents (3 mois à 16 ans) avec TB pulmonaire NON SÉVÈRE (absence de caverne, miliaire, etc.).</p>
                </Alert>
            </div>
        </Card>
        
        <Card>
            <CardTitle icon="🔧">Adaptations Thérapeutiques et Cas Particuliers</CardTitle>
             <div className='space-y-4'>
                 <div>
                    <h4 className="font-semibold text-lg text-slate-700">Grossesse et Allaitement</h4>
                     <p>Le schéma <strong>2HRZE/4HR</strong> est sûr. Ajouter de la Vitamine K au nouveau-né à la naissance (risque hémorragique avec Rifampicine). L'allaitement n'est pas contre-indiqué. La Rifampicine réduit l'efficacité de la contraception orale.</p>
                 </div>
                 <div className="border-t pt-4">
                    <h4 className="font-semibold text-lg text-slate-700">Insuffisance Rénale</h4>
                    <p>L'Isoniazide et la Rifampicine ne nécessitent pas d'ajustement. L'Éthambutol et le Pyrazinamide sont à ajuster :</p>
                     <ul className="list-disc pl-5 mt-2 text-sm">
                        <li><strong>Clairance inférieur à 50 ml/min :</strong> Éthambutol 15 mg/kg/jour.</li>
                        <li><strong>Clairance inférieur à 10 ml/min / Hémodialyse :</strong> HR tous les jours. E+Z 1 jour sur 2 (6h après dialyse).</li>
                     </ul>
                 </div>
                 <div className="border-t pt-4">
                     <h4 className="font-semibold text-lg text-slate-700">Hépatopathie Chronique</h4>
                     <p>Ne pas utiliser le Pyrazinamide. Le schéma recommandé est <strong>9HRE</strong>. La dose d'Isoniazide peut être ajustée selon le test d'acétylation.</p>
                 </div>
            </div>
        </Card>
        
        <Card>
            <CardTitle icon="✨">Corticothérapie</CardTitle>
            <p>Les corticoïdes sont indiqués dans les formes graves et/ou compliquées de la tuberculose pour leur effet anti-inflammatoire.</p>
            <h4 className='font-bold text-lg mt-4 mb-2 text-slate-700'>Indications principales :</h4>
            <ThemedList items={[
                "Méningite tuberculeuse",
                "Péricardite tuberculeuse (si risque de compression)",
                "Obstruction des voies respiratoires par des adénopathies",
                "Formes sévères ou disséminées (surtout chez l'enfant)",
                "Tuberculose des organes hématopoïétiques",
                "Tuberculose intestinale et des cavités excrétrices"
            ]} />
        </Card>

    </SectionWrapper>
);

const CalculateurSection: React.FC = () => (
    <SectionWrapper>
        <Card>
            <CardTitle icon="🧮">Calculateur de Doses</CardTitle>
            <DosageCalculator />
        </Card>
        <Card>
            <CardTitle icon="📋">Posologies de Référence</CardTitle>
            <TreatmentTable
                headers={['Médicament', 'Posologie Adulte', 'Posologie Enfant', 'Dose Maximale']}
                rows={[
                    [<strong>Isoniazide (H)</strong>, '3-5 mg/kg/j', '10 mg/kg/j', '300 mg/j'],
                    [<strong>Rifampicine (R)</strong>, '10 mg/kg/j', '15-20 mg/kg/j', '600 mg/j'],
                    [<strong>Pyrazinamide (Z)</strong>, '30 mg/kg/j', '35 mg/kg/j', '2500 mg/j'],
                    [<strong>Éthambutol (E)</strong>, '20 mg/kg/j', '20 mg/kg/j', '1600 mg/j']
                ]}
            />
        </Card>
    </SectionWrapper>
);

const SuiviSection: React.FC = () => (
     <SectionWrapper>
        <Card>
            <CardTitle icon="📅">Planification et Contrôle du Traitement</CardTitle>
            <p>Un suivi régulier est vital pour évaluer la contagiosité, l'évolution clinique, les effets indésirables et le résultat du traitement.</p>
            <TreatmentTable
                headers={['', 'Début', 'S2', 'M2', 'M5', 'M6', 'Fin du TTT']}
                rows={[
                    ['Clinique (Poids, T°)', '*', '*', '*', '*', '*', '*'],
                    ['Effets indésirables', '', '*', '*', '*', '*', ''],
                    ['Radiographie thorax', '*', '', '*', '', '*', '*'],
                    ['Microscopie frotti', '*', '', '*', '*', '*', '*'],
                    ['Biologie', '*', '', '', '', '', '']
                ]}
                className="text-center"
            />
             <p className="text-xs text-gray-600 mt-2">* Examens non systématiques, réalisés sur terrain particulier ou en cas de signes d'appel.</p>
        </Card>

        <Card>
            <CardTitle icon="🔬">Suivi de la TB Pulmonaire à Microscopie Positive</CardTitle>
            <p>L'efficacité du traitement est évaluée par les contrôles bactériologiques aux 2ème, 5ème et 6ème mois.</p>
            <Alert variant="warning" className='mt-4'>
                <strong>Frotti positif à 2 mois ?</strong> Cela peut être dû à des bacilles morts ou une résolution lente.
                <br/>
                <strong>Conduite :</strong> Si l'observance thérapeutique est confirmée et en l'absence de résistance (Xpert), poursuivre la phase de continuation. Ne pas prolonger la phase intensive.
            </Alert>
             <p className="font-bold my-3">Raisons possibles d'une mauvaise réponse au traitement :</p>
             <ThemedList items={[
                'Phase initiale mal supervisée ou mauvaise observance.',
                'Sous-dosage en antituberculeux.',
                'Traitements et comorbidités qui interfèrent (diabète, cancer).',
                'Tuberculose pharmaco-résistante non détectée.',
                'Mauvaise absorption des médicaments (rare).'
             ]}/>
        </Card>

        <Card>
            <CardTitle icon="✅">Définitions des Résultats du Traitement (PNLT/OMS)</CardTitle>
             <TreatmentTable
                headers={['Résultat', 'Définition']}
                rows={[
                    [<strong>Guérison</strong>, 'Patient à frottis positif qui a des frottis négatifs au dernier mois de traitement et au moins une fois auparavant.'],
                    [<strong>Traitement achevé</strong>, 'Patient qui a achevé le traitement mais ne répond pas aux critères de guérison.'],
                    [<strong>Échec</strong>, 'Patient présentant des frottis positifs après 5 mois de traitement ou plus.'],
                    [<strong>Décès</strong>, 'Patient décédé en cours de traitement, quelle que soit la cause.'],
                    [<strong>Interruption</strong>, 'Patient dont le traitement a été interrompu pendant 2 mois consécutifs ou plus.'],
                    [<strong>Transfert</strong>, 'Patient transféré vers une autre unité, dont le résultat est inconnu.']
                ]}
             />
        </Card>
    </SectionWrapper>
);

const CasParticuliersSection: React.FC = () => (
    <SectionWrapper>
        {/* --- Tuberculose de l'Enfant --- */}
        <Card>
            <CardTitle icon="🧒">Tuberculose de l'Enfant : Démarche Diagnostique</CardTitle>
            <h4 className='font-bold text-lg text-slate-700 mb-2'>Signes d'Appel et Facteurs de Risque</h4>
            <ThemedList items={[
                "Contact avec un patient contagieux (bacillifère ou culture+).",
                "Fièvre prolongée (supérieur à 15 jours).",
                "Toux persistante sans amélioration (supérieur à 21 jours).",
                "Altération de l'état général avec cassure de la courbe de croissance.",
                "Adénopathies périphériques non douloureuses.",
                "Facteurs de risque : enfant < 5 ans, déficit immunitaire, malnutrition."
            ]} />
            <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Approche Diagnostique (Formes Extra-pulmonaires)</h4>
            <TreatmentTable
                headers={['Site', 'Approche Diagnostique Recommandée']}
                rows={[
                    ['Ganglions périphériques', 'Aspiration à l’aiguille ou biopsie, (PCR)'],
                    ['Miliaire (disséminée)', 'Ponction lombaire : PL (PCR)'],
                    ['Méningite', 'Tomodensitométrie cérébrale (ou IRM) + PL (PCR)'],
                    ['Pleurésie', 'Ponction pleurale, culture, biopsie (PCR)'],
                    ['Abdominale', 'Echographie et ponction d’ascite + (PCR)'],
                    ['Ostéoarticulaire', 'Radio, échographie, scintigraphie + ponction ou biopsie, (PCR)']
                ]}
            />
        </Card>

        <Card>
            <CardTitle icon="💊">Tuberculose de l'Enfant : Traitement</CardTitle>
            <Alert variant="info">
                <strong>Principes :</strong> Traitement de 6 mois pour les formes communes. Les formes sévères nécessitent des schémas prolongés. Les formulations pédiatriques (HRZ) sont privilégiées.
            </Alert>
            <TreatmentTable
                headers={['Type de Tuberculose', 'Schéma Thérapeutique']}
                rows={[
                    ['Pulmonaire non compliquée / Adénopathies périphériques', <strong>2HRZ / 4HR</strong>],
                    ['Pulmonaire étendue ou cavitaire', <strong>2HRZ+E / 4HR</strong>],
                    ['Méningée / Ostéoarticulaire / Disséminée', <strong>2HRZE / 10HR</strong>]
                ]}
            />
             <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Dépistage de l'Enfant Contact</h4>
             <ThemedList items={[
                "Examen clinique, radiographie du thorax et IDR sont nécessaires.",
                "Enfant < 5 ans : Traitement préventif (3HR) systématique.",
                "Enfant ≥ 5 ans : Si IDR < 10mm, surveillance. Si IDR ≥ 10mm, traitement préventif (3HR)."
             ]}/>
        </Card>

        {/* --- Tuberculose et VIH --- */}
        <Card>
            <CardTitle icon="🔬">Tuberculose et Infection VIH</CardTitle>
            <Alert variant="danger">
                <strong>Principes Fondamentaux :</strong>
                <ThemedList items={[
                    'Le traitement antituberculeux doit TOUJOURS être débuté en premier.',
                    'Le délai d\'initiation du traitement antirétroviral (TAR) dépend du taux de CD4.',
                    'Attention majeure aux interactions médicamenteuses et au syndrome de reconstitution immunitaire (IRIS).'
                ]} />
            </Alert>
            
            <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Introduction du Traitement Antirétroviral (TAR)</h4>
            <ThemedList items={[
                <><strong>Hors atteinte méningée :</strong> Si CD4 inférieur à 50/ml, délai de 2 semaines. Si CD4 supérieur à 50/ml, délai de 2 à 4 semaines.</>,
                <><strong>Tuberculose neuro-méningée :</strong> Délai de 4 à 8 semaines après le début du traitement anti-TB.</>
            ]}/>

            <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Choix de la Molécule Antirétrovirale (Interactions avec Rifampicine)</h4>
            <TreatmentTable
                headers={['Trithérapie Normale', 'Association due à la Rifampicine']}
                rows={[
                    ['Acriptega (TDF/Lamivudine/Dolutégravir)', 'Ajouter <strong>Dolutégravir 50 mg/jour</strong>'],
                    ['Avonza (TDF/Lamivudine/Efavirenz)', 'Ajouter <strong>Efavirenz 200 mg/jour</strong>'],
                    ['Darunavir/Ritonavir', 'Majorer le <strong>Ritonavir à 300 mg x 2/jour</strong>'],
                ]}
            />
             <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Syndrome de Reconstitution Immunitaire (IRIS)</h4>
             <p>L'IRIS est une complication inflammatoire après l'initiation du TAR, causant une aggravation paradoxale des symptômes de la TB. Le diagnostic repose sur des critères cliniques et radiologiques. La gestion ne nécessite généralement pas l'arrêt du TAR mais peut requérir une corticothérapie.</p>
        </Card>
    </SectionWrapper>
);

const ResistanceSection: React.FC = () => (
    <SectionWrapper>
        <Card>
            <CardTitle icon="🧬">Définitions Générales de la Résistance</CardTitle>
            <ThemedList items={[
                <span><strong>TB résistante à la rifampicine (TB-RR) :</strong> Toute résistance à la rifampicine.</span>,
                <span><strong>TB multirésistante (TB-MR/MDR) :</strong> Résistance à au moins l'isoniazide ET la rifampicine.</span>,
                <span><strong>TB Pré-ultrarésistante (Pré-XDR) :</strong> TB-MR/RR avec résistance additionnelle à n'importe quelle fluoroquinolone.</span>,
                <span><strong>TB Ultrarésistante (XDR) :</strong> Pré-XDR avec résistance additionnelle à au moins un autre médicament du groupe A (bédaquiline ou linézolide).</span>,
                 <span><strong>TB Résistante à l’isoniazide (TB-rH) :</strong> Résistance à l’isoniazide mais souche sensible à la rifampicine.</span>,
            ]} />
        </Card>
        
        <Card>
            <CardTitle icon="🧐">Cas Suspects et Groupes à Risque de TB-MR</CardTitle>
             <Alert variant="warning">
                <strong>Rechercher les facteurs de risque de TB-MR chez :</strong>
                <ThemedList items={[
                    "Les échecs de traitement, quel que soit le cas de figure.",
                    "Les rechutes et les interruptions de traitement, dont le frottis est positif 3 mois après la reprise.",
                    "Les contacts symptomatiques et/ou avec anomalies radiologiques d’un cas de TB-MR connu.",
                    "Les personnes séropositives au VIH.",
                    "Les personnes dont les frottis restent positifs après 3 mois d’un nouveau traitement.",
                    "Personnes exposées en environnements à haute prévalence de TB-MR (milieu carcéral, etc.)."
                ]} />
             </Alert>
            <p className='mt-4'><strong>Conduite :</strong> Tout cas suspect de TB-MR doit faire l’objet d’un test rapide (Xpert MTB/RIF), puis d’une culture et d’un antibiogramme, et être orienté vers un centre spécialisé.</p>
        </Card>

        <Card>
            <CardTitle icon="💊">Classe des Médicaments Antituberculeux (2ème ligne)</CardTitle>
             <TreatmentTable
                headers={['Groupe', 'Médicaments', 'Rôle']}
                rows={[
                    [<strong>Groupe A</strong>, 'Lévofloxacine/Moxifloxacine, Bédaquiline, Linézolide', 'Trois médicaments à inclure systématiquement.'],
                    [<strong>Groupe B</strong>, 'Clofazimine, Cyclosérine/Terizidone', 'Un ou deux médicaments à ajouter.'],
                    [<strong>Groupe C</strong>, 'Éthambutol, Delamanid, Pyrazinamide, Imipénem, Amikacine, etc.', 'À inclure pour compléter le schéma si les agents des groupes A et B ne peuvent pas être utilisés.'],
                ]}
            />
        </Card>

        <Card>
            <CardTitle icon="📋">Schémas Thérapeutiques de la TB-MR/RR</CardTitle>
             <Alert variant="info">
                <strong>Messages Clés :</strong>
                <ThemedList items={[
                   "Le schéma BPaLM/BPaL de 6 mois est le choix privilégié pour les patients > 14 ans.",
                   "Le BDLLfxC de 6 mois est une alternative pour les patients non éligibles au BPaLM (y compris enfants et femmes enceintes).",
                   "Des schémas modifiés de 9 mois et des schémas longs (18-20 mois) restent des options pour des cas spécifiques ou en cas d'échec."
                ]}/>
            </Alert>

            <h4 className='font-bold text-lg mt-6 mb-2 text-slate-700'>Schémas de 6 mois : BPaLM et BPaL</h4>
            <p>Composé de bédaquiline, prétomanide, linézolide (600 mg) et moxifloxacine. Peut être utilisé sans moxifloxacine (BPaL) en cas de résistance documentée aux fluoroquinolones. La durée est prolongée à 9 mois si les cultures sont positives à 4 mois.</p>
            
             <h4 className='font-bold text-lg mt-6 mb-2 text-slate-700'>Schémas de 9 mois</h4>
             <p>Principalement pour les patients ne pouvant recevoir les schémas de 6 mois. Composés de bédaquiline, fluoroquinolones, clofazimine, éthambutol, pyrazinamide, etc. selon divers protocoles (ex: 9BLMZ).</p>

            <h4 className='font-bold text-lg mt-6 mb-2 text-slate-700'>Schémas longs (≥ 18 mois)</h4>
            <p>Pour les échecs de régimes courts ou les cas de TB-UR. Individualisés, composés d'au moins 4 à 5 médicaments efficaces basés sur l'historique et l'antibiogramme.</p>
        </Card>
        
        <Card>
             <CardTitle icon="⚠️">Effets Indésirables et Cas Particuliers</CardTitle>
            <h4 className='font-bold text-lg mt-2 mb-2 text-slate-700'>Effets indésirables fréquents</h4>
            <ThemedList items={[
                "Cutanés (prurit, éruptions)",
                "Gastro-intestinaux (nausées, vomissements)",
                "Neurologiques (neuropathie, psychose toxique)",
                "Troubles de l'audition, néphrotoxicité (avec injectables)",
                "Allongement du QT (moxifloxacine, bédaquiline)",
                "Toxicité hématologique (linézolide)"
            ]}/>

            <h4 className='font-bold text-lg mt-6 mb-2 text-slate-700'>Cas particuliers</h4>
             <Alert variant="warning" className="mt-4">
                <ul className='space-y-3'>
                    <li><strong>Femme enceinte :</strong> Traitement justifié vu la gravité. Éviter les injectables et l'éthionamide. Les schémas oraux (Bédaquiline, Delamanid, etc.) peuvent être utilisés.</li>
                    <li><strong>Enfant :</strong> Prise en charge en milieu spécialisé. Les doses sont ajustées au poids.</li>
                    <li><strong>Personnes avec VIH :</strong> Schéma court oral possible. Attention aux interactions médicamenteuses (ex: ritonavir et bédaquiline).</li>
                </ul>
             </Alert>
        </Card>
    </SectionWrapper>
);

const LatentInfectionSection: React.FC<{ onOpenAlgorithm1: () => void; onOpenAlgorithm2: () => void; onOpenAlgorithm3: () => void; }> = ({ onOpenAlgorithm1, onOpenAlgorithm2, onOpenAlgorithm3 }) => (
    <SectionWrapper>
        <Card>
            <CardTitle icon="🤫">Infection Tuberculeuse Latente (ITL) : Définition et Généralités</CardTitle>
            <p>L'ITL est un état de réponse immunitaire persistante aux antigènes de M. tuberculosis sans signes cliniques de maladie active. Environ 10% des personnes atteintes d'ITL développeront une tuberculose active au cours de leur vie, la majorité dans les 5 premières années.</p>
            <Alert variant="info" className="mt-4">
                Le dépistage et le traitement systématiques de l'ITL dans les populations à risque sont un élément essentiel de lutte contre l’émergence de nouveaux cas de tuberculose.
            </Alert>
        </Card>
        <Card>
            <CardTitle icon="🔬">Diagnostic de l'ITL</CardTitle>
            <p>Le diagnostic repose sur des tests indirects qui mettent en évidence une réponse immunitaire à M. tuberculosis :</p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                    <h4 className="font-bold text-lg text-slate-700">Intradermo-réaction (IDR) à la tuberculine</h4>
                    <p>Mesure de l'induration 48-72h après injection. Positif si supérieur ou égal à 10 mm. Reste un test clé chez l'enfant.</p>
                </div>
                <div>
                    <h4 className="font-bold text-lg text-slate-700">Tests de détection d’interféron gamma (IGRA)</h4>
                    <p>Tests sanguins (ex: Quantiferon) plus spécifiques que l'IDR, non affectés par la vaccination BCG. Utiles pour les enquêtes d'entourage.</p>
                </div>
            </div>
             <Alert variant="warning" className="mt-6">
                <strong>Limites des tests :</strong> Aucun test ne peut différencier une infection latente d'une maladie active. Un test négatif n'exclut pas une ITL ou une tuberculose maladie.
            </Alert>
        </Card>
         <Card>
            <CardTitle icon="🎯">Groupes à Risque et Traitement Préventif</CardTitle>
            <p>Le dépistage de l'ITL doit cibler les populations à risque augmenté de progression vers une maladie active.</p>
            <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Groupes prioritaires :</h4>
            <ThemedList items={[
                "Personnes vivant avec le VIH.",
                "Enfants de moins de 5 ans contacts d’un cas de tuberculose.",
                "Patients avant l'initiation d'un traitement anti-TNF ou autre immunosuppresseur.",
                "Personnel soignant, détenus, migrants de pays à haute incidence."
            ]}/>
             <h4 className='font-bold text-lg text-slate-700 mt-4 mb-2'>Schémas thérapeutiques préventifs :</h4>
             <ThemedList items={[
                "Isoniazide pendant 6 mois (6H)",
                "Isoniazide et rifampicine pendant 3 mois (3HR) - Schéma privilégié",
                "Isoniazide seul pendant 6 mois (6H) en cas de contre-indication à la bithérapie"
             ]}/>
        </Card>
        <Card>
            <CardTitle icon="🧭">Algorithmes d'Aide à la Décision</CardTitle>
            <p>Visualisez les stratégies diagnostiques recommandées pour les situations cliniques fréquentes.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center flex-wrap">
                <button
                    onClick={onOpenAlgorithm1}
                    className="bg-gradient-to-br from-red-500 to-orange-500 text-white py-3 px-6 rounded-full font-bold hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
                >
                    Que faire devant un <strong>enfant suspect</strong> ?
                </button>
                 <button
                    onClick={onOpenAlgorithm2}
                    className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-full font-bold hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
                >
                    Que faire devant un <strong>enfant contact</strong> ?
                </button>
                 <button
                    onClick={onOpenAlgorithm3}
                    className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white py-3 px-6 rounded-full font-bold hover:-translate-y-0.5 transition-transform w-full sm:w-auto"
                >
                    Diagnostic de l'ITL chez les <strong>groupes à risque</strong> ?
                </button>
            </div>
        </Card>
    </SectionWrapper>
);

const QuizSection: React.FC = () => (
    <SectionWrapper>
        <Quiz />
    </SectionWrapper>
);

const ReferencesSection: React.FC = () => (
    <SectionWrapper>
        <Card borderColor='border-indigo-500'>
            <CardTitle icon="📚">Références Rapides</CardTitle>
            <ThemedList items={['PNLT Tunisie : Programme National de Lutte contre la Tuberculose', 'Notification obligatoire : Tous les cas diagnostiqués', 'Médicaments gratuits : Toutes structures publiques', 'TOD obligatoire : Tous les patients']} />
        </Card>
        <Card>
            <CardTitle icon="📞">Contacts Utiles</CardTitle>
            <TreatmentTable
                headers={['Structure', 'Rôle', 'Contact']}
                rows={[
                    [<strong>Comité National de lutte contre la tuberculose</strong>, 'Coordination générale', 'Direction des Soins de Santé de Base'],
                    [<strong>Service de Pneumologie Pavillon C - Hôpital A. Mami</strong>, 'Service de référence du traitement de la tuberculose résistante', 'Hôpital Abderrahmen Mami Ariana'],
                    [<strong>Service de Pneumologie</strong>, 'Service de référence du traitement de la tuberculose résistante', 'Hôpital Menzel Bourguiba'],
                    [<strong>Centre de soins de santé de base CSB local</strong>, 'Prise en charge ambulatoire de la tuberculose', 'Dans chaque région']
                ]}
            />
        </Card>
        <Card>
            <CardTitle icon="📋">Check-list Diagnostic</CardTitle>
            <Alert variant="info">
                <strong>✅ Liste de vérification :</strong>
                <ul className="list-none space-y-2 mt-2">
                    {[
                        "Anamnèse complète (contage, facteurs de risque)",
                        "Examen clinique complet",
                        "Radiographie thoracique",
                        "2 échantillons crachats (BAAR + Gene Xpert)",
                        "Culture systématique",
                        "Test VIH proposé",
                        "Notification au PNLT",
                        "Enquête d'entourage planifiée"
                    ].map((item, index) => (
                        <li key={index} className="flex items-baseline">
                            <span className="mr-3 text-lg">□</span>
                            <span className="flex-1">{item}</span>
                        </li>
                    ))}
                </ul>
            </Alert>
        </Card>
    </SectionWrapper>
);


// --- Main App Component ---
const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Epidemiologie);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCommitteesModalOpen, setIsCommitteesModalOpen] = useState(false);
    const [isAbbreviationsModalOpen, setIsAbbreviationsModalOpen] = useState(false);
    const [isAdenopathyModalOpen, setIsAdenopathyModalOpen] = useState(false);
    const [isAlgorithm1ModalOpen, setIsAlgorithm1ModalOpen] = useState(false);
    const [isAlgorithm2ModalOpen, setIsAlgorithm2ModalOpen] = useState(false);
    const [isAlgorithm3ModalOpen, setIsAlgorithm3ModalOpen] = useState(false);
    const mainScrollRef = useRef<HTMLDivElement>(null);

    const renderSection = () => {
        switch (activeSection) {
            case SectionId.Epidemiologie: return <EpidemiologieSection />;
            case SectionId.Diagnostic: return <DiagnosticSection onOpenAdenopathyModal={() => setIsAdenopathyModalOpen(true)} />;
            case SectionId.Traitement: return <TraitementSection />;
            case SectionId.Calculateur: return <CalculateurSection />;
            case SectionId.Suivi: return <SuiviSection />;
            case SectionId.CasParticuliers: return <CasParticuliersSection />;
            case SectionId.Resistance: return <ResistanceSection />;
            case SectionId.Latente: return <LatentInfectionSection onOpenAlgorithm1={() => setIsAlgorithm1ModalOpen(true)} onOpenAlgorithm2={() => setIsAlgorithm2ModalOpen(true)} onOpenAlgorithm3={() => setIsAlgorithm3ModalOpen(true)} />;
            case SectionId.Quiz: return <QuizSection />;
            case SectionId.References: return <ReferencesSection />;
            default: return <EpidemiologieSection />;
        }
    };
    
    useEffect(() => {
        const savedSection = sessionStorage.getItem('lastTbGuideSection');
        if (savedSection && Object.values(SectionId).includes(savedSection as SectionId)) {
            setActiveSection(savedSection as SectionId);
        }
    }, []);

    const handleSelectSection = (sectionId: SectionId) => {
        setActiveSection(sectionId);
        sessionStorage.setItem('lastTbGuideSection', sectionId);
        mainScrollRef.current?.scrollTo(0, 0);
    };

    const activeNavItem = NAV_ITEMS.find(item => item.id === activeSection);

    return (
        <div className="flex h-full">
            <Navigation 
                activeSection={activeSection} 
                onSelectSection={handleSelectSection}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                onOpenCommittees={() => setIsCommitteesModalOpen(true)}
                onOpenAbbreviations={() => setIsAbbreviationsModalOpen(true)}
            />

            <div className="flex-1 flex flex-col h-screen">
                 <Header 
                    activeSectionLabel={activeNavItem?.label || 'Guide Tuberculose'} 
                    onMenuClick={() => setIsSidebarOpen(true)}
                />
                
                <main ref={mainScrollRef} className="flex-1 p-4 md:p-10 overflow-y-auto bg-gray-50">
                    {renderSection()}
                </main>

                <footer className="p-4 text-center text-xs text-gray-500 bg-gray-100 border-t border-gray-200">
                    © 2025 Application d'Aide au Diagnostic et Traitement de la tuberculose pulmonaire, développée par Dr Zouhair Souissi.
                </footer>
            </div>
            
            <FloatingButton scrollableRef={mainScrollRef} />
            <CommitteesModal isOpen={isCommitteesModalOpen} onClose={() => setIsCommitteesModalOpen(false)} />
            <AbbreviationsModal isOpen={isAbbreviationsModalOpen} onClose={() => setIsAbbreviationsModalOpen(false)} />
            <AdenopathyAlgorithmModal isOpen={isAdenopathyModalOpen} onClose={() => setIsAdenopathyModalOpen(false)} />
            <Algorithm1Modal isOpen={isAlgorithm1ModalOpen} onClose={() => setIsAlgorithm1ModalOpen(false)} />
            <Algorithm2Modal isOpen={isAlgorithm2ModalOpen} onClose={() => setIsAlgorithm2ModalOpen(false)} />
            <Algorithm3Modal isOpen={isAlgorithm3ModalOpen} onClose={() => setIsAlgorithm3ModalOpen(false)} />
        </div>
    );
};

export default App;
