import { unstable_HistoryRouter as HistoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Routes Configuration
import { trainerRoutes, clientRoutes, authRoutes } from './config/routes';

// Loading Component
import LoadingScreen from './components/common/LoadingScreen';

const history = createBrowserHistory();

const App = () => {
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  // Helper function to get the appropriate redirect path
  const getRedirectPath = () => {
    if (!isAuthenticated || !user?.role) {
      return '/login';
    }
    return `/${user.role}/dashboard`;
  };

  return (
    <HistoryRouter history={history}>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            {authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  !isAuthenticated ? (
                    <route.component />
                  ) : (
                    <Navigate to={getRedirectPath()} replace />
                  )
                }
              />
            ))}
          </Route>

          {/* Trainer Routes */}
          <Route
            path="/trainer/*"
            element={
              isAuthenticated && user?.role === 'trainer' ? (
                <DashboardLayout>
                  <Routes>
                    {trainerRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path.replace('/trainer/', '')}
                        element={<route.component />}
                      />
                    ))}
                  </Routes>
                </DashboardLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Client Routes */}
          <Route
            path="/client/*"
            element={
              isAuthenticated && user?.role === 'client' ? (
                <DashboardLayout>
                  <Routes>
                    {clientRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path.replace('/client/', '')}
                        element={<route.component />}
                      />
                    ))}
                  </Routes>
                </DashboardLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Redirect root to appropriate dashboard or login */}
          <Route
            path="/"
            element={<Navigate to={getRedirectPath()} replace />}
          />

          {/* Catch all route */}
          <Route
            path="*"
            element={<Navigate to={getRedirectPath()} replace />}
          />
        </Routes>
      </Suspense>
    </HistoryRouter>
  );
};

export default App;