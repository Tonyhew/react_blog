import React from 'react'
import * as antIcons from '@ant-design/icons'

const iconToElement = (name, className, styles, ...Children) => {
  return React.createElement(antIcons && antIcons[name], {
    style: { 
      fontSize: '1rem',
      ...styles
    },
    className
  }, ...Children)
}

export default iconToElement
