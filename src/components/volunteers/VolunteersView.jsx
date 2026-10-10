import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TEAM_ROLES, WEEKLY_SHIFTS_DATA, SHIFT_TOTALS } from '../../data/teamRoles';
import { 
  UserPlus, 
  Users, 
  Clock, 
  Award, 
  Phone, 
  School, 
  Power, 
  Trash2, 
  Calendar,
  Shield,
  Crown,
  CheckSquare,
  HeartHandshake,
  Stethoscope,
  Package,
  Laptop,
  Megaphone,
  CheckCircle2,
  ChevronRight,
  Printer
} from 'lucide-react';
import { AddVolunteerModal } from './AddVolunteerModal';
import { VolunteerCertificateModal } from './VolunteerCertificateModal';

const iconMap = {
  Crown,
  Shield,
  Users,
  CheckSquare,
  HeartHandshake,
  Stethoscope,
  Package,
  Laptop,
  Megaphone
};

export const VolunteersView = () => {
  const { volunteers, toggleVolunteerShift, deleteVolunteer } = useApp();
  const [activeVolunteerSubTab, setActiveVolunteerSubTab] = useState('roster'); // 'roster', 'schedule', 'roles'
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedVolunteerForCert, setSelectedVolunteerForCert] = useState(null);

  const totalVolunteers = volunteers.length;
  const onShiftVolunteers = volunteers.filter(v => v.isOnShift).length;
  const totalSquadHours = volunteers.reduce((acc, v) => acc + (Number(v.totalHours) || 0), 0).toFixed(1);
  const totalSquadTasks = volunteers.reduce((acc, v) => acc + (Number(v.completedTasks) || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Top summary stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Всего в отряде:</span>
          <span className="text-xl font-bold text-slate-900">{totalVolunteers} чел.</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Сейчас на смене:</span>
          <span className="text-xl font-bold text-emerald-600">{onShiftVolunteers} чел.</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Наработано часов:</span>
          <span className="text-xl font-bold text-sky-700">{totalSquadHours} ч</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 block">Смен в неделю:</span>
          <span className="text-xl font-bold text-indigo-700">6 смен / 21 ч</span>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'roster', label: 'Список отряда и смены', icon: Users },
            { id: 'schedule', label: 'Таблица по сменам', icon: Calendar },
            { id: 'roles', label: 'Описание 9 ролей команды', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeVolunteerSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveVolunteerSubTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeVolunteerSubTab === 'roster' && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>Добавить волонтера</span>
          </button>
        )}

        {activeVolunteerSubTab === 'schedule' && (
          <button
            onClick={() => window.print()}
            className="no-print flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <Printer className="w-4 h-4" />
            <span>Печать графика смен</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. SUB-TAB: ROSTER (Список волонтеров) */}
      {/* ========================================================================= */}
      {activeVolunteerSubTab === 'roster' && (
        <div className="space-y-4">
          {volunteers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Список волонтеров пуст</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Добавьте ребят из школы или лицея, чтобы распределять на них вызовы и считать подтвержденные часы.
              </p>
              <button
                onClick={() => setIsAddOpen(true)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Добавить первого волонтера</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {volunteers.map((vol) => (
                <div
                  key={vol.id}
                  className={`bg-white rounded-2xl border p-4 shadow-sm flex flex-col justify-between transition ${
                    vol.isOnShift ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          vol.isOnShift ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {vol.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{vol.name}</h4>
                          <p className="text-xs text-slate-500">{vol.school} • {vol.grade}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (window.confirm(`Удалить волонтера ${vol.name}?`)) {
                            deleteVolunteer(vol.id);
                          }
                        }}
                        className="text-slate-300 hover:text-rose-600 p-1 rounded transition"
                        title="Удалить волонтера"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Contact & Shift info */}
                    <div className="mt-3 text-xs text-slate-500 space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{vol.phone}</span>
                      </div>
                      {vol.roleTitle && (
                        <div className="text-[11px] font-medium text-sky-700">
                          Роль: {vol.roleTitle}
                        </div>
                      )}
                    </div>

                    {/* Shift status */}
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          vol.isOnShift
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${vol.isOnShift ? 'bg-emerald-600' : 'bg-slate-400'}`}></span>
                        <span>{vol.isOnShift ? `На смене (с ${vol.shiftStartTime || '—'})` : 'Смена закрыта'}</span>
                      </span>
                    </div>

                    {/* Metrics */}
                    <div className="mt-3 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Часов работы:</span>
                        <strong className="text-sky-700 font-bold text-sm">{vol.totalHours} ч</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Задач выполнено:</span>
                        <strong className="text-slate-900 font-bold text-sm">{vol.completedTasks}</strong>
                      </div>
                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => toggleVolunteerShift(vol.id)}
                      className={`flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition ${
                        vol.isOnShift
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      <span>{vol.isOnShift ? 'Завершить смену' : 'Выйти на смену'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedVolunteerForCert(vol)}
                      className="flex items-center justify-center space-x-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      <span>Сертификат</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SUB-TAB: SHIFT SCHEDULE TABLE (Таблица по сменам) */}
      {/* ========================================================================= */}
      {activeVolunteerSubTab === 'schedule' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Таблица распределения волонтеров по сменам
              </h3>
              <p className="text-xs text-slate-500">
                Еженедельный график дежурств: 6 смен в неделю, 34 волонтеро-выхода, 21 операционный час
              </p>
            </div>

            <div className="flex items-center space-x-2 text-xs">
              <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 font-semibold border border-sky-100">
                34 чел./нед.
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                21 ч/нед.
              </span>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-semibold">
                  <th className="py-3 px-3">Смена</th>
                  <th className="py-3 px-3">День недели</th>
                  <th className="py-3 px-3">Время</th>
                  <th className="py-3 px-2 text-center text-teal-800">Patient Assistants</th>
                  <th className="py-3 px-2 text-center text-blue-800">Doctor Assistants</th>
                  <th className="py-3 px-2 text-center text-amber-800">Logistics</th>
                  <th className="py-3 px-2 text-center text-cyan-800">IT / Data</th>
                  <th className="py-3 px-2 text-center text-sky-800">Coordinator</th>
                  <th className="py-3 px-2 text-center text-emerald-800">Training</th>
                  <th className="py-3 px-2 text-center text-rose-800">PR / Outreach</th>
                  <th className="py-3 px-3 text-center font-bold text-slate-900 bg-slate-200/50">Итого волонтеров</th>
                  <th className="py-3 px-3 text-center font-bold text-sky-800 bg-sky-100/50">Часы</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {WEEKLY_SHIFTS_DATA.map((row) => (
                  <tr key={row.shiftId} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">{row.shiftId}</td>
                    <td className="py-3 px-3 font-medium whitespace-nowrap">{row.day}</td>
                    <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">{row.time}</td>
                    <td className="py-3 px-2 text-center font-semibold text-teal-700">{row.patientAssistants || '—'}</td>
                    <td className="py-3 px-2 text-center font-semibold text-blue-700">{row.doctorAssistants || '—'}</td>
                    <td className="py-3 px-2 text-center font-semibold text-amber-700">{row.logistics || '—'}</td>
                    <td className="py-3 px-2 text-center font-semibold text-cyan-700">{row.itData || '—'}</td>
                    <td className="py-3 px-2 text-center font-semibold text-sky-700">{row.coordinator || '—'}</td>
                    <td className="py-3 px-2 text-center font-semibold text-emerald-700">{row.training || '—'}</td>
                    <td className="py-3 px-2 text-center font-semibold text-rose-700">{row.prOutreach || '—'}</td>
                    <td className="py-3 px-3 text-center font-bold text-slate-900 bg-slate-50">{row.totalVolunteers} чел.</td>
                    <td className="py-3 px-3 text-center font-bold text-sky-700 bg-sky-50/40">{row.hours} ч</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-900 text-white font-bold border-t-2 border-slate-900">
                  <td colSpan={3} className="py-3 px-3 text-left">
                    Итого за неделю (Total / week)
                  </td>
                  <td className="py-3 px-2 text-center text-teal-300">{SHIFT_TOTALS.patientAssistants}</td>
                  <td className="py-3 px-2 text-center text-blue-300">{SHIFT_TOTALS.doctorAssistants}</td>
                  <td className="py-3 px-2 text-center text-amber-300">{SHIFT_TOTALS.logistics}</td>
                  <td className="py-3 px-2 text-center text-cyan-300">{SHIFT_TOTALS.itData}</td>
                  <td className="py-3 px-2 text-center text-sky-300">{SHIFT_TOTALS.coordinator}</td>
                  <td className="py-3 px-2 text-center text-emerald-300">{SHIFT_TOTALS.training}</td>
                  <td className="py-3 px-2 text-center text-rose-300">{SHIFT_TOTALS.prOutreach}</td>
                  <td className="py-3 px-3 text-center text-amber-300 bg-slate-800">{SHIFT_TOTALS.totalVolunteers} выходов</td>
                  <td className="py-3 px-3 text-center text-emerald-300 bg-slate-800">{SHIFT_TOTALS.totalHours} ч</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <strong className="text-slate-900 block">💡 Пояснение к графику смен:</strong>
            <p>
              Основной упор сделан на <strong>Patient Assistants</strong> (19 выходов за неделю) для постоянного сопровождения маломобильных пациентов на обследования (МРТ, УЗИ, рентген). Смены в пятницу (4 ч) и субботу (5 ч) усилены ввиду повышенного потока на выписку и плановые госпитализации.
            </p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SUB-TAB: 9 TEAM ROLES (Описание ролей) */}
      {/* ========================================================================= */}
      {activeVolunteerSubTab === 'roles' && (
        <div className="space-y-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
              Организационная структура команды (9 ролей)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Четкое разделение зон ответственности позволяет эффективно масштабировать волонтерскую работу в стационаре
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM_ROLES.map((role, idx) => {
              const IconComponent = iconMap[role.icon] || Shield;
              return (
                <div
                  key={role.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between space-y-3 hover:border-slate-300 transition"
                >
                  <div>
                    
                    {/* Role Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <IconComponent className="w-5 h-5 text-sky-600" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block">
                            Роль №{idx + 1} • {role.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug">
                            {role.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Count Pill */}
                    <div className="mb-3">
                      <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${role.badgeColor}`}>
                        {role.count}
                      </span>
                    </div>

                    {/* Responsibilities list */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Обязанности:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {role.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0"></span>
                            <span className="leading-snug">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  <div className="pt-2 text-[10px] text-slate-400 italic">
                    Зона ответственности: {role.category}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Modals */}
      <AddVolunteerModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      
      <VolunteerCertificateModal
        volunteer={selectedVolunteerForCert}
        isOpen={Boolean(selectedVolunteerForCert)}
        onClose={() => setSelectedVolunteerForCert(null)}
      />

    </div>
  );
};
