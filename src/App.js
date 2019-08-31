import React, { useEffect, useState, useRef } from 'react'
import logo from './logo.svg'
import './App.css'

function App () {
  const [departures, setDeparures] = useState([])

  useEffect(() => makeCall(), [])

  const makeCall = () => {
    fetch(
      'https://api.resrobot.se/v2/departureBoard?key=4e22257c-71be-4b0b-b3dc-7ad652b0d8f6&id=740025626&maxJourneys=10&format=json'
    )
      .then(response => response.json())
      .then(json => {
        console.log(json.Departure)
        setDeparures(json.Departure)
      })
      .catch(error => {
        console.error(error)
      })
  }

  useInterval(() => makeCall(), 10000)

  return (
    <div className='App'>
      <table>
        <thead>
          <tr>
            <th>Linje</th>
            <th>Riktning</th>
            <th>Nästa avgång</th>
          </tr>
        </thead>
        <tbody>
          {departures.map(dep => (
            <tr>
              <td>{dep.transportNumber}</td>
              <td>{dep.direction}</td>
              <td>{dep.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div />
    </div>
  )
}

function useInterval (callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(
    () => {
      savedCallback.current = callback
    },
    [callback]
  )

  // Set up the interval.
  useEffect(
    () => {
      function tick () {
        savedCallback.current()
      }
      if (delay !== null) {
        let id = setInterval(tick, delay)
        return () => clearInterval(id)
      }
    },
    [delay]
  )
}

export default App
