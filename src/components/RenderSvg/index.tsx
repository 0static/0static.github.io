import React from 'react'

const getUrlValue = async (url: string) => {
  return new Promise<string>((rs) => {
    const Http = new XMLHttpRequest()
    Http.open('GET', url)
    Http.send()
    Http.onload = (e) => {
      // Http.onreadystatechange = (e) => {
      Http.responseText && rs(Http.responseText)
    }
  })
}
const defaultValue = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
</svg>`
export const RenderSvg = (props: any) => {
  const { url, onSelect } = props
  const [value, setValue] = React.useState(defaultValue)
  // console.log(props)
  React.useEffect(() => {
    url &&
      getUrlValue(url).then((v) => {
        if (v) {
          const newVal = v
            .replace(/width="\d+"/, 'width="1em"')
            .replace(/height="\d+"/, 'height="1em"')
          setValue(newVal)
        }
      })
  }, [url])

  return (
    <div>
      <div
        key={value}
        style={{
          cursor: 'pointer',
          fontSize: 32
        }}
        onClick={() => {
          onSelect({
            ...props,
            content: value
          })
        }}
        dangerouslySetInnerHTML={{ __html: value }}></div>
    </div>
  )
}
