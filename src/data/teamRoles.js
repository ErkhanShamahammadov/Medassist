export const TEAM_ROLES = [
  {
    id: 'project_lead',
    title: 'Project Lead (Лидер проекта)',
    shortTitle: 'Project Lead',
    count: '1 чел. (Ты)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: 'Crown',
    category: 'Руководство',
    responsibilities: [
      'Руководит проектом и координирует всю команду волонтеров',
      'Разрабатывает стратегию, методологию и план действий',
      'Отвечает за официальную коммуникацию с больницей (главврач, зав. отделениями)',
      'Контролирует операционные результаты, ведение данных и итоговые отчёты',
      'Представляет проект в университете, на конкурсах и научных конференциях'
    ]
  },
  {
    id: 'deputy_lead',
    title: 'Deputy / Co-lead (Заместитель руководителя)',
    shortTitle: 'Co-Lead',
    count: '1 чел.',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: 'Shield',
    category: 'Руководство',
    responsibilities: [
      'Помогает Project Lead во всех организационных и технических задачах',
      'Полноценно замещает лидера в случае его отсутствия',
      'Следит за своевременным выполнением поставленных задач и дедлайнов',
      'Оперативно решает возникающие вопросы и форс-мажоры в ходе смен'
    ]
  },
  {
    id: 'volunteer_coordinator',
    title: 'Volunteer Coordinator (Координатор смен)',
    shortTitle: 'Coordinator',
    count: '1–2 чел.',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    icon: 'Users',
    category: 'Организация',
    responsibilities: [
      'Набирает, распределяет и координирует волонтёров по сменам',
      'Ведёт актуальное расписание, графики дежурств и табель учета',
      'Контролирует своевременный выход на смену и дисциплину',
      'Быстро организует замену волонтеров в случае непредвиденных обстоятельств'
    ]
  },
  {
    id: 'training_officer',
    title: 'Training & Safety Officer (Обучение и безопасность)',
    shortTitle: 'Safety Officer',
    count: '1 чел.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: 'CheckSquare',
    category: 'Обучение & Стандарты',
    responsibilities: [
      'Обучает новых волонтёров: правила стационара, внутренние протоколы, этика',
      'Проводит регулярный инструктаж по санитарии, гигиене и безопасности',
      'Следит за безопасностью пациентов и строгим соблюдением Zero-PII',
      'Проводит краткие тестирования и проверки готовности перед сменой'
    ]
  },
  {
    id: 'patient_assistants',
    title: 'Patient Assistants (Помощники пациентов)',
    shortTitle: 'Patient Assistant',
    count: '4 чел. в отряде',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    icon: 'HeartHandshake',
    category: 'Непосредственная помощь',
    responsibilities: [
      'Помогают пациентам, которые испытывают трудности с самостоятельным передвижением',
      'Сопровождают пациентов по отделениям (кабинеты ЭКГ, УЗИ, МРТ, лаборатории)',
      'Помогают с базовыми потребностями (вода, вещи, навигация в пределах правил)',
      'Оказывают моральную поддержку (доброжелательная беседа, внимание)'
    ]
  },
  {
    id: 'doctor_assistants',
    title: 'Doctor Assistants (Ассистенты врачей)',
    shortTitle: 'Doctor Assistant',
    count: '2 чел.',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: 'Stethoscope',
    category: 'Помощь персоналу',
    responsibilities: [
      'Помогают врачам и старшим медсестрам с организацией работы на постах',
      'Подготавливают журналы и документы (строго по разрешению персонала)',
      'Помогают в логистике отделения (в пределах немедицинских допусков)',
      'Сопровождают врачей во время административных обходов (если разрешено)'
    ]
  },
  {
    id: 'logistics_supplies',
    title: 'Logistics & Supplies (Логистика и снабжение)',
    shortTitle: 'Logistics',
    count: '1 чел.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: 'Package',
    category: 'Обеспечение',
    responsibilities: [
      'Следит за наличием необходимых материалов, бейджей и расходников',
      'Организует получение и доставку материалов по согласованию с куратором',
      'Составляет списки нужных вещей и инвентаря для волонтерского штаба',
      'Обеспечивает идеальный порядок в зоне отдыха и штабе волонтёров'
    ]
  },
  {
    id: 'it_data_team',
    title: 'IT & Data Team (IT-разработка и аналитика)',
    shortTitle: 'IT / Data',
    count: '1 чел.',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    icon: 'Laptop',
    category: 'IT & Data Science',
    responsibilities: [
      'Разрабатывает и поддерживает IT-систему (приложение MedAssist, базу данных)',
      'Собирает данные: количество вызовов, отработанные часы, отзывы врачей',
      'Проводит статистический анализ результатов для научного отчета',
      'Создаёт наглядные дашборды, графики и презентационные материалы'
    ]
  },
  {
    id: 'pr_outreach',
    title: 'PR / Outreach (Медиа и связи с общественностью)',
    shortTitle: 'PR / Outreach',
    count: '1 чел.',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    icon: 'Megaphone',
    category: 'Коммуникации',
    responsibilities: [
      'Рассказывает об успехах волонтерского проекта (в школе, соцсетях, СМИ)',
      'Готовит фотоотчеты, видеоматериалы и информационные заметки',
      'Привлекает новых активных волонтёров в проект',
      'Организует сбор обратной связи и анкетирование персонала и пациентов'
    ]
  }
];

