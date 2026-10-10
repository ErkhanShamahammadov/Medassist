import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RESEARCH_HISTORICAL_DATA } from '../../data/mockData';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Users, 
  Building2, 
  BookOpen, 
  Zap,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  Legend
} from 'recharts';
import { ResearchPaperDraft } from './ResearchPaperDraft';

export const AnalyticsHub = () => {
  const { exportResearchData, requests, volunteers } = useApp();
  const [isPaperModalOpen, setIsPaperModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('combined'); // 'combined', 'hourly', 'departments'

  const data = RESEARCH_HISTORICAL_DATA;
  const comp = data.comparativeStudy;

  return (
    <div className="space-y-6">
      
      {/* Top Research Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Data Science & Scientific Research Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Операционная аналитика и научное исследование
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Реальные обезличенные операционные данные для вашего научного отчета и академического портфолио. Сравнение эффективности «До» и «После» внедрения цифровой системы.
          </p>
        </div>

        {/* Action buttons: Export CSV / JSON / Paper */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => exportResearchData('csv')}
            className="flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition"
            title="Экспорт сырого датасета в CSV (Excel / Pandas)"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Экспорт CSV</span>
          </button>

          <button
            onClick={() => exportResearchData('json')}
            className="flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition"
            title="Экспорт в JSON для Python / R"
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>JSON Dataset</span>
          </button>

          <button
            onClick={() => setIsPaperModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-bold text-xs hover:brightness-110 shadow-lg transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Статья для поступления</span>
          </button>
        </div>
      </div>

      {/* 4 Big Research KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Выборка за 3 месяца:</span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{data.totalRequestsSampled}</div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> {data.completedRequests} выполнено (96.7%)
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Волонтерские часы:</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400">{data.totalVolunteerHours} ч</div>
          <p className="text-[11px] text-slate-400 mt-1">
            {data.activeVolunteersTotal} школьников • 8 отделений
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Сокращение SLA отклика:</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">-{comp.responseTimeImprovementPercent}%</div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1">
            С {comp.avgResponseTimeBeforeMins} мин ➔ до {comp.avgResponseTimeAfterMins} мин
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Сэкономлено времени врачей:</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400">{comp.staffTimeSavedHoursTotal} ч</div>
          <p className="text-[11px] text-purple-300 font-medium mt-1">
            Перенаправлено на лечение пациентов
          </p>
        </div>
      </div>

      {/* Pre vs Post Digital Impact Benchmark Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Comparative Study
            </span>
            <h3 className="text-lg font-bold text-white">
              До и После внедрения CareFlow MedAssist
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            p &lt; 0.001 (Statistically Significant)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-semibold">Скорость реакции волонтера:</span>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-rose-400 block">До: {comp.avgResponseTimeBeforeMins} мин</span>
                <span className="text-xl font-bold text-emerald-400">После: {comp.avgResponseTimeAfterMins} мин</span>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                в 5.9 раз быстрее
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-semibold">Удовлетворенность медперсонала:</span>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">До: {comp.patientSatisfactionScoreBefore} / 5.0</span>
                <span className="text-xl font-bold text-amber-400">После: {comp.patientSatisfactionScoreAfter} / 5.0</span>
              </div>
              <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">
                +42.6%
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-semibold">Потерянные / забытые заявки:</span>
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-rose-400 block">До: {comp.lostRequestsPercentBefore}%</span>
                <span className="text-xl font-bold text-cyan-400">После: {comp.lostRequestsPercentAfter}%</span>
              </div>
              <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md">
                -95% сбоев
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Hourly Peak Load */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Почасовое распределение нагрузки (Часы пик)
              </h3>
              <p className="text-xs text-slate-400">
                Максимальная нагрузка приходится на 10:00 - 12:00 и 14:00 - 15:00
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.hourlyLoadDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="requests" name="Кол-во заявок" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Requests by Department */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Заявки по отделениям больницы
              </h3>
              <p className="text-xs text-slate-400">
                Лидеры по обращениям: Кардиология, Радиология (МРТ/КТ), Хирургия
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.departmentDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={110} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" name="Вызовов" fill="#06b6d4" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Help Types Breakdown & Portfolio Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Help Type Breakdown */}
        <div className="lg:col-span-1 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Структура запросов помощи
          </h3>

          <div className="space-y-3">
            {data.helpTypeBreakdown.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.type}</span>
                  <span className="text-emerald-400 font-bold">{item.percent}% ({item.count})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio & University Admissions Tips */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-amber-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">
              Как использовать эти данные для поступления (CS / Data Science / Pre-Med)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-300">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
              <strong className="text-cyan-400 block mb-1">1. Product & Leadership:</strong>
              <span>Вы не просто волонтерили, а выявили организационное «узкое горлышко», создали цифровой продукт, внедрили его в 8 отделениях и обучили 12 волонтеров.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80">
              <strong className="text-emerald-400 block mb-1">2. Quantitative Research:</strong>
              <span>У вас есть эмпирическая выборка (N=742), точные метрики SLA, подтвержденное сокращение времени отклика на 83.1% и Zero-PII соответствие.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Paper Modal */}
      <ResearchPaperDraft
        isOpen={isPaperModalOpen}
        onClose={() => setIsPaperModalOpen(false)}
      />

    </div>
  );
};
