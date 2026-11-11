import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Terminal as TerminalIcon, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  Download, 
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { personalInfo, projects } from '../data/portfolioData.js';

export default function RetroArcadeTerminal({ onSelectProject, onOpenContact }) {
  const [activeTab, setActiveTab] = useState('arcade'); // 'arcade' | 'cli'
  
  // États du Mini-Jeu Arcade : "NetCap Cyber Defender"
  const [score, setScore] = useState(0);
  const [threatLevel, setThreatLevel] = useState('NORMAL');
  const [gameActive, setGameActive] = useState(false);
  const [packets, setPackets] = useState([
    { id: 1, ip: '192.168.1.104', type: 'HTTP_GET', zScore: 0.4, isThreat: false, status: 'pass' },
    { id: 2, ip: '10.0.4.88', type: 'SYN_FLOOD', zScore: 3.8, isThreat: true, status: 'pending' },
    { id: 3, ip: '192.168.1.55', type: 'API_AUTH', zScore: 0.8, isThreat: false, status: 'pass' }
  ]);
  const [message, setMessage] = useState('Appuyez sur Démarrer pour lancer la détection Z-Score !');

  // États du mode Terminal CLI
  const [cliOutput, setCliOutput] = useState([
    'Hurices Cyberpunk OS [Version 3.4.0]',
    '(c) Hurices Razanadraibe. Tous droits réservés.',
    'Tapez "help" ou cliquez sur une commande ci-dessous.',
    ''
  ]);
  const [cliInput, setCliInput] = useState('');
  const bottomRef = useRef(null);

  // Génération de paquets dans le mini-jeu
  useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => {
      const isAnomaly = Math.random() < 0.4;
      const zScore = isAnomaly ? parseFloat((2.6 + Math.random() * 2.5).toFixed(1)) : parseFloat((0.2 + Math.random() * 1.5).toFixed(1));
      const types = isAnomaly ? ['SYN_SURGE', 'PORT_PROBE', 'DDOS_ATTEMPT', 'Z_ALERT'] : ['HTTP_GET', 'API_REST', 'STATIC_ASSET', 'DNS_QUERY'];
      
      const newPacket = {
        id: Date.now(),
        ip: `${Math.floor(10 + Math.random() * 180)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(1 + Math.random() * 254)}`,
        type: types[Math.floor(Math.random() * types.length)],
        zScore,
        isThreat: isAnomaly,
        status: 'pending'
      };

      setPackets(prev => [newPacket, ...prev.slice(0, 4)]);
      if (isAnomaly) {
        setThreatLevel('ATTENTION');
      }
    }, 1800);

    return () => clearInterval(interval);
  }, [gameActive]);

  const handleIntercept = (packetId, isThreat) => {
    if (isThreat) {
      setScore(s => s + 100);
      setMessage('Anomalie Z-Score neutralisée (+100 pts) !');
      setThreatLevel('SÉCURISÉ');
    } else {
      setScore(s => Math.max(0, s - 30));
      setMessage('Faux positif ! Paquet légitime interrompu (-30 pts).');
    }
    setPackets(prev => prev.map(p => p.id === packetId ? { ...p, status: isThreat ? 'neutralized' : 'dropped' } : p));
  };

  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...cliOutput, `hurices@dev:~$ ${cliInput}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Commandes rapides :',
          '  about       - Profil d\'Hurices Razanadraibe',
          '  projects    - Liste des 8 dépôts concrets',
          '  cv          - Télécharger le CV en PDF',
          '  contact     - Liens LinkedIn, email & téléphone',
          '  clear       - Effacer l\'écran'
        );
        break;
      case 'about':
        newHistory.push(
          `Hurices Razanadraibe — ${personalInfo.title}`,
          `Localisation : ${personalInfo.location}`,
          `Profil       : Développeur Full Stack (Web moderne, Réseau & Applications Mobiles).`
        );
        break;
      case 'cv':
        window.open(personalInfo.cvPath, '_blank');
        newHistory.push(`[SUCCÈS] Téléchargement du CV lancé (${personalInfo.cvPath})`);
        break;
      case 'projects':
        newHistory.push(
          'Dépôts concrets :',
          ...projects.map(p => `  • ${p.title} (${p.categoryLabel}) - ${p.githubUrl}`)
        );
        break;
      case 'contact':
        newHistory.push(
          `Email     : ${personalInfo.email}`,
          `LinkedIn  : ${personalInfo.linkedinUrl}`,
          `GitHub    : ${personalInfo.githubUrl}`,
          `Téléphone : ${personalInfo.phone}`
        );
        break;
      case 'clear':
        setCliOutput([]);
        setCliInput('');
        return;
      default:
        newHistory.push(`Commande introuvable: "${cmd}". Tapez "help" pour voir la liste.`);
    }

    setCliOutput(newHistory);
    setCliInput('');
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden flex flex-col h-full shadow-lg">
      
      {/* Barre d'en-tête Cyberpunk / Terminal */}
      <div className="px-4 py-3 bg-[#0d1322] border-b border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="font-mono text-slate-300 font-medium ml-1">
            {activeTab === 'arcade' ? 'MODULE // NETCAP_DEFENDER.EXE' : 'TERMINAL // ZSH_STATION'}
          </span>
        </div>

        {/* Sélecteur de mode Arcade / CLI */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
          <button
            onClick={() => setActiveTab('arcade')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'arcade' ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gamepad2 size={12} />
            <span>Arcade Z-Score</span>
          </button>
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
              activeTab === 'cli' ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TerminalIcon size={12} />
            <span>CLI</span>
          </button>
        </div>
      </div>

      {/* Garantie d'accès sans blocage */}
      <div className="px-4 py-1.5 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate">Accès rapide sans jeu :</span>
        <div className="flex items-center gap-3">
          <a href={personalInfo.cvPath} download className="text-emerald-400 hover:underline flex items-center gap-1 font-mono">
            <Download size={11} /> CV direct
          </a>
          <button onClick={() => onOpenContact && onOpenContact()} className="text-slate-300 hover:text-white font-mono cursor-pointer">
            Contact
          </button>
        </div>
      </div>

      {/* CORPS DE L'ONGLET */}
      <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
        {activeTab === 'arcade' ? (
          <div className="space-y-3.5 flex-1 flex flex-col justify-between">
            {/* HUD Arcade */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">SCORE</span>
                <span className="text-base font-bold text-emerald-400 tabular-nums">{score} PTS</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">THREAT STATUS</span>
                <span className={`text-xs font-bold ${threatLevel === 'ATTENTION' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {threatLevel}
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">MOTEUR</span>
                <span className="text-xs font-bold text-slate-300">NetCap Z-Score</span>
              </div>
            </div>

            {/* Flux de paquets à intercepter */}
            <div className="space-y-1.5 overflow-hidden">
              <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Flux TCP/HTTP intercepté :</span>
                <span>{gameActive ? 'Interception en cours...' : 'En veille'}</span>
              </div>

              <div className="space-y-1.5">
                {packets.map(pkt => (
                  <div 
                    key={pkt.id} 
                    className={`p-2 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
                      pkt.status === 'neutralized' 
                        ? 'bg-emerald-950/20 border-emerald-800/40 opacity-60' 
                        : pkt.isThreat 
                          ? 'bg-rose-950/30 border-rose-800/60 text-rose-200' 
                          : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="truncate">
                      <span className="font-semibold text-slate-200">{pkt.type}</span>
                      <span className="text-slate-400 text-[11px] ml-2">{pkt.ip}</span>
                      <span className={`ml-2 text-[11px] font-bold ${pkt.zScore >= 2.5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        Z={pkt.zScore}σ
                      </span>
                    </div>

                    {pkt.status === 'pending' ? (
                      <button
                        onClick={() => handleIntercept(pkt.id, pkt.isThreat)}
                        className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                          pkt.isThreat 
                            ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse' 
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        {pkt.isThreat ? 'Neutraliser' : 'Filtrer'}
                      </button>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 uppercase">
                        {pkt.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contrôles du jeu */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400 truncate">{message}</span>
              <button
                onClick={() => setGameActive(!gameActive)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  gameActive 
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {gameActive ? <RotateCcw size={13} /> : <Play size={13} className="fill-white" />}
                <span>{gameActive ? 'Pause' : 'Lancer le radar'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* MODE TERMINAL CLI ÉPURÉ */
          <div className="flex-1 flex flex-col justify-between font-mono text-xs">
            <div className="space-y-1 overflow-y-auto max-h-52 pr-1">
              {cliOutput.map((line, idx) => (
                <div key={idx} className={line.startsWith('hurices@') ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                  {line}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleCliSubmit} className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <span className="text-emerald-400 font-semibold select-none">hurices@dev:~$</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="Tapez 'help', 'about', 'cv'..."
                className="flex-1 bg-transparent border-none outline-none text-slate-100 font-mono caret-emerald-400 text-xs"
              />
            </form>
          </div>
        )}
      </div>

    </div>
  );
}
