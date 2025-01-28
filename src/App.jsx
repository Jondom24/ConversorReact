
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  //hook
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logueado, setLogueado] = useState(false)
  const [texto, setTexto] = useState('')
  const [voz, setVoz] = useState('')

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)    
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  }
// Funcion para ingresar al dar click al boton
  async function ingresar() {
  console.log('Usuario:', usuario)
  console.log('Clave:', clave)
  try{
    // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
  const peticion = await fetch('http://localhost:3000/login?usuario=' + usuario + '&clave=' + clave, { credentials: 'include' })
  if (peticion.ok) {
    setLogueado(true)
  } else {
    alert('Datos incorrectos')
  }

 } catch (error) {
   alert('Datos incorectos')
 }
}


function validar() {
  const validarSesion = async () => {
    try {
      // Peticion al servidor backend, para verificar si el usuario y la clave son correctos
      const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' })
      if (peticion.ok) {
        setLogueado(true)
      }
    } catch (error) {
    }
  }
  validarSesion();
}
  useEffect(validar, [])

  function cambiarTexto(evento) {
    setTexto(evento.target.value)
  }

  function textoAVoz(){
    const configuracion = new SpeechSynthesisUtterance(texto)
    speechSynthesis.speak(configuracion)
  }

  function vozATexto () {
    const agente = new webkitSpeechRecognition()
    agente.start()
    agente.onresult = resultado
  }
  function resultado(informacion) {
    console.log(informacion.results[0][0].transcript)
    setVoz(informacion.results[0][0].transcript)
    //informacion.results[0][0].transcript
  }


  //Condicion para mostrar en pantalla el contenido
  if (logueado) {
    return (
      <>
        <h1>Conversor TTS y STT</h1>
        <h2>Conversior texto a voz</h2>
        <input type="text" value={texto} onChange={cambiarTexto}/>
        <button onClick={textoAVoz}>Convertir</button>
        <h2>Conversor voz a texto</h2>
        <button onClick={vozATexto}>Grabar</button>
        {voz}
      </>
    )
  }

  return (
    <>
       <h1>Inicio de sesión</h1>
       <label htmlFor="usuario">Usuario: 
        <input id='usuario' type="text" value={usuario} onChange={cambiarUsuario}/>
       </label>
       <label htmlFor="clave">Clave:
         <input id='clave' type="password" value={clave} onChange={cambiarClave}/>
       </label>
       <button type="submit" onClick={ingresar}>Ingresar</button>
     </>
  )
}
export default App