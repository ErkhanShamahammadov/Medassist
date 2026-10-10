import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_DEPARTMENTS, SAMPLE_VOLUNTEERS, HELP_CATEGORIES } from '../data/defaultData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('requests'); // 'requests', 'volunteers', 'departments', 'analytics'

  // Departments
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem('careflow_departments');
    return saved ? JSON.parse(saved) : DEFAULT_DEPARTMENTS;
  });

  // Volunteers
  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('careflow_volunteers_v2');
    return saved ? JSON.parse(saved) : SAMPLE_VOLUNTEERS;
  });

  // Requests
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('careflow_requests_v2');
    return saved ? JSON.parse(saved) : [];
  });

  // Save changes to localStorage permanently
  useEffect(() => {
    localStorage.setItem('careflow_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('careflow_volunteers_v2', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('careflow_requests_v2', JSON.stringify(requests));
  }, [requests]);

  // 1. Requests CRUD
  const createRequest = useCallback((formData) => {
    const nextNum = requests.length + 1;
    const newReq = {
      id: `№${String(nextNum).padStart(3, '0')}`,
      departmentId: formData.departmentId,
      departmentName: formData.departmentName,
      location: formData.location || 'Пост дежурной сестры',
      helpCategoryId: formData.helpCategoryId,
      helpCategoryTitle: formData.helpCategoryTitle,
      priority: formData.priority || 'Обычный', // 'Срочно', 'Обычный', 'Низкий'
      status: 'NEW', // 'NEW' (Новая), 'ASSIGNED' (Назначен), 'IN_PROGRESS' (В работе), 'COMPLETED' (Выполнена), 'CANCELLED' (Отменена)
      staffName: formData.staffName || 'Дежурный персонал',
      note: formData.note || '',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdDate: new Date().toLocaleDateString('ru-RU'),
      createdTimestamp: Date.now(),
      assignedVolunteerId: null,
      assignedVolunteerName: null,
      assignedAt: null,
      startedAt: null,
      completedAt: null,
      durationMinutes: 0,
      rating: null,
      feedback: null
    };

    setRequests(prev => [newReq, ...prev]);
    return newReq;
  }, [requests.length]);

  const assignVolunteerToRequest = useCallback((requestId, volunteerId) => {
    const vol = volunteers.find(v => v.id === volunteerId);
    if (!vol) return;

    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'ASSIGNED',
          assignedVolunteerId: vol.id,
          assignedVolunteerName: vol.name,
          assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return req;
    }));
  }, [volunteers]);

  const startRequestTask = useCallback((requestId) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: 'IN_PROGRESS',
          startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return req;
    }));
  }, []);

  const completeRequestTask = useCallback((requestId, durationMinutes = 20) => {
    let volId = null;

    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        volId = req.assignedVolunteerId;
        return {
          ...req,
          status: 'COMPLETED',
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          durationMinutes: Number(durationMinutes) || 20
        };
      }
      return req;
    }));

    // Update volunteer total hours
    if (volId) {
      setVolunteers(prev => prev.map(v => {
        if (v.id === volId) {
          const addedHours = Number(((Number(durationMinutes) || 20) / 60).toFixed(1));
          return {
            ...v,
            totalHours: Number((v.totalHours + addedHours).toFixed(1)),
            completedTasks: v.completedTasks + 1
          };
        }
        return v;
      }));
    }

    // Fire celebratory confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  }, []);

  const rateRequest = useCallback((requestId, rating, feedback) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          rating: Number(rating),
          feedback: feedback
        };
      }
      return req;
    }));
  }, []);

  const deleteRequest = useCallback((requestId) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
  }, []);

  // 2. Volunteers CRUD
  const addVolunteer = useCallback((volunteerData) => {
    const newVol = {
      id: `vol-${Date.now()}`,
      name: volunteerData.name.trim(),
      school: volunteerData.school.trim(),
      grade: volunteerData.grade.trim(),
      phone: volunteerData.phone.trim(),
      roleTitle: volunteerData.roleTitle || 'Patient Assistant',
      totalHours: 0,
      completedTasks: 0,
      isOnShift: false,
      shiftStartTime: null,
      joinedDate: new Date().toLocaleDateString('ru-RU')
    };

    setVolunteers(prev => [newVol, ...prev]);
  }, []);

  const updateVolunteer = useCallback((volId, updatedData) => {
    setVolunteers(prev => prev.map(v => (v.id === volId ? { ...v, ...updatedData } : v)));
  }, []);

  const deleteVolunteer = useCallback((volId) => {
    setVolunteers(prev => prev.filter(v => v.id !== volId));
  }, []);

  const toggleVolunteerShift = useCallback((volId) => {
    setVolunteers(prev => prev.map(v => {
      if (v.id === volId) {
        const nextState = !v.isOnShift;
        return {
          ...v,
          isOnShift: nextState,
          shiftStartTime: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null
        };
      }
      return v;
    }));
  }, []);

  // 3. Departments CRUD
  const addDepartment = useCallback((deptData) => {
    const newDept = {
      id: `dept-${Date.now()}`,
      name: deptData.name.trim(),
      building: deptData.building.trim() || 'Главный корпус',
      floor: Number(deptData.floor) || 1,
      headStaff: deptData.headStaff.trim() || 'Дежурный врач'
    };

    setDepartments(prev => [...prev, newDept]);
  }, []);

  const deleteDepartment = useCallback((deptId) => {
    setDepartments(prev => prev.filter(d => d.id !== deptId));
  }, []);

  // 4. Data Management (Clear / Sample / Export)
  const clearAllData = useCallback(() => {
    if (window.confirm('Вы уверены, что хотите полностью очистить все заявки и волонтеров?')) {
      setRequests([]);
      setVolunteers([]);
      localStorage.removeItem('careflow_requests_v2');
      localStorage.removeItem('careflow_volunteers_v2');
    }
  }, []);

  const exportToCSV = useCallback(() => {
    if (requests.length === 0) {
      alert('Нет данных для экспорта. Создайте хотя бы одну заявку.');
      return;
    }

    const headers = [
      'Номер заявки',
      'Дата',
      'Время создания',
      'Отделение',
      'Кабинет / Палата',
      'Тип помощи',
      'Срочность',
      'Статус',
      'Волонтер',
      'Длительность (мин)',
      'Оценка (1-5)',
      'Отзыв'
    ];

    const statusMap = {
      NEW: 'Новая',
      ASSIGNED: 'Назначен волонтер',
      IN_PROGRESS: 'В работе',
      COMPLETED: 'Выполнена',
      CANCELLED: 'Отменена'
    };

    const rows = requests.map(r => [
      `"${r.id}"`,
      `"${r.createdDate || ''}"`,
      `"${r.createdAt || ''}"`,
      `"${r.departmentName || ''}"`,
      `"${r.location || ''}"`,
      `"${r.helpCategoryTitle || ''}"`,
      `"${r.priority || ''}"`,
      `"${statusMap[r.status] || r.status}"`,
      `"${r.assignedVolunteerName || 'Не назначен'}"`,
      r.durationMinutes || 0,
      r.rating || '',
      `"${r.feedback || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map(e => e.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Otchet_Volontery_Bolnitsa_${new Date().toLocaleDateString('ru-RU')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [requests]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        departments,
        volunteers,
        requests,
        createRequest,
        assignVolunteerToRequest,
        startRequestTask,
        completeRequestTask,
        rateRequest,
        deleteRequest,
        addVolunteer,
        updateVolunteer,
        deleteVolunteer,
        toggleVolunteerShift,
        addDepartment,
        deleteDepartment,
        clearAllData,
        exportToCSV
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
