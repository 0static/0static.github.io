import React from 'react'

export interface RenderImgProps {
  [key: string]: any
}

export function RenderImg(props: RenderImgProps) {
  const { url, name } = props
  return (
    <div>
      <img src={url} />
    </div>
  )
}
