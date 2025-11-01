function Logo({ color }) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold text-primary">
          React
          <span className="text-gray-800">
            <span className={color}>F8</span>
          </span>
        </h1>
      </div>
    </div>
  )
}

export default Logo
