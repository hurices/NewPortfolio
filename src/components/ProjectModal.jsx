import React from 'react';
import { X, ExternalLink, Github, Play, CheckCircle2, Layers } from 'lucide-react';
import InteractiveDemos from './InteractiveDemos.jsx';

export default function ProjectModal({ project, onClose, isDemoActive, onToggleDemo }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
              {project.categoryLabel}
            </span>
            <h3 className="text-lg font-bold text-white truncate max-w-md">{project.title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corps défilable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Bannière visuelle si pas en mode démo direct */}
          {!isDemoActive && project.image && (
            <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-800 relative group">
              <img 
                src={project.image} 
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-mono text-slate-300 bg-slate-950/70 px-3 py-1 rounded-md backdrop-blur-sm border border-slate-700/50">
                  {project.tech.join(' · ')}
                </span>
              </div>
            </div>
          )}

          {/* Démo interactive si activée */}
          {isDemoActive ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Play size={14} className="fill-emerald-400" />
                  Environnement de simulation interactif actif
                </div>
                <button 
                  onClick={() => onToggleDemo(false)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Revenir à la description
                </button>
              </div>
              <InteractiveDemos demoType={project.demoType} onClose={() => onToggleDemo(false)} />
            </div>
          ) : (
            <>
              {/* Description & résumé */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-200">Présentation du projet</h4>
                <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
                {project.role && (
                  <div className="text-xs font-mono text-emerald-400 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-900/40">
                    Rôle & implication : {project.role}
                  </div>
                )}
              </div>

              {/* Points clés & fonctionnalités */}
              {project.points && (
                <div className="space-y-2.5">
                  <h4 className="text-sm font-semibold text-slate-200">Points clés & architecture</h4>
                  <ul className="space-y-2">
                    {project.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Stack technique</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky bottom-0">
          <div className="flex items-center gap-2">
            {project.hasInteractiveDemo && (
              <button 
                onClick={() => onToggleDemo(!isDemoActive)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Play size={14} className={isDemoActive ? "fill-white" : ""} />
                {isDemoActive ? "Voir la fiche descriptive" : "Tester la démo en direct"}
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <Github size={14} /> Voir le code source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
