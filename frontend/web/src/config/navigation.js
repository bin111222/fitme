import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  FitnessCenter as FitnessCenterIcon,
  Restaurant as RestaurantIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

export const trainerNavigation = [
  {
    title: 'Dashboard',
    path: '/trainer/dashboard',
    icon: DashboardIcon,
  },
  {
    title: 'Clients',
    path: '/trainer/clients',
    icon: PeopleIcon,
  },
  {
    title: 'Workout Plans',
    path: '/trainer/workout-plans',
    icon: FitnessCenterIcon,
  },
  {
    title: 'Nutrition Plans',
    path: '/trainer/nutrition-plans',
    icon: RestaurantIcon,
  },
  {
    title: 'Progress Tracking',
    path: '/trainer/progress',
    icon: AssessmentIcon,
  },
  {
    title: 'Schedule',
    path: '/trainer/schedule',
    icon: CalendarIcon,
  },
  {
    title: 'Settings',
    path: '/trainer/settings',
    icon: SettingsIcon,
  },
];

export const clientNavigation = [
  {
    title: 'Dashboard',
    path: '/client/dashboard',
    icon: DashboardIcon,
  },
  {
    title: 'My Workouts',
    path: '/client/workouts',
    icon: FitnessCenterIcon,
  },
  {
    title: 'My Nutrition',
    path: '/client/nutrition',
    icon: RestaurantIcon,
  },
  {
    title: 'My Progress',
    path: '/client/progress',
    icon: AssessmentIcon,
  },
  {
    title: 'Schedule',
    path: '/client/schedule',
    icon: CalendarIcon,
  },
  {
    title: 'Settings',
    path: '/client/settings',
    icon: SettingsIcon,
  },
];
