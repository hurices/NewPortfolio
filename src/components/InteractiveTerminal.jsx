import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { personalInfo, projects, experiences, skillsData } from '../data/portfolioData.js';

export default function InteractiveTerminal({ isOpen, onClose, onNavigateSection }) {
  const [history, setHistory] = useState([
    { type: 'system', text: 'Hurices Dev Environment v2.4.0 — Terminal Interactif' },
    { type: 'system', text: 'Tapez "help" pour voir la liste des commandes disponibles, ou "projects" pour les dépôts.' },
    { type: 'output', text: '' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCmdHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    const newEntries = [{ type: 'command', text: `$ ${trimmed}` }];

    switch (cmd) {
      case 'help':
        newEntries.push({
          type: 'output',
          text: `Commandes disponibles :
  help            - Affiche cette aide
  about           - Informations sur Hurices Razanadraibe
  projects        - Liste des dépôts GitHub et projets concrets
  skills          - Compétences techniques & stacks
  experience      - Parcours professionnel & réalisations
  contact         - Coordonnées de contact direct
  netcap          - Détails sur l'architecture NetCap (Z-Score)
  download cv     - Télécharger le CV en PDF
  clear           - Nettoyer l'affichage du terminal
  sudo hire       - Pourquoi devriez-vous recruter Hurices ?`
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `${personalInfo.name} (@${personalInfo.username})
Titre : ${personalInfo.title}
Localisation : ${personalInfo.location}
Bio : ${personalInfo.bio}`
        });
        if (onNavigateSection) onNavigateSection('about');
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          text: `Dépôts GitHub concrets (${projects.length} projets référencés) :
${projects.map((p, idx) => `  [0${idx + 1}] ${p.title} (${p.categoryLabel})\n      Tech: ${p.tech.join(', ')}\n      Repo: ${p.githubUrl}`).join('\n\n')}`
        });
        if (onNavigateSection) onNavigateSection('projects');
        break;

      case 'skills':
        newEntries.push({
          type: 'output',
          text: `Compétences clés :
• Frontend : ${skillsData.frontend.map(s => s.name).join(', ')}
• Backend  : ${skillsData.backend.map(s => s.name).join(', ')}
• Réseau   : ${skillsData.dataAndNetwork.map(s => s.name).join(', ')}
• Mobile   : ${skillsData.mobileAndTools.map(s => s.name).join(', ')}`
        });
        if (onNavigateSection) onNavigateSection('skills');
        break;

      case 'experience':
        newEntries.push({
          type: 'output',
          text: `Expérience professionnelle :
${experiences.map(e => `[${e.period}] ${e.role} @ ${e.company}\n   ${e.description}`).join('\n\n')}`
        });
        if (onNavigateSection) onNavigateSection('experience');
        break;

      case 'netcap':
        newEntries.push({
          type: 'output',
          text: `Projet NetCap (Portail Captif & Détection d'anomalies Z-Score) :
• Proxy TCP (Python) interceptant le trafic HTTP
• Analyse comportementale avec Pandas & NumPy (Z-Score > 2.5)
• Portail d'authentification Flask & API FastAPI
• Dashboard Tkinter de supervision en direct`
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `Coordonnées de Hurices Razanadraibe :
• Email     : ${personalInfo.email}
• Téléphone : ${personalInfo.phone}
• LinkedIn  : ${personalInfo.linkedinUrl}
• GitHub    : ${personalInfo.githubUrl}
• Ville     : ${personalInfo.location}`
        });
        if (onNavigateSection) onNavigateSection('contact');
        break;

      case 'download':
        if (arg === 'cv') {
          window.open(personalInfo.cvPath, '_blank');
          newEntries.push({ type: 'success', text: `Ouverture et téléchargement du CV (${personalInfo.cvPath})...` });
        } else {
          newEntries.push({ type: 'output', text: 'Usage : download cv' });
        }
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
        if (arg === 'hire') {
          newEntries.push({
            type: 'success',
            text: `[ACCÈS ROOT ACCORDÉ]
Hurices combine expertise réseau (Python/TCP), développement frontend moderne (React/Tailwind) et backend robuste (Node.js/FastAPI).
Prêt à rejoindre votre équipe avec rigueur et passion ! Contact : ${personalInfo.email}`
          });
        } else {
          newEntries.push({ type: 'output', text: 'Commande inconnue. Essayez "sudo hire".' });
        }
        break;

      default:
        newEntries.push({
          type: 'error',
          text: `hurices-sh: commande introuvable : ${trimmed}. Tapez "help" pour voir les commandes disponibles.`
        });
        break;
    }

    setHistory(prev => [...prev, ...newEntries]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div 
        className={`w-full flex flex-col rounded-2xl bg-[#0b0f17] border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm transition-all duration-300 ${
          isMaximized ? 'h-[94vh] max-w-6xl' : 'h-[620px] max-w-3xl'
        }`}
      >
        {/* En-tête de fenêtre macOS/Linux */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#070a0f] border-b border-slate-800 select-none">
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose} 
              className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity cursor-pointer"
              title="Fermer"
            />
            <button 
              onClick={() => setIsMaximized(!isMaximized)} 
              className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity cursor-pointer"
              title="Agrandir"
            />
            <button 
              onClick={() => setHistory([])} 
              className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity cursor-pointer"
              title="Effacer"
            />
            <span className="ml-3 text-xs text-slate-400 font-sans font-medium flex items-center gap-1.5">
              <TerminalIcon size={14} className="text-emerald-400" />
              hurices@station : ~/portfolio
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
              title={isMaximized ? "Réduire" : "Plein écran"}
            >
              {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Corps du terminal */}
        <div 
          className="flex-1 p-4 overflow-y-auto space-y-2.5 text-slate-200"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, i) => (
            <div key={i} className="leading-relaxed">
              {entry.type === 'system' && (
                <div className="text-slate-500">{entry.text}</div>
              )}
              {entry.type === 'command' && (
                <div className="text-emerald-400 font-semibold">{entry.text}</div>
              )}
              {entry.type === 'output' && (
                <pre className="text-slate-300 whitespace-pre-wrap font-mono">{entry.text}</pre>
              )}
              {entry.type === 'success' && (
                <pre className="text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/40 whitespace-pre-wrap font-mono">{entry.text}</pre>
              )}
              {entry.type === 'error' && (
                <div className="text-rose-400">{entry.text}</div>
              )}
            </div>
          ))}

          <form onSubmit={(e) => { e.preventDefault(); handleCommand(inputVal); }} className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-semibold select-none">hurices@dev:~$</span>
            <input 
              ref={inputRef}
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-600 caret-emerald-400"
              placeholder="Tapez une commande (ex: help, projects)..."
              autoComplete="off"
              spellCheck="false"
            />
            <button type="submit" className="text-slate-500 hover:text-emerald-400 cursor-pointer">
              <CornerDownLeft size={14} />
            </button>
          </form>

          <div ref={bottomRef} />
        </div>

        {/* Barre de raccourcis rapide en bas */}
        <div className="px-4 py-2 bg-[#070a0f] border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span>Raccourcis :</span>
            {['help', 'projects', 'skills', 'experience', 'sudo hire'].map(cmd => (
              <button 
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              >
                {cmd}
              </button>
            ))}
          </div>
          <span className="hidden sm:inline text-slate-500">ESC pour fermer</span>
        </div>
      </div>
    </div>
  );
}
