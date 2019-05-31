import React from 'react'

interface ILoadingProps {
  timedOut: boolean
  error: string
  pastDelay: boolean
  retry: any
}

export default (props: ILoadingProps) => {
  const style = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    minHeight: '300px'
  }

  if (props.timedOut || props.error) {
    return (
      <div style={style}>
        请求失败请重试...
        <button type="button" onClick={props.retry} style={{ color: 'black' }}>
          重试
        </button>
      </div>
    )
  }

  if (props.pastDelay) {
    return <div style={style}>Loading...</div>
  }

  return null
}