export const WEEKLY_SHIFTS_DATA = [
  {
    shiftId: 'Shift 1',
    day: 'Понедельник (Monday)',
    time: '09:00–12:00',
    patientAssistants: 3,
    doctorAssistants: 1,
    logistics: 0,
    itData: 1,
    coordinator: 0,
    training: 0,
    prOutreach: 0,
    totalVolunteers: 5,
    hours: 3
  },
  {
    shiftId: 'Shift 2',
    day: 'Вторник (Tuesday)',
    time: '09:00–12:00',
    patientAssistants: 3,
    doctorAssistants: 0,
    logistics: 1,
    itData: 0,
    coordinator: 1,
    training: 0,
    prOutreach: 0,
    totalVolunteers: 5,
    hours: 3
  },
  {
    shiftId: 'Shift 3',
    day: 'Среда (Wednesday)',
    time: '09:00–12:00',
    patientAssistants: 2,
    doctorAssistants: 2,
    logistics: 0,
    itData: 1,
    coordinator: 0,
    training: 1,
    prOutreach: 0,
    totalVolunteers: 6,
    hours: 3
  },
  {
    shiftId: 'Shift 4',
    day: 'Четверг (Thursday)',
    time: '09:00–12:00',
    patientAssistants: 3,
    doctorAssistants: 1,
    logistics: 0,
    itData: 0,
    coordinator: 0,
    training: 0,
    prOutreach: 1,
    totalVolunteers: 5,
    hours: 3
  },
  {
    shiftId: 'Shift 5',
    day: 'Пятница (Friday)',
    time: '09:00–13:00',
    patientAssistants: 4,
    doctorAssistants: 0,
    logistics: 1,
    itData: 1,
    coordinator: 0,
    training: 0,
    prOutreach: 0,
    totalVolunteers: 6,
    hours: 4
  },
  {
    shiftId: 'Shift 6',
    day: 'Суббота (Saturday)',
    time: '09:00–14:00',
    patientAssistants: 4,
    doctorAssistants: 1,
    logistics: 1,
    itData: 1,
    coordinator: 1,
    training: 0,
    prOutreach: 0,
    totalVolunteers: 7,
    hours: 5
  }
];

export const SHIFT_TOTALS = {
  patientAssistants: 19,
  doctorAssistants: 5,
  logistics: 2,
  itData: 4,
  coordinator: 2,
  training: 1,
  prOutreach: 1,
  totalVolunteers: 34,
  totalHours: 21
};
