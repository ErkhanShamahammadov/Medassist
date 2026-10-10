import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart2, 
  FileSpreadsheet, 
  Printer, 
  Clock, 
  CheckCircle2, 
  Users, 
  Star,
  Award,
  Building2,
  PieChart as PieIcon
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
  Cell 
} from 'recharts';

const COLORS = ['#0284c7', '#0d9488', '#6366f1', '#f59e0b', '#ec4899', '#84cc16'];

export const AnalyticsView = () => {
  const { requests, volunteers, departments, exportToCSV } = useApp();

  const totalRequests = requests.length;
  const completedRequests = requests.filter(r => r.status === 'COMPLETED');
  const completedCount = completedRequests.length;
  
  // Real total hours = sum of completed durations / 60
  const totalDurationMins = completedRequests.reduce((acc, r) => acc + (Number(r.durationMinutes) || 0), 0);
  const totalRealHours = (totalDurationMins / 60).toFixed(1);

  // Real average rating
  const ratedRequests = completedRequests.filter(r => r.rating > 0);
  const avgRating = ratedRequests.length > 0 
    ? (ratedRequests.reduce((acc, r) => acc + Number(r.rating), 0) / ratedRequests.length).toFixed(1)
    : '—';

  // Department Distribution data
  const deptData = departments.map(d => {
    const count = requests.filter(r => r.departmentId === d.id).length;
    return {
      name: d.name.length > 18 ? d.name.slice(0, 16) + '...' : d.name,
      fullName: d.name,
      count
    };
  }).filter(d => d.count > 0);

  // Help Category Distribution data
  const categoryMap = {};
  requests.forEach(r => {
    const title = r.helpCategoryTitle || 'Прочее';
    categoryMap[title] = (categoryMap[title] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map((catName) => ({
    name: catName,
    count: categoryMap[catName]
  }));

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Сводная статистика и научный отчет
          </h2>
          <p className="text-xs text-slate-500">
            Все метрики рассчитываются строго на базе реально зарегистрированных вызовов
          </p>
        </div>

        <div className="no-print flex items-center space-x-2">
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-xs font-semibold transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Выгрузить в Excel (CSV)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            <span>Печать отчета</span>
          </button>
        </div>
      </div>

      {/* 4 Key Real Numbers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Всего реальных заявок:</span>
          <span className="text-2xl font-bold text-slate-900">{totalRequests}</span>
          <p className="text-[11px] text-slate-500 mt-1">
            Зафиксировано в системе
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Успешно выполнено:</span>
          <span className="text-2xl font-bold text-emerald-600">{completedCount}</span>
          <p className="text-[11px] text-emerald-700 mt-1">
            {totalRequests > 0 ? `${((completedCount / totalRequests) * 100).toFixed(0)}% завершено` : 'Ожидание вызовов'}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Волонтерские часы:</span>
          <span className="text-2xl font-bold text-sky-700">{totalRealHours} ч</span>
          <p className="text-[11px] text-slate-500 mt-1">
            {totalDurationMins} минут прямой помощи
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Средняя оценка медперсонала:</span>
          <span className="text-2xl font-bold text-amber-600 flex items-center">
            {avgRating} {avgRating !== '—' && <Star className="w-4 h-4 fill-amber-500 text-amber-500 ml-1" />}
          </span>
          <p className="text-[11px] text-slate-500 mt-1">
            По отзывам врачей и сестер
          </p>
        </div>

      </div>

      {/* Empty State warning if 0 requests */}
      {totalRequests === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
          <Clock className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="text-sm font-bold text-slate-900">Данных для графиков пока недостаточно</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Создайте реальные заявки на сопровождение пациентов и завершите их, чтобы увидеть автоматические графики распределения.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          
          {/* Chart 1: Departments */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Распределение вызовов по отделениям больницы
            </h3>
            
            {deptData.length === 0 ? (
              <p className="text-xs text-slate-400 py-10 text-center">Нет вызовов по отделениям</p>
            ) : (
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deptData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={11} stroke="#64748b" />
                    <YAxis fontSize={11} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="count" name="Количество заявок" fill="#0284c7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Chart 2: Help Category Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Типы немедицинской помощи
            </h3>

            {categoryData.length === 0 ? (
              <p className="text-xs text-slate-400 py-10 text-center">Нет данных по категориям</p>
            ) : (
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis type="number" fontSize={11} stroke="#64748b" />
                    <YAxis dataKey="name" type="category" fontSize={11} width={140} stroke="#64748b" />
                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', fontSize: '12px' }} />
                    <Bar dataKey="count" name="Заявок" fill="#0d9488" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Research and Portfolio Summary Box */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-3">
        <div className="flex items-center space-x-2 text-sky-400">
          <Award className="w-5 h-5" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Научное резюме для исследовательского проекта
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          На основе внедрения цифровой системы диспетчеризации в больнице: зарегистрировано <strong>{totalRequests}</strong> обращений, волонтерский отряд ({volunteers.length} чел.) обеспечил <strong>{totalRealHours} ч</strong> немедицинской помощи пациентам, разгрузив дежурных врачей и медсестер.
        </p>
      </div>

    </div>
  );
};
