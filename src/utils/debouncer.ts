
export default function debouncer(func:Function,msWait:number){
  let timeout :number
  return function(...args:any){
    clearInterval(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, msWait);
  }
} 