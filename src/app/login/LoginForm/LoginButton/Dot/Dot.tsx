import React from 'react'

type Props = {
    active: boolean;
}

const Dot = (props: Props) => {
  return (
    <div style={{visibility: props.active ? 'visible' : 'hidden'}}>.</div>
  )
}

export default Dot