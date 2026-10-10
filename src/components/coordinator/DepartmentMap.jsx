import React, { useState } from 'react';
import { DEPARTMENTS } from '../../data/departments';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  UserCheck, 
  AlertCircle, 
  Layers, 
  Navigation, 
  Activity, 
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const DepartmentMap = () => {
  const { requests, volunteers, assignVolunteer } = useApp();
  const [selectedFloor, setSelectedFloor] = useState('ALL');
  const [selectedDeptId, setSelectedDeptId] = useState(null);

  const floors = [
    { id: 'ALL', label: 'Все корпуса & этажи' },
    { id: 1, label: '1 Этаж (Приемное / Травма / КТ)' },
    { id: 2, label: '2 Этаж (Хирургия / ЛФК)' },
    { id: 3, label: '3 Этаж (Кардиология / Педиатрия)' },
    { id: 4, label: '4 Этаж (Неврология)' },
  ];

  const filteredDepts = DEPARTMENTS.filter(d => {
    if (selectedFloor === 'ALL') return true;
    return d.floor === selectedFloor;
  });

  const selectedDept = DEPARTMENTS.find(d => d.id === selectedDeptId);

  // Department requests
  const deptRequests = requests.filter(r => r.departmentId === selectedDeptId);
  const deptVolunteers = volunteers.filter(v => v.departmentId === selectedDeptId && v.status === 'ACTIVE_SHIFT');

  return (
    <div className="space-y-6">
      
      {/* Floor Filter Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
          {floors.map((fl) => (
            <button
              key={fl.id}
              onClick={() => setSelectedFloor(fl.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedFloor === fl.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {fl.label}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 flex items-center space-x-2">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            <span className="text-rose-300">Срочный вызов</span>
          </span>
          <span className="flex items-center space-x-1 ml-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-emerald-300">Волонтер на этаже</span>
          </span>
        </div>
      </div>

      {/* 2.5D Hospital Floor Canvas / Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map Plane */}
        <div className="lg:col-span-2 relative min-h-[460px] rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800 p-6 overflow-hidden shadow-2xl">
          
          {/* Blueprint Grid Lines */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.4) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Compass / Orientation */}
          <div className="absolute top-4 left-4 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 flex items-center space-x-1.5">
            <Navigation className="w-3.5 h-3.5 text-cyan-400" />
            <span>Северный корпус • Главный вход</span>
          </div>

          {/* Interactive Department Zones */}
          <div className="relative w-full h-full min-h-[380px] flex items-center justify-center">
            <div className="w-full max-w-xl grid grid-cols-2 sm:grid-cols-3 gap-3.5 my-auto">
              {filteredDepts.map((dept) => {
                const activeReqsInDept = requests.filter(r => r.departmentId === dept.id && r.status !== 'COMPLETED');
                const hasUrgent = activeReqsInDept.some(r => r.priority === 'URGENT');
                const activeVolsInDept = volunteers.filter(v => v.departmentId === dept.id && v.status === 'ACTIVE_SHIFT');
                const isSelected = selectedDeptId === dept.id;

                return (
                  <div
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`cursor-pointer group relative p-4 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-400 ring-2 ring-cyan-500/40 shadow-glow-cyan transform -translate-y-1'
                        : hasUrgent
                        ? 'bg-rose-950/30 border-rose-500/50 hover:border-rose-400 animate-pulse'
                        : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    {/* Corner badges */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
                        {dept.building} • {dept.floor} эт.
                      </span>

                      {activeReqsInDept.length > 0 && (
                        <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                          hasUrgent ? 'bg-rose-500 text-white animate-bounce' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {activeReqsInDept.length} заяв.
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-cyan-300 transition-colors">
                      {dept.name}
                    </h4>
                    
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                      {dept.headStaff}
                    </p>

                    {/* Volunteers present indicator */}
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500">Волонтеры:</span>
                      {activeVolsInDept.length > 0 ? (
                        <span className="text-emerald-400 font-semibold flex items-center">
                          <UserCheck className="w-3 h-3 mr-1" />
                          {activeVolsInDept.length} на посту
                        </span>
                      ) : (
                        <span className="text-slate-600">Свободно</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Department Details Drawer */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
          {selectedDept ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  Выбранное отделение
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">
                  {selectedDept.name}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedDept.building}, Этаж {selectedDept.floor} • Ответственный: {selectedDept.headStaff}
                </p>
              </div>

              {/* Active Requests in this Department */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                  <span>Заявки отделения</span>
                  <span className="text-slate-400 text-[11px] font-normal">{deptRequests.length} всего</span>
                </h5>

                {deptRequests.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/60 text-center text-xs text-slate-500">
                    Нет активных заявок в этом отделении.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {deptRequests.map((r) => (
                      <div
                        key={r.id}
                        className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-slate-300">{r.id}</span>
                          <span className={`text-[10px] font-bold ${r.status === 'COMPLETED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {r.status}
                          </span>
                        </div>
                        <p className="font-medium text-slate-200 text-xs">{r.helpTitle}</p>
                        <p className="text-[10px] text-slate-400 italic">"{r.staffNote}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Volunteers on this floor */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Волонтеры поблизости
                </h5>
                <div className="space-y-1.5">
                  {volunteers.filter(v => v.status === 'ACTIVE_SHIFT').map(v => (
                    <div
                      key={v.id}
                      className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <img src={v.avatar} alt={v.name} className="w-6 h-6 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-slate-200 text-xs">{v.name}</p>
                          <p className="text-[10px] text-slate-500">{v.currentLocation}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">
                        {v.rating}★
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <Layers className="w-10 h-10 text-slate-600 mb-3" />
              <p className="text-xs font-medium">
                Нажмите на любое отделение на карте, чтобы просмотреть дислокацию волонтеров и активные заявки.
              </p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800 text-center">
            <span className="text-[10px] text-slate-500">
              Данные обновляются в реальном времени каждые 5 сек.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
