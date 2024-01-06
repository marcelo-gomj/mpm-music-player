type CircleProgressBarProps = {
  isScanning: boolean,
  radiusProgress: string | number
}
function CircleProgressBar({ 
  isScanning,
  radiusProgress
} : CircleProgressBarProps) {

  const scanningClassAnimation = isScanning ? 'mode-verify' : '';

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-base-500 stroke-current"
          strokeWidth="2.5"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className={`text-white progress-ring__circle stroke-current ${scanningClassAnimation}`}
          strokeWidth="2.5"
          // stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          // 63 total
          strokeDashoffset={`calc(400 - (400 * ${radiusProgress || 0}) / 100)`}
        ></circle>
      </svg>
    </div>
  )
}

export default CircleProgressBar;