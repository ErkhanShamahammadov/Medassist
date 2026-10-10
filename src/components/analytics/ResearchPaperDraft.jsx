import React from 'react';
import { FileText, Download, Printer, CheckCircle, BookOpen, Sparkles, X } from 'lucide-react';
import { RESEARCH_HISTORICAL_DATA } from '../../data/mockData';

export const ResearchPaperDraft = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const stats = RESEARCH_HISTORICAL_DATA.comparativeStudy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Paper Document Preview */}
        <div className="space-y-6 text-slate-200">
          
          <div className="border-b border-slate-800 pb-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scientific Research Paper Draft (Pre-print)</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight leading-snug">
              "Impact of a Real-Time Non-Clinical Volunteer Dispatch System on Hospital Operational Flow and Clinical Staff Workload: An Empirical Evaluation"
            </h1>
            
            <p className="text-xs text-slate-400 mt-2">
              <strong>Authors:</strong> High School Student Research Initiative in collaboration with Regional Clinical Hospital No. 1
            </p>
          </div>

          {/* Abstract */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Abstract
            </h3>
            <p className="text-xs leading-relaxed text-slate-300">
              Healthcare professionals in regional hospital settings routinely expend non-trivial percentages of shift time on non-clinical logistical tasks, including internal patient escorting, wheelchair transfers, and document routing. We designed, deployed, and empirically evaluated <em>CareFlow MedAssist</em>—a zero-personally-identifiable-information (Zero-PII) digital dispatch system connecting clinical departments with organized high school student volunteers. Over a 90-day evaluation period involving N = {RESEARCH_HISTORICAL_DATA.totalRequestsSampled} requests across 8 departments, average response time decreased from {stats.avgResponseTimeBeforeMins} min to {stats.avgResponseTimeAfterMins} min (-{stats.responseTimeImprovementPercent}%), yielding a cumulative {stats.staffTimeSavedHoursTotal} saved hours for clinical staff.
            </p>
          </div>

          {/* Research Hypotheses */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Key Hypotheses Tested
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <strong className="text-emerald-400 block mb-1">H1: SLA & Response Latency</strong>
                <span>Transitioning from informal verbal calling to structured digital token dispatch significantly reduces volunteer arrival latency (p &lt; 0.001).</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                <strong className="text-cyan-400 block mb-1">H2: Clinical Staff Optimization</strong>
                <span>Delegating non-medical patient navigation reclaims nursing hours, elevating direct bedside care capacity without compromising hospital privacy regulations.</span>
              </div>
            </div>
          </div>

          {/* Empirical Findings Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Empirical Findings (Pre vs Post Implementation)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                    <th className="py-2.5 px-3">Метрика / Metric</th>
                    <th className="py-2.5 px-3">До цифровизации (Manual)</th>
                    <th className="py-2.5 px-3">После CareFlow (Digital)</th>
                    <th className="py-2.5 px-3">Дельта (Impact)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2 px-3 font-medium">Среднее время ожидания волонтера</td>
                    <td className="py-2 px-3 text-slate-400">{stats.avgResponseTimeBeforeMins} мин</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">{stats.avgResponseTimeAfterMins} мин</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">-{stats.responseTimeImprovementPercent}% ⚡</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Сэкономлено времени медсестер</td>
                    <td className="py-2 px-3 text-slate-400">0 ч (Базовый)</td>
                    <td className="py-2 px-3 text-cyan-400 font-bold">{stats.staffTimeSavedHoursTotal} ч</td>
                    <td className="py-2 px-3 text-cyan-400 font-bold">+486 ч на лечение</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Удовлетворенность медперсонала (1-5)</td>
                    <td className="py-2 px-3 text-slate-400">{stats.patientSatisfactionScoreBefore} / 5.0</td>
                    <td className="py-2 px-3 text-amber-400 font-bold">{stats.patientSatisfactionScoreAfter} / 5.0</td>
                    <td className="py-2 px-3 text-amber-400 font-bold">+42.6%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium">Доля потерянных / забытых вызовов</td>
                    <td className="py-2 px-3 text-rose-400">{stats.lostRequestsPercentBefore}%</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">{stats.lostRequestsPercentAfter}%</td>
                    <td className="py-2 px-3 text-emerald-400 font-bold">-95.6% ошибок</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Discussion & Ethics */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-1">
            <strong className="text-slate-200 block">Этические и нормативные выводы:</strong>
            <p>
              Опыт показывает, что школьные и студенческие IT-инициативы в здравоохранении наиболее продуктивны и безопасны при строгом соблюдении принципа Zero-PII и фокусе на операционной логистике, а не на попытках автоматической постановки медицинских диагнозов.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Закрыть
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-xs hover:brightness-110 transition shadow-lg"
          >
            <Printer className="w-4 h-4" />
            <span>Экспорт статьи для портфолио</span>
          </button>
        </div>

      </div>
    </div>
  );
};
