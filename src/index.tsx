import React from 'react'
import { createRoot } from 'react-dom/client'
import db from './toc.json'
import { isArray } from 'asura-eye'
import './index.less'
import { RenderSvg } from './components'

const RenderItem = (props: any) => {
  const { name, path = '/', children } = props
  const url = `https://cdn.jsdelivr.net/npm/0static${path.replace(/^\./, '')}`
  const getDataType = () => {
    if (/\.svg$/.test(name)) {
      return 'svg'
    }
    return 'default'
  }
  const dataType = getDataType()

  return (
    <div>
      {name && (
        <div
          onClick={() => {
            console.log({ name, path })
          }}>
          {name.replace(/\.(json|svg|css|js|png|jpeg|ico)$/, '')}
          <div
            className='render'
            style={{
              color: '#fff'
            }}>
            {dataType === 'svg' && <RenderSvg url={url} {...props} />}
          </div>
        </div>
      )}
      <div className='next'>
        {isArray(children) &&
          children.map((item: any, i: number) => {
            return <RenderItem key={i} {...item} />
          })}
      </div>
    </div>
  )
}

function App() {
  console.log(db)
  return (
    <div className='app'>
      <div>
        {db.tree.map((item: any, i: number) => {
          return <RenderItem key={i} {...item} />
        })}
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
