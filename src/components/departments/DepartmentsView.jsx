import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Plus, Trash2, MapPin, User, CheckCircle2 } from 'lucide-react';

export const DepartmentsView = () => {
  const { departments, addDepartment, deleteDepartment, requests } = useApp();

  const [name, setName] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('1');
  const [headStaff, setHeadStaff] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addDepartment({
      name,
      building: building || 'Главный корпус',
      floor: Number(floor) || 1,
      headStaff: headStaff || 'Дежурный врач'
    });

    setName('');
    setBuilding('');
    setFloor('1');
    setHeadStaff('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-5">
      
      {/* Header bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Отделения больницы ({departments.length})
          </h3>
          <p className="text-xs text-slate-500">
            Список отделений стационара, куда волонтеры направляются на помощь
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? 'Скрыть форму' : 'Добавить отделение'}</span>
        </button>
      </div>

      {/* Add Department Inline Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-sky-200 shadow-sm space-y-3 animate-in fade-in">
          <h4 className="text-sm font-bold text-slate-900">
            Новое отделение больницы
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Название отделения *
              </label>
              <input
                type="text"
                required
                placeholder="напр. Педиатрия"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Корпус
              </label>
              <input
                type="text"
                placeholder="напр. Корпус В"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Этаж
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Заведующий / Врач
              </label>
              <input
                type="text"
                placeholder="напр. Др. Ибрагимова З.К."
                value={headStaff}
                onChange={(e) => setHeadStaff(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              Сохранить отделение
            </button>
          </div>
        </form>
      )}

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => {
          const deptReqs = requests.filter(r => r.departmentId === dept.id);
          const activeDeptReqs = deptReqs.filter(r => r.status !== 'COMPLETED').length;

          return (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>

                  <div className="flex items-center space-x-1">
                    {activeDeptReqs > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                        {activeDeptReqs} активн.
                      </span>
                    )}
                    <button
                      onClick={() => {
                        if (window.confirm(`Удалить отделение "${dept.name}"?`)) {
                          deleteDepartment(dept.id);
                        }
                      }}
                      className="text-slate-300 hover:text-rose-600 p-1 rounded transition"
                      title="Удалить отделение"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900">
                  {dept.name}
                </h4>

                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
                  <span>{dept.building}, Этаж {dept.floor}</span>
                </p>

                <p className="text-xs text-slate-500 mt-1 flex items-center">
                  <User className="w-3.5 h-3.5 text-slate-400 mr-1 flex-shrink-0" />
                  <span>Ответственный: {dept.headStaff}</span>
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Всего вызовов в отделение:</span>
                <strong className="text-slate-900 font-bold">{deptReqs.length}</strong>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
