import React, {useMemo} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import {tw, useSelectedTheme} from '@/core'

type Props = {
  as: 'AntDesign' | 'FontAwesome' | 'MaterialIcons'
  name: string
  size: number
  className?: any
}
export default function Icon({as, size, className, ...props}: Props) {
  const {selectedTheme} = useSelectedTheme()
  const iconProps = useMemo(
    () => ({...props, size: size ?? 18, style: tw.style('text-black dark:text-white', className)}),
    [className, props, size],
  )
  const Component = useMemo(() => {
    switch (as) {
      case 'AntDesign':
        return <AntDesign {...iconProps} />
      case 'FontAwesome':
        return <FontAwesome {...iconProps} />
      default:
        return <MaterialIcons {...iconProps} />
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconProps, as, selectedTheme])

  return Component
}
