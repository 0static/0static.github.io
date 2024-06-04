import React from 'react'
import { createRoot } from 'react-dom/client'
import db from './toc.json'
import { isArray, isEffectArray } from 'asura-eye'
import './index.less'
import { classNames } from 'harpe'
import { RenderSvg } from './components'
import { Tab, Button } from 'aurad'
import 'aurad/dist/style.css'

const RenderItem = (props: any) => {
  const { name, path = '/', children } = props
  const url = `https://cdn.jsdelivr.net/npm/0static${path.replace(/^\./, '')}`
  // console.log(url)
  const getDataType = () => {
    if (/\.svg$/.test(name)) {
      return 'svg'
    }
    return 'default'
  }
  const dataType = getDataType()
  const hasNext = isEffectArray(children)
  if (dataType === 'svg') {
    console.log(url)
  }
  return (
    <div className={classNames('item', dataType, name, { hasNext })}>
      {name && (
        <div
          className='item-content'
          onClick={() => {
            console.log({ name, path })
          }}>
          {dataType === 'svg' ? (
            <RenderSvg url={url} {...props} />
          ) : (
            <>
              <span className='name'>
                {name.replace(/\.(json|svg|css|js|png|jpeg|ico)$/, '')}
              </span>
              <span className='render'>
                {/* {dataType === 'svg' && <RenderSvg url={url} {...props} />} */}
              </span>
            </>
          )}
        </div>
      )}
      {hasNext && (
        <div className='next'>
          {children.map((item: any, i: number) => {
            return <RenderItem key={i} {...item} />
          })}
        </div>
      )}
    </div>
  )
}

function App() {
  console.log(db)
  return (
    <div className='app'>
      <div className='content'>
        <Tab
          items={db.tree.map((item: any, i: number) => {
            return {
              title: item.name,
              key: item.name,
              children: <RenderItem key={i} {...item} />
            }
          })}
        />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
