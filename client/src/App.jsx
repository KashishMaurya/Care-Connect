import { Routes, Route } from "react-router-dom";
import { SuperTokensWrapper } from "supertokens-auth-react";
import SuperTokens from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";

// pages
import LandingPage from "./pages/LandingPage";
import LearnMore from "./pages/LearnMore";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import ProfilePublicView from "./pages/ProfilePublicView"; 

// SuperTokens init
SuperTokens.init({
  appInfo: {
    appName: "CareConnect",
    apiDomain: "http://localhost:5000", // backend
    websiteDomain: "http://localhost:5173", // frontend
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init({
      getRedirectionURL: async (context) => {
        if (context.action === "SUCCESS") {
          return "/dashboard"; // redirect here after login/signup
        }
        return undefined;
      },
    }),
    Session.init(),
  ],
});

function App() {
  const superTokensRoutes = getSuperTokensRoutesForReactRouterDom(
    reactRouterDom,
    [EmailPasswordPreBuiltUI],
  );

  return (
    <SuperTokensWrapper>
      <Routes>
        {/* SuperTokens Auth Routes */}
        {superTokensRoutes.map((route, i) => (
          <Route key={i} {...route.props} />
        ))}
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/profile/:id" element={<ProfilePublicView />} />

        {/* Protected Routes using SessionAuth */}
        <Route
          path="/dashboard"
          element={
            <SessionAuth>
              <Dashboard />
            </SessionAuth>
          }
        />
        <Route
          path="/create-profile"
          element={
            <SessionAuth>
              <CreateProfile />
            </SessionAuth>
          }
        />
        <Route
          path="/edit-profile/:id"
          element={
            <SessionAuth>
              <EditProfile />
            </SessionAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <SessionAuth>
              <Settings />
            </SessionAuth>
          }
        />
      </Routes>
    </SuperTokensWrapper>
  );
}

export default App;
