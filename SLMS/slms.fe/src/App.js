import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/user/HomePage";
import Login from "./components/user/account/Login";
import Register from "./components/user/account/Register";
import ForgotPassWord from "./components/user/account/ForgotPassWord";
import Notifications from "./components/user/account/Notifications";
import { ToastContainer } from "react-toastify";
import CreateLeague from "./components/user/league/CreateLeague";
import { ProtectedRoute } from "./services/ProtectedRoute";
import MyLeague from "./components/user/account/MyLeague";
import Leagues from "./components/user/league/leagues";
import LeagueDashBoard from "./components/user/league/LeagueDashBoard";
import UpdateLeague from "./components/user/league/UpdateLeague";
import Profile from "../src/components/user/account/Profile"
import ResetPassword from "./components/user/account/reset/ResetPassword";
import ManageTeamLeague from "./components/user/league/ManageTeamLeague";
import OptionLeague from "./components/user/league/OptionLeague";
import TableRanking from "./components/user/league/TableRanking";
import DetailsTeams from "./components/user/league/DetailsTeams";
import MyCompetitor from "./components/user/account/MyCompetitor";
import CreateSquad from "./components/user/lineup/CreateSquad";
import CreateTeam from "./components/user/competitor/CreateTeam";
import 'bootstrap/dist/css/bootstrap.min.css'
import CalendarLeague from "./components/user/league/CalendarLeague";
import StatisticsLeague from "./components/user/league/StatisticsLeague";
import ProfileTeam from "./components/user/competitor/ProfileTeam";
import UpdateTeam from "./components/user/competitor/UpdateTeam";
import StatisticTeam from "./components/user/competitor/StatisticTeam";
import ViewPlayer from "./components/user/competitor/ViewPlayer";
import PlayerInfomation from "./components/user/player/PlayerInfomation";
import LineupTeam from "./components/user/competitor/LineupTeam";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import ChangePassword from "./components/user/account/ChangePassword";
import PrizeLeague from "./components/user/league/PrizeLeague";
import EnterOtp from "./components/user/account/EnterOtp";
import CountdownTimer from "./components/user/league/CountdownTimer";


function App() {
  return (
    <>
      <Router>
        {/* Đây là chuyển hướng nhé */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/forgotpassword" element={<ForgotPassWord />} />
          <Route path="/account/email-authentication/:email" element={<EnterOtp />} />
          <Route path="/account/changepassword/:encodeEmail" element={<ChangePassword />} />
          <Route path="/account/notifications" element={<Notifications />} />
          <Route path="/account/myleague" element={
            <ProtectedRoute>
              <MyLeague />
            </ProtectedRoute>
          } />

          <Route path="/account/mycompetitor" element={
            <ProtectedRoute>
              <MyCompetitor />
            </ProtectedRoute>

          } />
          <Route path="/competitor/:userId/:id/profile" element={
            <ProtectedRoute>
              <ProfileTeam />
            </ProtectedRoute>
          } />
          <Route path="/competitor/:userId/:id/lineup" element={
            <ProtectedRoute>
              <LineupTeam />
            </ProtectedRoute>
          } />
          <Route path="/competitor/:userId/:id/settingteam" element={
            <ProtectedRoute>
              <UpdateTeam />
            </ProtectedRoute>
          } />
          <Route path="/competitor/:userId/:id/statistic" element={
            <ProtectedRoute>
              <StatisticTeam />
            </ProtectedRoute>
          } />
          <Route path="/competitor/:userId/:id/player" element={
            <ProtectedRoute>
              <ViewPlayer />
            </ProtectedRoute>

          } />

          <Route path="/mycompetitor/create" element={
            <ProtectedRoute>
              <CreateTeam />
            </ProtectedRoute>

          } />

          <Route path="/account/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />

          <Route path="/account/resetpassword" element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>} />

          <Route path="/league/create-league" element={
            <ProtectedRoute>
              <CreateLeague />
            </ProtectedRoute>} />

          <Route path="/league/leagues" element={
            <ProtectedRoute>
              <Leagues />
            </ProtectedRoute>} />

          <Route path="/league/dashboard/:id/:idLeague" element={
            <ProtectedRoute>
              <LeagueDashBoard />
            </ProtectedRoute>
          } />

          <Route path="/league/:organizerId/dashboard/:idLeague" element={
            <ProtectedRoute>
              <CountdownTimer />
            </ProtectedRoute>
          } />

          <Route path="/league/dashboard/:id/:idLeague/settingleague" element={
            <ProtectedRoute>
              <UpdateLeague />
            </ProtectedRoute>} />
          <Route path="/league/dashboard/:id/:idLeague/prizes" element={
            <ProtectedRoute>
              <PrizeLeague />
            </ProtectedRoute>} />

          <Route path="/league/dashboard/:id/:idLeague/teams" element={
            <ProtectedRoute>
              <ManageTeamLeague />
            </ProtectedRoute>} />

          <Route path="/league/dashboard/:id/teams/detail/:id" element={

            <DetailsTeams />

          }
          />

          <Route path="/league/dashboard/:id/:idLeague/calendarleague" element={

            <CalendarLeague />

          } />

          <Route path="/league/dashboard/:id/:idLeague/statitics" element={

            <StatisticsLeague />

          }
          />

          <Route path="/league/dashboard/:id/:idLeague/ranking" element={
            <ProtectedRoute>
              <TableRanking />
            </ProtectedRoute>} />


          <Route path="/league/dashboard/:idLeague/teams/detail/:idTeam" element={
            <DetailsTeams />
          }
          />


          <Route path="/league/dashboard/:id/:idLeague/option" element={
            <ProtectedRoute>
              <OptionLeague />
            </ProtectedRoute>} />

          <Route path="/lineup" element={
            <ProtectedRoute>
              <CreateSquad />
            </ProtectedRoute>} />

          <Route path="/player/:id/:name" element={
            <ProtectedRoute>
              <PlayerInfomation />
            </ProtectedRoute>} />

          <Route path="/admin/dashboard" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashBoard />
            </ProtectedRoute>} />

        </Routes>


      </Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </>
  );
}

export default App;
