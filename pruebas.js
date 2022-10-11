import readline from 'readline/promises'
import {stdin,stdout} from 'process'

const rl = readline.createInterface(stdin,stdout)
let lineas = 0


function debounce(func,msWait){
  let timeout 
  return function(...args){
    clearTimeout(timeout)
    timeout = setTimeout(()=>func(...args),msWait)
  }
}
function logger(val){
  console.log(val)
}

const mostrar = debounce(logger,500)
rl.on("line", (line)=> {
  lineas++
  mostrar(lineas)  
})
