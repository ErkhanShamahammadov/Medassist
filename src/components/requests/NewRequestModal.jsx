import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HELP_CATEGORIES } from '../../data/defaultData';
import { 
  X, 
  Plus, 
  Send, 
  Clock, 
  Building2, 
  AlertCircle,
  UserCheck,
  Accessibility,
  FileText,
  Smile,
  Coffee,
  Package
} from 'lucide-react';

const iconMap = {
  UserCheck,
  Accessibility,
  FileText,
  Smile,
  Coffee,
  Package
};

export const NewRequestModal = ({ isOpen, onClose }) => {
  const { departments, createRequest } = useApp();

  const [selectedDeptId, setSelectedDeptId] = useState(departments[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState(HELP_CATEGORIES[0]?.id || 'escort');
  const [priority, setPriority] = useState('Обычный');
  const [location, setLocation] = useState('');
  const [staffName, setStaffName] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const dept = departments.find(d => d.id === selectedDeptId) || departments[0] || { id: 'other', name: 'Общее отделение' };
    const cat = HELP_CATEGORIES.find(c => c.id === selectedCategory) || HELP_CATEGORIES[0];

    createRequest({
      departmentId: dept.id,
      departmentName: dept.name,
      location: location.trim() || 'Пост дежурной сестры',
      helpCategoryId: cat.id,
      helpCategoryTitle: cat.title,
      priority,
      staffName: staffName.trim() || 'Дежурный врач/сестра',
      note: note.trim()
    });

    // Reset fields
    setLocation('');
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Новая заявка на помощь
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Укажите, какая немедицинская помощь требуется в отделении
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* 1. Тип помощи */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
              1. Что нужно сделать?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {HELP_CATEGORIES.map((cat) => {
                const IconComponent = iconMap[cat.icon] || Package;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-start p-2.5 rounded-xl border text-left transition ${
                      isSelected
                        ? 'bg-sky-50 border-sky-600 ring-1 ring-sky-600 text-sky-950'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 mt-0.5 mr-2 flex-shrink-0 ${isSelected ? 'text-sky-600' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-xs font-semibold leading-snug">{cat.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">{cat.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Отделение и палата */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                2. Отделение больницы
              </label>
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.building}, {d.floor} эт.)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Кабинет / Палата / Пост
              </label>
              <input
                type="text"
                placeholder="напр. Палата 304 или каб. МРТ"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* 3. Срочность */}
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
              3. Срочность
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Срочно', label: '🔴 Срочно (< 10 мин)' },
                { id: 'Обычный', label: '🟡 Обычный (плановый)' },
                { id: 'Низкий', label: '🟢 В течение смены' }
              ].map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setPriority(p.id)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium border text-center transition ${
                    priority === p.id
                      ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Врач / Медсестра и Комментарий */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                ФИО врача / медсестры
              </label>
              <input
                type="text"
                placeholder="напр. Др. Смирнова Е.В."
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-600 mb-1">
                Примечание для волонтера
              </label>
              <input
                type="text"
                placeholder="напр. Проводить на ЭКГ на 1 этаж"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Privacy note */}
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800">
            🔒 <strong>Безопасность:</strong> Не указывайте диагнозы и фамилии пациентов. Используются только обезличенные номера заявок.
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition"
            >
              <Send className="w-4 h-4" />
              <span>Создать заявку</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
