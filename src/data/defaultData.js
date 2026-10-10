export const DEFAULT_DEPARTMENTS = [
  {
    id: 'dept-1',
    name: 'Кардиология',
    building: 'Корпус А',
    floor: 3,
    headStaff: 'Др. Смирнова Е.В.'
  },
  {
    id: 'dept-2',
    name: 'Терапия',
    building: 'Корпус А',
    floor: 2,
    headStaff: 'Др. Иванов П.С.'
  },
  {
    id: 'dept-3',
    name: 'Хирургическое отделение',
    building: 'Корпус Б',
    floor: 2,
    headStaff: 'Др. Ахмедов Б.С.'
  },
  {
    id: 'dept-4',
    name: 'Лучевая диагностика (МРТ / КТ / Рентген)',
    building: 'Диагностический центр',
    floor: 1,
    headStaff: 'Зав. лаб. Попова М.И.'
  },
  {
    id: 'dept-5',
    name: 'Травматология и ортопедия',
    building: 'Корпус Б',
    floor: 1,
    headStaff: 'Др. Васильев Д.Н.'
  },
  {
    id: 'dept-6',
    name: 'Приемное отделение',
    building: 'Главный вход',
    floor: 1,
    headStaff: 'Дежурный администратор'
  }
];

export const HELP_CATEGORIES = [
  {
    id: 'escort',
    title: 'Сопровождение пациента',
    icon: 'UserCheck',
    description: 'Встретить пациента и проводить в кабинет, на УЗИ/МРТ или к выходу'
  },
  {
    id: 'wheelchair',
    title: 'Транспортировка на коляске',
    icon: 'Accessibility',
    description: 'Перемещение маломобильного пациента между отделениями'
  },
  {
    id: 'docs',
    title: 'Доставка документов / анализов',
    icon: 'FileText',
    description: 'Передача выписок, направлений или результатов из лаборатории'
  },
  {
    id: 'chat',
    title: 'Беседа и поддержка',
    icon: 'Smile',
    description: 'Чтение, разговор с одиноким пациентом, помощь со звонком'
  },
  {
    id: 'meal',
    title: 'Помощь с водой / питанием',
    icon: 'Coffee',
    description: 'Подача воды, чая, помощь в палате под присмотром медсестры'
  },
  {
    id: 'other',
    title: 'Другая помощь персоналу',
    icon: 'Package',
    description: 'Организация раздаточных материалов, раскладка белья и т.д.'
  }
];

// Starter demo data if user wants to pre-populate with 1 click
export const SAMPLE_VOLUNTEERS = [
  {
    id: 'vol-1',
    name: 'Арман Сериков',
    school: 'Лицей №28',
    grade: '11 "А"',
    phone: '+7 701 123-45-67',
    totalHours: 12.5,
    completedTasks: 14,
    isOnShift: true,
    shiftStartTime: '12:00',
    joinedDate: '01.09.2026'
  },
  {
    id: 'vol-2',
    name: 'Алина Мустафина',
    school: 'Гимназия №15',
    grade: '10 "Б"',
    phone: '+7 777 987-65-43',
    totalHours: 8.0,
    completedTasks: 9,
    isOnShift: false,
    shiftStartTime: null,
    joinedDate: '05.09.2026'
  }
];
