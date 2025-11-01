import { HashRouter, Route, Routes } from 'react-router-dom'
// Layouts
import RootLayout from '@/layouts/RootLayout'

// Pages
import EditTask from '@/pages/EditTask'
import HomePage from '@/pages/Home'
import NewTask from '@/pages/NewTask'
import TaskList from '@/pages/TaskList'

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes
