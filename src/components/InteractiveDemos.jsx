import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Terminal, 
  ShoppingCart, 
  Check, 
  RotateCcw,
  Network,
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function InteractiveDemos({ demoType, onClose }) {
  return (
    <div className="w-full">
      {demoType === 'netcap' && <NetCapDemo />}
      {demoType === 'cyber' && <CyberGuardianDemo />}
      {demoType === 'todo' && <SmartTodoDemo />}
      {demoType === 'ipcalc' && <IpCalcDemo />}
      {demoType === 'ecommerce' && <EcommerceDemo />}
      {demoType === 'excel' && <ExcelSimulatorDemo />}
    </div>
  );
}

// 1. Démo NetCap : Simulateur de Z-Score et Détection d'anomalies
function NetCapDemo() {
  const [trafficRate, setTrafficRate] = useState(45); // req/sec
  const [history, setHistory] = useState([
    { id: 1, time: '14:20:01', clientIp: '192.168.1.42', dest: 'api.github.com', packets: 42, zScore: 0.3, status: 'NORMAL' },
    { id: 2, time: '14:20:04', clientIp: '192.168.1.15', dest: 'cloudflare.com', packets: 38, zScore: 0.1, status: 'NORMAL' },
    { id: 3, time: '14:20:07', clientIp: '192.168.1.88', dest: 'raw.githubusercontent.com', packets: 51, zScore: 0.8, status: 'NORMAL' },
  ]);

  const mean = 40;
  const stdDev = 12;
  const currentZScore = useMemo(() => {
    const z = (trafficRate - mean) / stdDev;
    return parseFloat(z.toFixed(2));
  }, [trafficRate]);

  const isAnomaly = currentZScore >= 2.5;

  const simulatePacket = (mode) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    let rate = trafficRate;
    let target = 'login.portail.local';
    
    if (mode === 'normal') {
      rate = Math.floor(30 + Math.random() * 20);
      setTrafficRate(rate);
      target = 'app.gasikara.mg';
    } else if (mode === 'surge') {
      rate = Math.floor(75 + Math.random() * 35);
      setTrafficRate(rate);
      target = 'auth.portal/bruteforce';
    }

    const calculatedZ = parseFloat(((rate - mean) / stdDev).toFixed(2));
    const isAlert = calculatedZ >= 2.5;

    const newRecord = {
      id: Date.now(),
      time: timeStr,
      clientIp: `192.168.1.${Math.floor(10 + Math.random() * 200)}`,
      dest: target,
      packets: rate,
      zScore: calculatedZ,
      status: isAlert ? 'ALERTE Z-SCORE' : 'NORMAL'
    };

    setHistory(prev => [newRecord, ...prev.slice(0, 5)]);
  };

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono">NetCap Analytics Engine</span>
          <h4 className="text-base font-semibold text-white">Simulateur d'analyse comportementale (Pandas/NumPy Z-Score)</h4>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => simulatePacket('normal')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Injecter trafic normal
          </button>
          <button 
            onClick={() => simulatePacket('surge')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors cursor-pointer"
          >
            Simuler pic d'attaque
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Taux de paquets actuel</div>
          <div className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
            {trafficRate} <span className="text-xs font-normal text-slate-400">req/s</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="120" 
            value={trafficRate} 
            onChange={(e) => setTrafficRate(parseInt(e.target.value))}
            className="w-full mt-3 accent-emerald-500 cursor-pointer"
          />
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs text-slate-400">Score statistique Z-Score</div>
          <div className={`text-2xl font-bold font-mono mt-1 tabular-nums ${isAnomaly ? 'text-rose-400' : 'text-emerald-400'}`}>
            Z = {currentZScore > 0 ? `+${currentZScore}` : currentZScore} σ
          </div>
          <div className="text-xs text-slate-400 mt-2">Seuil d'alerte configuré : Z ≥ 2.50</div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col justify-center ${isAnomaly ? 'bg-rose-950/40 border-rose-800 text-rose-200' : 'bg-emerald-950/30 border-emerald-800 text-emerald-200'}`}>
          <div className="flex items-center gap-2 font-semibold text-sm">
            {isAnomaly ? <ShieldAlert className="w-5 h-5 text-rose-400" /> : <Activity className="w-5 h-5 text-emerald-400" />}
            <span>{isAnomaly ? 'Anomalie détectée !' : 'Comportement nominal'}</span>
          </div>
          <p className="text-xs mt-1 text-slate-300">
            {isAnomaly 
              ? 'Le pipeline déclenche une alerte Z-score et redirige vers le portail captif.' 
              : 'Trafic dans les tolérances statistiques standards.'}
          </p>
        </div>
      </div>

      <div>
        <div className="text-xs font-mono text-slate-400 mb-2">Flux d'événements interceptés par le proxy TCP :</div>
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2 px-3">Heure</th>
                <th className="py-2 px-3">IP Source</th>
                <th className="py-2 px-3">Destination</th>
                <th className="py-2 px-3">Volume</th>
                <th className="py-2 px-3">Z-Score</th>
                <th className="py-2 px-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {history.map(row => (
                <tr key={row.id} className="hover:bg-slate-900/50">
                  <td className="py-2 px-3 text-slate-400 tabular-nums">{row.time}</td>
                  <td className="py-2 px-3 text-slate-300">{row.clientIp}</td>
                  <td className="py-2 px-3 text-slate-200">{row.dest}</td>
                  <td className="py-2 px-3 text-slate-300 tabular-nums">{row.packets} pkts</td>
                  <td className="py-2 px-3 tabular-nums">{row.zScore}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${row.status.includes('ALERTE') ? 'bg-rose-900/50 text-rose-300' : 'bg-emerald-900/40 text-emerald-300'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 2. Démo CyberGuardian : Audit et surveillance
function CyberGuardianDemo() {
  const [nodes, setNodes] = useState([
    { name: "Passerelle Principale", ip: "192.168.1.1", latency: "1.2 ms", status: "Opérationnel", load: "18%" },
    { name: "Serveur API REST", ip: "192.168.1.10", latency: "3.4 ms", status: "Opérationnel", load: "34%" },
    { name: "Base de Données Core", ip: "192.168.1.12", latency: "0.8 ms", status: "Opérationnel", load: "42%" },
    { name: "Sonde Périmétrique", ip: "192.168.1.25", latency: "2.1 ms", status: "En écoute", load: "12%" }
  ]);

  const [activeTab, setActiveTab] = useState('nodes');

  return (
    <div className="space-y-4 text-slate-100">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono">CyberGuardian Node Prober</span>
          <h4 className="text-base font-semibold text-white">Monitoring d'infrastructure & sondes en temps réel</h4>
        </div>
        <div className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Supervision active
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {nodes.map((node, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-200">{node.name}</span>
              <span className="text-xs font-mono text-emerald-400">{node.status}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>IP : {node.ip}</span>
              <span>Latence : {node.latency}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Charge CPU</span>
                <span className="font-mono">{node.load}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-cyan-500 h-1.5 rounded-full" 
                  style={{ width: node.load }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. Démo SmartTodo : Gestionnaire de tâches interactif
function SmartTodoDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finaliser architecture API REST Node.js', priority: 'haute', done: true },
    { id: 2, title: 'Optimiser requêtes de filtrage MongoDB', priority: 'moyenne', done: false },
    { id: 3, title: 'Rédiger documentation technique pour l\'équipe', priority: 'basse', done: false },
    { id: 4, title: 'Mise en place tests automatisés Jest', priority: 'haute', done: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const handleToggle = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, {
      id: Date.now(),
      title: newTaskText.trim(),
      priority: 'moyenne',
      done: false
    }]);
    setNewTaskText('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.done;
    if (filter === 'active') return !t.done;
    return true;
  });

  const completedCount = tasks.filter(t => t.done).length;
  const progressPercent = Math.round((completedCount / (tasks.length || 1)) * 100);

  return (
    <div className="space-y-4 text-slate-100">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-400 font-mono">SmartTodo Frontend/Backend Client</span>
          <h4 className="text-base font-semibold text-white">Gestionnaire de tâches réactif avec état local</h4>
        </div>
        <div className="text-xs font-mono text-slate-300">
          Progression : <span className="text-emerald-400 font-bold">{progressPercent}%</span>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input 
          type="text" 
          value={newTaskText} 
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Ajouter une tâche (ex: Déployer le conteneur Docker)..." 
          className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus size={16} /> Ajouter
        </button>
      </form>

      <div className="flex gap-2 text-xs">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${filter === 'all' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'}`}
        >
          Toutes ({tasks.length})
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${filter === 'active' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'}`}
        >
          En cours ({tasks.length - completedCount})
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${filter === 'completed' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'}`}
        >
          Terminées ({completedCount})
        </button>
      </div>

      <div className="space-y-2">
        {filteredTasks.map(t => (
          <div 
            key={t.id} 
            className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
          >
            <div 
              className="flex items-center gap-3 cursor-pointer flex-1"
              onClick={() => handleToggle(t.id)}
            >
              {t.done ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500 shrink-0" />
              )}
              <span className={`text-sm ${t.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                {t.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded ${
                t.priority === 'haute' ? 'bg-rose-950/60 text-rose-300 border border-rose-800/40' : 'bg-slate-800 text-slate-300'
              }`}>
                {t.priority}
              </span>
              <button 
                onClick={() => handleDelete(t.id)}
                className="text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Démo IP Calculator for Linux : Calculateur CIDR / Sous-réseaux
function IpCalcDemo() {
  const [ip, setIp] = useState('192.168.10.25');
  const [cidr, setCidr] = useState(24);

  const calculations = useMemo(() => {
    try {
      const parts = ip.split('.').map(Number);
      if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
        return null;
      }
      const hostBits = 32 - cidr;
      const totalHosts = Math.pow(2, hostBits);
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : (totalHosts === 1 ? 1 : 0);

      // Calcul masque
      let maskInt = 0;
      for (let i = 0; i < cidr; i++) {
        maskInt |= (1 << (31 - i));
      }
      const maskParts = [
        (maskInt >>> 24) & 255,
        (maskInt >>> 16) & 255,
        (maskInt >>> 8) & 255,
        maskInt & 255
      ];
      const maskStr = maskParts.join('.');

      // IP en entier 32 bits
      const ipInt = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
      const netInt = (ipInt & maskInt) >>> 0;
      const bcastInt = (netInt | (~maskInt >>> 0)) >>> 0;

      const toDotted = (num) => [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');

      return {
        network: toDotted(netInt),
        broadcast: toDotted(bcastInt),
        mask: maskStr,
        firstUsable: toDotted(netInt + 1),
        lastUsable: toDotted(bcastInt - 1),
        totalHosts,
        usableHosts
      };
    } catch {
      return null;
    }
  }, [ip, cidr]);

  return (
    <div className="space-y-4 text-slate-100">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <span className="text-xs uppercase tracking-wider text-amber-400 font-mono">Ip_Calculator-for-Linux CLI Engine</span>
        <h4 className="text-base font-semibold text-white">Calculateur interactif de sous-réseaux IPv4 & CIDR</h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-mono text-slate-400 block mb-1">Adresse IP</label>
          <input 
            type="text" 
            value={ip} 
            onChange={(e) => setIp(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm font-mono text-slate-100 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Préfixe CIDR</span>
            <span className="text-amber-400">/{cidr}</span>
          </div>
          <input 
            type="range" 
            min="8" 
            max="30" 
            value={cidr} 
            onChange={(e) => setCidr(parseInt(e.target.value))}
            className="w-full mt-2 accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {calculations ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Adresse Réseau</span>
            <span className="text-white font-semibold text-sm mt-0.5 block">{calculations.network}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Masque de Sous-réseau</span>
            <span className="text-amber-300 font-semibold text-sm mt-0.5 block">{calculations.mask}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Adresse Broadcast</span>
            <span className="text-white font-semibold text-sm mt-0.5 block">{calculations.broadcast}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Première IP Hôte</span>
            <span className="text-emerald-400 font-semibold text-sm mt-0.5 block">{calculations.firstUsable}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Dernière IP Hôte</span>
            <span className="text-emerald-400 font-semibold text-sm mt-0.5 block">{calculations.lastUsable}</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Hôtes Exploitables</span>
            <span className="text-white font-semibold text-sm mt-0.5 block tabular-nums">{calculations.usableHosts.toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-300 text-xs">
          Veuillez renseigner une adresse IPv4 valide (ex: 192.168.1.1).
        </div>
      )}
    </div>
  );
}

// 5. Démo E-Commerce : Panier interactif
function EcommerceDemo() {
  const [cart, setCart] = useState([
    { id: 1, name: 'Module Proxy TCP Pro', price: 49, quantity: 1 }
  ]);

  const catalog = [
    { id: 1, name: 'Module Proxy TCP Pro', price: 49, desc: 'Interception et filtrage réseau modulaire' },
    { id: 2, name: 'Licence CyberGuardian', price: 129, desc: 'Sondes d\'audit et monitoring' },
    { id: 3, name: 'Pack Formation Linux & Dev', price: 39, desc: 'Scripts et tutoriels pratiques' }
  ];

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (id) => {
    setCart(cart.filter(c => c.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4 text-slate-100">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono">E-Commerce Interactive Checkout</span>
          <h4 className="text-base font-semibold text-white">Catalogue & gestion de panier temps réel</h4>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <ShoppingCart size={16} /> Panier : {cart.length} article(s)
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-xs text-slate-400 font-mono">Catalogue disponible</span>
          {catalog.map(item => (
            <div key={item.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-200">{item.name}</div>
                <div className="text-xs text-slate-400">{item.desc}</div>
                <div className="text-xs font-mono text-emerald-400 mt-1">{item.price} €</div>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-md transition-colors cursor-pointer"
              >
                + Ajouter
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
          <span className="text-xs text-slate-400 font-mono">Récapitulatif de commande</span>
          {cart.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">Votre panier est vide.</p>
          ) : (
            <div className="space-y-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-200">{item.name}</span>
                    <span className="text-slate-400 ml-1.5 font-mono">x{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-slate-300">{item.price * item.quantity} €</span>
                    <button onClick={() => removeItem(item.id)} className="text-slate-500 hover:text-rose-400 cursor-pointer">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="border-t border-slate-800 pt-3 flex justify-between items-center font-semibold text-sm">
                <span>Total estimé :</span>
                <span className="font-mono text-emerald-400">{total} €</span>
              </div>
              <button 
                onClick={() => alert('Simulation de commande validée ! Merci pour le test.')}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold mt-2 transition-colors cursor-pointer"
              >
                Valider la commande (Simulation)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 6. Démo LearnExcel : Simulateur de formules
function ExcelSimulatorDemo() {
  const [formula, setFormula] = useState('=SOMME(A1:A4)');
  const [data, setData] = useState([120, 240, 180, 310]);

  const result = useMemo(() => {
    if (formula.includes('SOMME')) {
      return data.reduce((a, b) => a + b, 0);
    }
    if (formula.includes('MOYENNE')) {
      return Math.round(data.reduce((a, b) => a + b, 0) / data.length);
    }
    if (formula.includes('MAX')) {
      return Math.max(...data);
    }
    return 850;
  }, [formula, data]);

  return (
    <div className="space-y-4 text-slate-100">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <span className="text-xs uppercase tracking-wider text-sky-400 font-mono">LearnExcel Interactive Sandbox</span>
        <h4 className="text-base font-semibold text-white">Simulateur en direct de formules et calculs matriciels</h4>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setFormula('=SOMME(A1:A4)')}
          className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${formula === '=SOMME(A1:A4)' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          =SOMME(A1:A4)
        </button>
        <button 
          onClick={() => setFormula('=MOYENNE(A1:A4)')}
          className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${formula === '=MOYENNE(A1:A4)' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          =MOYENNE(A1:A4)
        </button>
        <button 
          onClick={() => setFormula('=MAX(A1:A4)')}
          className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${formula === '=MAX(A1:A4)' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
        >
          =MAX(A1:A4)
        </button>
      </div>

      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
        <div className="text-slate-400 flex justify-between">
          <span>Formule évaluée : <strong className="text-sky-300">{formula}</strong></span>
          <span>Résultat évalué : <strong className="text-emerald-400 text-sm">{result}</strong></span>
        </div>
        <div className="grid grid-cols-4 gap-2 pt-2">
          {data.map((val, idx) => (
            <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-500">Cellule A{idx + 1}</div>
              <div className="text-white font-bold">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
