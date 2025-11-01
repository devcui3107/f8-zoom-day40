import { useDispatch, useSelector } from '@/libs/react-redux'
import { actions as TasksActions } from '@/store/tasks'
import http from '@/utils/http'
import { CheckCircle2, Edit3, FilePenLine, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TaskList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.list ?? [])
  const [loading, setLoading] = useState(false)

  // Lấy danh sách tasks
  useEffect(() => {
    if (tasks.length === 0) {
      setLoading(true)

      const fetchData = async () => {
        try {
          const res = await http.get('/tasks')
          dispatch(TasksActions.setList(res.data))
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
      fetchData()
    }
  }, [dispatch, tasks.length])

  // Func Support
  const handleEditTask = id => {
    navigate(`/edit-task/${id}`)
  }

  const handleDeleteTask = async (id, title) => {
    if (!window.confirm(`Bạn có chắc muốn xóa task "${title}" không?`)) return

    try {
      // 1. Gọi API xóa
      await http.delete(`/tasks/${id}`)

      // 2. Cập nhật Redux store
      dispatch(TasksActions.deleteItem(id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleTaskDone = async task => {
    if (!task || task.completed) return
    if (!window.confirm(`Xác nhận Task "${task.title} đã hoàn thành?"`)) return
    try {
      // 1. Update UI
      const updated = { ...task, completed: true }
      dispatch(TasksActions.updateItem(updated))

      // 2. Gọi API để cập nhật store
      await http.put(`/tasks/${task.id}`, updated)
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p>Đang tải danh sách Task...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <FilePenLine size={30} /> Task Manager
        </h1>
        <button
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform"
          onClick={() => navigate('/new-task')}
        >
          <Plus className="w-4 h-4" />
          Create New Task
        </button>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map(task => (
              <li
                key={task.id}
                className="flex justify-between items-center border border-gray-100 p-4 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                {/* Task Info */}
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      task.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  ></span>
                  <span
                    className={`font-medium ${
                      task.completed
                        ? 'text-gray-400 line-through'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {/* Hoàn thành Task */}
                  {!task.completed && (
                    <button
                      onClick={() => handleTaskDone(task)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-green-600 border border-green-200 hover:bg-green-50 transition-all duration-200"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}

                  {/* Edit */}
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteTask(task.id, task.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-semibold">Chưa có task nào 😴</p>
            <p className="text-sm mt-1 text-gray-400">Hãy thêm task mới nhé</p>
          </div>
        )}
      </div>
    </div>
  )
}
