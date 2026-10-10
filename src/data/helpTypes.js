export const HELP_TYPES = [
  {
    id: 'navigation',
    title: 'Навигация и сопровождение',
    titleEn: 'Patient Escort & Navigation',
    icon: 'Compass',
    estimatedMinutes: 20,
    badgeColor: 'emerald',
    description: 'Встретить пациента у входа/отделения и проводить на диагностику (МРТ, УЗИ, кабинет врача, выписка).',
    urgencyDefault: 'NORMAL',
    category: 'escort'
  },
  {
    id: 'wheelchair',
    title: 'Транспортировка на кресле-коляске',
    titleEn: 'Wheelchair Transport',
    icon: 'Accessibility',
    estimatedMinutes: 25,
    badgeColor: 'cyan',
    description: 'Помощь маломобильному пациенту при перемещении между корпусами и процедурными кабинетами.',
    urgencyDefault: 'HIGH',
    category: 'mobility'
  },
  {
    id: 'docs_dispatch',
    title: 'Доставка анализов / документов',
    titleEn: 'Lab Samples & Doc Dispatch',
    icon: 'FileText',
    estimatedMinutes: 15,
    badgeColor: 'blue',
    description: 'Быстрая и бережная доставка направлений, выписок или готовых результатов анализов из лаборатории.',
    urgencyDefault: 'HIGH',
    category: 'logistics'
  },
  {
    id: 'companionship',
    title: 'Общение и моральная поддержка',
    titleEn: 'Patient Companionship & Reading',
    icon: 'Smile',
    estimatedMinutes: 45,
    badgeColor: 'violet',
    description: 'Чтение книг, беседа с одинокими или тревожными пациентами, помощь с гаджетом/звонком близким.',
    urgencyDefault: 'LOW',
    category: 'care'
  },
  {
    id: 'meal_support',
    title: 'Помощь с приемом пищи / воды',
    titleEn: 'Meal & Hydration Support',
    icon: 'Coffee',
    estimatedMinutes: 30,
    badgeColor: 'amber',
    description: 'Подача воды, чая, помощь в открытии ланч-боксов и кормлении под присмотром дежурной медсестры.',
    urgencyDefault: 'NORMAL',
    category: 'care'
  },
  {
    id: 'ward_assist',
    title: 'Помощь персоналу в палате',
    titleEn: 'Ward & Supply Organization',
    icon: 'Package',
    estimatedMinutes: 25,
    badgeColor: 'rose',
    description: 'Раскладка чистого белья, доставка упаковок гигиенических средств, организация зоны отдыха.',
    urgencyDefault: 'LOW',
    category: 'support'
  }
];
