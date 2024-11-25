import { lazy } from 'react';

// Trainer Routes
const TrainerDashboard = lazy(() => import('../pages/trainer/Dashboard'));
const TrainerClients = lazy(() => import('../pages/trainer/Clients'));
const TrainerWorkoutPlans = lazy(() => import('../pages/trainer/WorkoutPlans'));
const TrainerNutritionPlans = lazy(() => import('../pages/trainer/NutritionPlans'));
const TrainerProgress = lazy(() => import('../pages/trainer/Progress'));
const TrainerSchedule = lazy(() => import('../pages/trainer/Schedule'));
const TrainerSettings = lazy(() => import('../pages/trainer/Settings'));

// Client Routes
const ClientDashboard = lazy(() => import('../pages/client/Dashboard'));
const ClientWorkouts = lazy(() => import('../pages/client/MyWorkouts'));
const ClientNutrition = lazy(() => import('../pages/client/MyNutrition'));
const ClientProgress = lazy(() => import('../pages/client/MyProgress'));
const ClientSchedule = lazy(() => import('../pages/client/MySchedule'));
const ClientSettings = lazy(() => import('../pages/client/Settings'));

// Auth Routes
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'));

export const trainerRoutes = [
  {
    path: '/trainer/dashboard',
    component: TrainerDashboard,
    exact: true,
  },
  {
    path: '/trainer/clients',
    component: TrainerClients,
    exact: true,
  },
  {
    path: '/trainer/workout-plans',
    component: TrainerWorkoutPlans,
    exact: true,
  },
  {
    path: '/trainer/nutrition-plans',
    component: TrainerNutritionPlans,
    exact: true,
  },
  {
    path: '/trainer/progress',
    component: TrainerProgress,
    exact: true,
  },
  {
    path: '/trainer/schedule',
    component: TrainerSchedule,
    exact: true,
  },
  {
    path: '/trainer/settings',
    component: TrainerSettings,
    exact: true,
  },
];

export const clientRoutes = [
  {
    path: '/client/dashboard',
    component: ClientDashboard,
    exact: true,
  },
  {
    path: '/client/workouts',
    component: ClientWorkouts,
    exact: true,
  },
  {
    path: '/client/nutrition',
    component: ClientNutrition,
    exact: true,
  },
  {
    path: '/client/progress',
    component: ClientProgress,
    exact: true,
  },
  {
    path: '/client/schedule',
    component: ClientSchedule,
    exact: true,
  },
  {
    path: '/client/settings',
    component: ClientSettings,
    exact: true,
  },
];

export const authRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/register',
    component: Register,
    exact: true,
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    exact: true,
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    exact: true,
  },
];
