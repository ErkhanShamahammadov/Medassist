import React from 'react';
import { Award, ShieldCheck, X, Download, Printer, CheckCircle, QrCode } from 'lucide-react';

export const VolunteerCertificate = ({ volunteer, isOpen, onClose }) => {
  if (!isOpen || !volunteer) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 max-h-[95vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Printable Canvas */}
        <div id="certificate-print-area" className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500/40 text-center space-y-6 shadow-inner">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-400"></div>
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-400"></div>
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-400"></div>
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-400"></div>

          {/* Certificate Header */}
          <div className="space-y-1">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mb-2">
              <Award className="w-8 h-8" />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold block">
              Городская клиническая больница №1 • Служба волонтеров
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              СЕРТИФИКАТ ВОЛОНТЕРА
            </h2>
            <p className="text-xs text-slate-400 font-serif italic">
              Official Non-Clinical Hospital Service & Social Impact Record
            </p>
          </div>

          {/* Recipient */}
          <div className="py-2 border-y border-slate-800/80">
            <p className="text-xs text-slate-400 mb-1">Настоящим подтверждается, что</p>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-teal-300">
              {volunteer.name}
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              {volunteer.school}, {volunteer.grade}
            </p>
          </div>

          {/* Body Text & Verified Hours */}
          <div className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
            успешно прошел(а) программу стационарного волонтерства <strong>CareFlow Hospital Support Hub</strong>, оказав неоценимую помощь в сопровождении маломобильных пациентов, навигации по отделениям и разгрузке медицинского персонала.
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Подтвержденные часы:</span>
              <span className="text-xl font-extrabold text-emerald-400">{volunteer.totalHours} ч</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Выполнено вызовов:</span>
              <span className="text-xl font-extrabold text-cyan-400">{volunteer.completedTasks}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Рейтинг врачей:</span>
              <span className="text-xl font-extrabold text-amber-400">{volunteer.rating} / 5.0</span>
            </div>
          </div>

          {/* Signatures & Security Hash */}
          <div className="pt-4 flex items-center justify-between text-left text-[10px] text-slate-400 border-t border-slate-800">
            <div>
              <p className="font-bold text-slate-200">Др. Смирнова Е.В.</p>
              <p>Главный координатор волонтерской службы</p>
              <p className="text-[9px] font-mono text-emerald-400 mt-1">ID: CF-CERT-{volunteer.id.toUpperCase()}-2026</p>
            </div>

            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-[8px] uppercase tracking-tighter text-slate-300 font-bold block mt-0.5">
                Digital Verified
              </span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Закрыть
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-glow-teal transition"
          >
            <Printer className="w-4 h-4" />
            <span>Печать / Сохранить в PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
