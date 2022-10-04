import React, { useEffect, useRef, useState } from 'react'
import useTrigger from 'hooks/useTrigger'
import { PopoverEventerProps } from '../types'
import { eventListener } from './utils'

const PopoverEventer: React.FC<PopoverEventerProps> = ({
  event,
  onClose,
  children,
  isOpenPopover,
}) => {
  const [value, on, off] = useTrigger(false)
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const close = (): void => {
    if (onClose) {
      onClose()
    }
    off()
  }

  useEffect(() => {
    let timeoutId
    if (value) {
      if (event === 'hover') {
        timeoutId = setTimeout(() => {
          if (value) {
            setIsOpen(true)
          }
        }, 300)
      } else {
        setIsOpen(true)
      }
    } else {
      setIsOpen(false)
    }

    return (): void => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [value, event])

  const clickHandler = (e: Event): void => {
    const { target, type } = e
    if (
      type === 'touchmove' ||
      (value && !popoverRef.current?.contains(target as Node))
    ) {
      close()
    } else if (!value && triggerRef.current?.contains(target as Node)) {
      on()
    }
  }

  const focusHandler = (event: Event): void | false => {
    const { target } = event

    if (popoverRef.current?.contains(target as Node)) {
      event.preventDefault()
    } else if (target === document.activeElement) {
      on()
    } else if (value) {
      close()
    }
  }

  const mouseHandler = ({ target, relatedTarget }: MouseEvent): void => {
    if (!value && triggerRef.current?.contains(target as Node)) {
      on()
    } else if (
      value &&
      (!(relatedTarget instanceof Node) ||
        // Не реагиреум на mouseLeave, который переходит на триггер или поповер
        (!popoverRef.current?.contains(relatedTarget) &&
          !triggerRef.current?.contains(relatedTarget)))
    ) {
      close()
    }
  }

  useEffect(() => {
    if (isOpenPopover && !value) {
      on()
    }
  }, [isOpenPopover])

  useEffect(() => {
    if (event === 'hover') {
      return eventListener({
        targets: [triggerRef.current, popoverRef.current],
        events: ['mouseenter', 'mouseleave'],
        handler: mouseHandler,
      })
    }

    if (event === 'focus') {
      return eventListener({
        targets: [
          triggerRef.current?.querySelector(
            'input, textarea, button',
          ) as HTMLElement,
          popoverRef.current,
        ],
        events: [
          'focus',
          'blur',
          'ontouchstart' in document.documentElement ? 'touchend' : 'mousedown',
        ],
        handler: focusHandler,
      })
    }

    return eventListener({
      targets: [document],
      events: [
        ...('ontouchstart' in document.documentElement
          ? ['touchend', 'touchmove']
          : ['mousedown']),
      ],
      handler: clickHandler,
    })
  }, [triggerRef.current, popoverRef.current, value, isOpen])

  return children({
    isOpen,
    triggerRef,
    popoverRef,
    close,
  })
}

export default PopoverEventer
