import React from 'react'
import cn from 'classnames'
import useStyles from '../Dropdown.styled'
import { MutableOption } from '../Dropdown'

type DropdownLabelProps = {
  isMultiple: boolean
  items: MutableOption[]
}

const getOptionsLabel = (items: MutableOption[]): string =>
  items.map((option) => option.label).join(', ')

const DropdownLabel: React.FC<DropdownLabelProps> = ({
  isMultiple,
  items,
  children,
}) => {
  const classes = useStyles()
  return (
    <>
      {children || (
        <div className={cn('df full-width aic', classes.label)}>
          {!isMultiple && items[0]?.icon && (
            <span className={cn('df jcc aic', classes.icon)}>
              {items[0].icon}
            </span>
          )}
          <span className="line-clamp-1">{getOptionsLabel(items)}</span>
        </div>
      )}
    </>
  )
}

export default DropdownLabel
