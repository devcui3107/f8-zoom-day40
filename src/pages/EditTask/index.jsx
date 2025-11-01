import { useDispatch, useSelector } from '@/libs/react-redux'
import { actions as TasksActions } from '@/store/tasks'
import http from '@/utils/http'
import { Check, FilePenLine, Save, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditTask() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const task = useSelector(state => state.tasks.currentItem)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Lấy dữ liệu task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await http.get(`/tasks/${id}`)
        dispatch(TasksActions.editItem(res.data))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [dispatch, id])

  // Func Support
  const handleSubmit = async e => {
    e.preventDefault()

    if (!task.title.trim()) {
      alert('Tiêu đề Task không được để trống!')
      return
    }

    try {
      setSaving(true)
      const res = await http.put(`/tasks/${id}`, task)
      dispatch(TasksActions.updateItem(res.data))
      navigate('/task-list')
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (key, value) => {
    dispatch(TasksActions.editItem({ ...task, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Đang tải dữ liệu...
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <FilePenLine size={30} /> Edit Task
        </h1>
        <button
          onClick={() => navigate('/task-list')}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition-all duration-200 transform"
        >
          <X className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Nhập tiêu đề task..."
              value={task.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
          </div>

          {/* Custom Checkbox */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="completed"
              className="relative flex items-center cursor-pointer select-none"
            >
              <input
                type="checkbox"
                id="completed"
                checked={task.completed}
                onChange={e => handleChange('completed', e.target.checked)}
                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md transition-all duration-300 checked:border-primary checked:bg-primary focus:ring-2 focus:ring-primary/30"
              />
              <Check className="absolute text-white w-4 h-4 opacity-0 peer-checked:opacity-100 peer-checked:scale-100 scale-0 transition-all duration-200 left-[2px] top-[2px]" />
            </label>
            <label
              htmlFor="completed"
              className="text-sm font-medium text-gray-700"
            >
              Đã hoàn thành
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate('/task-list')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
