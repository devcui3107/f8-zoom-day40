import { useDispatch, useSelector } from '@/libs/react-redux'
import { actions as TasksActions } from '@/store/tasks'
import http from '@/utils/http'
import { FilePenLine, Save, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewTask() {
  const currentItem = useSelector(state => state.tasks.currentItem)
  const [title, setTitle] = useState(currentItem?.title || '')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Func Support
  const handleSubmit = async e => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Tiêu đề Task không được để trống!')
      return
    }

    try {
      setLoading(true)
      const res = await http.post('/tasks', {
        title,
        completed: false,
      })

      dispatch(TasksActions.addItem(res.data))
      dispatch(TasksActions.editItem({ title: '', completed: false }))
      navigate('/task-list')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    const newValue = e.target.value
    setTitle(newValue)
    dispatch(
      TasksActions.editItem({
        ...currentItem,
        title: newValue,
      })
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
          <FilePenLine size={30} /> Create Task
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <input
              type="text"
              placeholder="Nhập tiêu đề task..."
              value={title}
              onChange={handleChange}
              autoFocus
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
            />
          </div>

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
              disabled={loading}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-200 disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
