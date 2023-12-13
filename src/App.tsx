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
      <div className='container mx-auto flex flex-col justify-center items-center'>
        <img src="/jiggle-logo.png" alt="" width={128} />

        <div className='flex flex-row flex-wrap justify-center items-center'>
          <input className='file-input file-input-xs' type="file" onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              setSoundFile(file)
            }
          }
          } />
          <button className='btn btn-xs' onClick={() => {
            if (soundFile) {
              soundRef.current = new Howl({
                src: [
                  URL.createObjectURL(soundFile)
                ], format: ['mp3']
              })
            }
          }}>load</button>
        </div>

        <span>{soundFile?.name} {playId}</span>
        <div className='flex flex-col justify-center items-center gap-2 py-2'>
          <div className='join'>
            <button className='btn join-item rounded-l-full' onClick={() => {
              setPlayId(soundRef.current.play())
            }}>play</button>
            <button className='btn join-item' onClick={() => { soundRef.current.pause() }}>pause</button>
            <button className='btn join-item rounded-r-full' onClick={() => { soundRef.current.stop() }}>stop</button>
          </div>
          <div className='flex'>
            <div className='join'>
              <button className="btn join-item" onClick={() => {
                soundRef.current.seek(soundRef.current.seek() - 2)
              }}>-2s</button>
              <button className="btn join-item" onClick={() => {
                soundRef.current.seek(soundRef.current.seek() - 5)
              }}>-5s</button>
            </div>
            <div className='divider divider-horizontal'>|</div>
            <div className='join'>
              <button className="btn join-item" onClick={() => {
                soundRef.current.seek(soundRef.current.seek() + 5)
              }}>+5s</button>
              <button className="btn join-item" onClick={() => {
                soundRef.current.seek(soundRef.current.seek() + 2)
              }}>+2s</button>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-1 pb-52'>
          <div className='flex flex-col'>
            {
              stamps
                .map(
                  (stamp, index) => {
                    return <button className="btn" key={index} onClick={() => {
                      soundRef.current.seek(stamp)
                    }}>{stamp}</button>
                  }
                )
            }
          </div>
        </div>

        <div className='btm-nav'>
          <div className='py-10'>
            <button className="btn btn-primary btn-lg w-72" onClick={() => {
              push(soundRef.current.seek())
            }}>{time.toFixed(4)}</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
