import React from 'react'
import { isEffectArray } from 'asura-eye'
import './index.less'
import { classNames } from 'harpe'
import { RenderSvg, RenderImg } from './components'
import { getInfo } from './util'

export const RenderItem = (props: any) => {
  const { name, url = '/', children, onSelect, className } = props
  const getDataType = () => {
    if (/\.svg$/.test(name)) {
      return 'svg'
    }
    if (/\.(png|jpeg|ico)$/.test(name)) {
      return 'img'
    }
    return 'default'
  }
  const dataType = getDataType()
  const hasNext = isEffectArray(children)

  return (
    <div className={classNames('item', className, { leaf: !hasNext })}>
      {name && (
        <div
          className='item-content'
          onClick={() => {
            !hasNext && onSelect({ name, url, ...props })
          }}>
          {dataType === 'svg' && <RenderSvg url={url} {...props} />}
          {dataType === 'img' && <RenderImg url={url} {...props} />}
          {dataType === 'default' && (
            <span className='name'>
              {name.replace(/\.(json|svg|css|js|png|jpeg|ico)$/, '')}
              {/* {name} */}
            </span>
          )}
        </div>
      )}
      {hasNext && (
        <div className='item-next'>
          {children.map((item: any, i: number) => {
            const { name = '', children } = getInfo(item)
            return (
              <RenderItem
                key={i}
                className={name}
                url={url + '/' + name}
                onSelect={onSelect}
                name={name}
                children={children}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
