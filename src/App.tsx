import { useEffect, useRef, useState } from 'react'
import './App.css'

import { Howl } from 'howler';
import useArray from './libs/use-array';

function App() {
  const [playId, setPlayId] = useState(0)
  const [time, setTime] = useState(0)
  const [stamps, { push }] = useArray<number>([])
  const [soundFile, setSoundFile] = useState<File>()

  const sound = new Howl({
    src: ['/sample-cut.mp3'],
  })

  const soundRef = useRef(sound)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(soundRef.current.seek())
    }, 500)

    return () => {
      clearInterval(intervalId)
    }

  }, [])


  return (
    <>
      <div>
        <img src="/jiggle-logo.png" alt="" width={128} />
      </div>
      <div>
        <input type="file" onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            setSoundFile(file)
          }
        }
        } />
        <button onClick={() => {
          if (soundFile) {
            soundRef.current = new Howl({
              src: [
                URL.createObjectURL(soundFile)
              ], format: ['mp3']
            })
          }
        }}>load</button>
      </div>
      <div>
        {soundFile?.name} -
        controls: {playId}
        <div>
          <button onClick={() => {
            setPlayId(soundRef.current.play())
          }}>play</button>
          <button onClick={() => { soundRef.current.pause() }}>pause</button>
          <button onClick={() => { soundRef.current.stop() }}>stop</button>
        </div>
        {/** add buttons to seek 5s backward and forward */}
        <div style={{ display: 'flex', flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
          <button onClick={() => {
            soundRef.current.seek(soundRef.current.seek() - 5)
          }}>-5s</button>
          <button onClick={() => {
            soundRef.current.seek(soundRef.current.seek() + 5)
          }}>+5s</button>
          <div>|</div>
          <button onClick={() => {
            soundRef.current.seek(soundRef.current.seek() - 2)
          }}>-2s</button>
          <button onClick={() => {
            soundRef.current.seek(soundRef.current.seek() + 2)
          }}>+2s</button>
        </div>
        <div>{time.toFixed(4)}</div>
        <div>
          <button onClick={() => {
            push(soundRef.current.seek())
          }}>Record</button>
          <div style={{ display: 'flex', flexDirection: "column" }}>
            {
              stamps
                .map(
                  (stamp, index) => {
                    return <button key={index} onClick={() => {
                      soundRef.current.seek(stamp)
                    }}>{stamp}</button>
                  }
                )
            }
          </div>
        </div>
      </div>


    </>
  )
}

export default App
