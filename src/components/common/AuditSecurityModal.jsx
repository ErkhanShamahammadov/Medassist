import React from 'react';
import { ShieldCheck, Lock, EyeOff, UserX, FileCheck, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuditSecurityModal = () => {
  const { showSecurityModal, setShowSecurityModal } = useApp();

  if (!showSecurityModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-100">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowSecurityModal(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Политика Zero-PII и Медицинская Этика
            </h3>
            <p className="text-xs text-emerald-400 font-medium">
              Полное соответствие закону о защите персональных данных и регламентам стационаров
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-sm text-slate-300">
          <p className="leading-relaxed text-xs sm:text-sm">
            Приложение <strong>CareFlow MedAssist</strong> спроектировано по принципу <em>«Privacy by Design»</em>. Система не хранит, не обрабатывает и не передает персональные или клинические данные пациентов.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Block 1: What is EXCLUDED */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
              <div className="flex items-center space-x-2 text-rose-400 font-semibold text-xs mb-2">
                <UserX className="w-4 h-4" />
                <span>Категорически исключено:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-200/80">
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>ФИО и возраст пациентов</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>Диагнозы, анамнез, карты болезни</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>Контакты, телефоны, адреса</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>Фотографии и биометрия</span>
                </li>
              </ul>
            </div>

            {/* Block 2: What is INCLUDED */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs mb-2">
                <FileCheck className="w-4 h-4" />
                <span>Используется для диспетчеризации:</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-200/80">
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Анонимный ID (например: <code className="bg-slate-800 px-1 py-0.5 rounded text-[11px]">REQ-024</code>)</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Отделение и номер кабинета/палаты</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Тип немедицинской помощи</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Хронометраж и статус выполнения</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-400 flex items-start space-x-3">
            <Lock className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-200">Научная ценность датасета:</strong> Обезличенные данные позволяют провести строгое научное исследование организационной эффективности без риска нарушения врачебной тайны.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setShowSecurityModal(false)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-glow-teal transition"
          >
            Понятно, продолжить работу
          </button>
        </div>

      </div>
    </div>
  );
};
