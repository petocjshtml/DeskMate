function createUserSession(userSession) {
   try {
      const serializedSession = JSON.stringify(userSession);
      localStorage.setItem("loginSession", serializedSession);
   } catch (error) {
      console.error("Failed to create login session:", error);
   }
}

function getLoginSession() {
   try {
      const serializedSession = localStorage.getItem("loginSession");
      if (serializedSession === null) {
         return null;
      }
      const session = JSON.parse(serializedSession);
      return session;
   } catch (error) {
      console.error("Failed to retrieve login session:", error);
      return null;
   }
}

function updateUserSession(update_obj) {
   try {
      const serializedSession = localStorage.getItem("loginSession");
      if (serializedSession === null) {
         return;
      }
      const currentSession = JSON.parse(serializedSession);
      const updatedSession = { ...currentSession, ...update_obj };
      const serializedUpdatedSession = JSON.stringify(updatedSession);
      localStorage.setItem("loginSession", serializedUpdatedSession);
   } catch (error) {
      console.error("Failed to update login session:", error);
   }
}

function deleteUserSession() {
   localStorage.removeItem("loginSession");
}

function authSession() {
   try {
      const serializedSession = localStorage.getItem("loginSession");
      if (serializedSession === null) {
         return "isUnlogged"; // session neexistuje
      }
      const session = JSON.parse(serializedSession);
      if (session.isAdmin) {
         return "isAdmin";
      } else {
         return "isUser";
      }
   } catch (error) {
      console.error("Failed to authenticate session:", error);
      return "isUnlogged"; // error - unlogged
   }
}

function checkAdminSession() {
   if (authSession() !== "isAdmin") {
      ShowMainPageHTML();
      return false;
   }
   return true;
}

function checkUserSession() {
   if (authSession() !== "isUser") {
      ShowMainPageHTML();
      return false;
   }
   return true;
}

function checkUnloggedSession() {
   if (authSession() !== "isUnlogged") {
      if (authSession() === "isAdmin") {
         ShowAdminBuildings();
         return false;
      } else {
         //show user pages here
         return false;
      }
   }
   return true;
}
