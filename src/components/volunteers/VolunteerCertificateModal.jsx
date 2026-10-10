import React from 'react';
import { Award, X, Printer, ShieldCheck } from 'lucide-react';

export const VolunteerCertificateModal = ({ volunteer, isOpen, onClose }) => {
  if (!isOpen || !volunteer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="no-print absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas */}
        <div className="p-8 rounded-xl border-4 border-double border-slate-800 bg-white text-center space-y-6">
          
          <div className="space-y-1">
            <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-bold block">
              Городская клиническая больница • Волонтерская служба
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide">
              СЕРТИФИКАТ ВОЛОНТЕРА
            </h2>
            <p className="text-xs text-slate-500 italic">
              Подтверждение участия в программе немедицинской помощи пациентам
            </p>
          </div>

          <div className="py-3 border-y border-slate-200">
            <p className="text-xs text-slate-500 mb-1">Настоящим подтверждается, что</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {volunteer.name}
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              {volunteer.school}, {volunteer.grade}
            </p>
          </div>

          <div className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
            добросовестно и активно участвовал(а) в волонтерской деятельности стационара, оказывая помощь в сопровождении пациентов, доставке документации и поддержке медицинского персонала.
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-slate-50 border border-slate-200 max-w-md mx-auto">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Подтвержденные часы:</span>
              <span className="text-xl font-extrabold text-sky-700">{volunteer.totalHours} ч</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Выполнено заданий:</span>
              <span className="text-xl font-extrabold text-emerald-700">{volunteer.completedTasks}</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-6 flex items-center justify-between text-left text-[11px] text-slate-600 border-t border-slate-200">
            <div>
              <p className="font-bold text-slate-900">Координатор службы</p>
              <p className="text-[10px] text-slate-500">ГКБ / Волонтерский штаб</p>
              <p className="text-[9px] font-mono text-slate-400 mt-1">Рег. номер: CERT-{volunteer.id.slice(-6).toUpperCase()}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-slate-900">Дата выдачи</p>
              <p className="text-[10px] text-slate-500">{new Date().toLocaleDateString('ru-RU')}</p>
              <p className="text-[9px] text-emerald-700 font-semibold mt-1">✓ Официально подтверждено</p>
            </div>
          </div>

        </div>

        {/* Action buttons */}
        <div className="no-print mt-5 flex items-center justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900"
          >
            Закрыть
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            <span>Распечатать / Сохранить в PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
