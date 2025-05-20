import React from 'react'
import { createRoot } from 'react-dom/client'
import db from './toc.json'
import './index.less'
import { classNames, copyText } from 'harpe'
import { Tab, Dialog, message } from 'aurad'
import 'aurad/dist/style.css'
import { ObjectType, toFirstUpperCase } from 'abandonjs'
import { useLocalStorage } from '0hook'
import { RenderItem } from './RenderItem'
import { getInfo } from './util'
const { tree } = db

const url = `https://cdn.jsdelivr.net/npm/0static`

function App() {
  const [tab, setTab] = useLocalStorage('tab-key', tree[0][0])

  const [state, setState] = React.useState<{
    open: boolean
    model: ObjectType<string>
  }>({
    open: false,
    model: {},
  })
  const onSelect = (model: ObjectType<string>) => {
    console.log(model)
    setState({
      open: true,
      model,
    })
  }
  return (
    <div className='app'>
      <div className='content'>
        <Tab
          value={tab || undefined}
          onChange={setTab}
          items={db.tree.map((item: any, i: number) => {
            const { name = '', children } = getInfo(item)
            return {
              title: toFirstUpperCase(name as string),
              key: name,
              children: (
                <RenderItem
                  onSelect={onSelect}
                  key={i}
                  name={name}
                  children={children}
                  url={url + '/' + name}
                />
              ),
            }
          })}
        />
      </div>
      <Dialog
        open={state.open}
        maskClosable
        // hiddenCancel
        onCancel={() => {
          setState({ open: false, model: {} })
        }}>
        <div className='dialog-content' style={{ color: '#555' }}>
          {['name', 'url', 'content'].map((name) => {
            const value = state.model[name] || ''
            if (value)
              return (
                <div
                  key={name}
                  className={classNames('dialog-row', name)}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    const status = copyText(value)
                    if (status) {
                      message.success('复制成功')
                    } else {
                      message.error('复制失败')
                    }
                    // console.log(status)
                  }}>
                  {value}
                </div>
              )
          })}
        </div>
      </Dialog>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
