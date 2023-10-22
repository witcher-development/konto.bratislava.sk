import cx from 'classnames'
import { useId } from 'react'
import { useProgressBar } from 'react-aria'

type ProgressBarBase = {
  type?: 'success' | 'default' | 'city'
  label?: string
  value: number
  minValue?: number
  maxValue?: number
  className?: string
  mirrored?: boolean
}

const ProgressBar = ({
  type = 'default',
  label,
  value = 0,
  minValue = 0,
  maxValue = 100,
  className,
    mirrored
}: ProgressBarBase) => {
  const id = useId()
  const { progressBarProps, labelProps } = useProgressBar({
    value,
    minValue,
    maxValue,
    label: label ?? id,
  })

  const percentage = (value - minValue) / (maxValue - minValue)
  const barWidth = `${Math.round(percentage * 100)}%`

  const progressBarStyleContainer = cx(
    'flex h-6 w-full flex-row items-center gap-4 p-0',
    className,
    {},
  )
  return (
    <div className="flex w-full flex-col">
      <div {...progressBarProps} className={progressBarStyleContainer}>
        <div className={cx('flex-column flex h-6 w-full items-center rounded-l-lg bg-gray-100', {
          'transform rotate-180': mirrored === true
        })}>
          <div
            style={{ width: barWidth }}
            className={cx('h-6 rounded-l-lg flex justify-center', {
              'bg-gray-100': type === 'default',
              'bg-success-700': type === 'success',
              'bg-blue-500': type === 'city',
            })}
          >
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
