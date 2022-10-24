import loader from '../assets/loader.svg'

export default function LoaderInline() {
  return (
    <div >
      <div style={{ textAlign: 'center' }}>
        <img src={loader} height={150}></img>
      </div>
    </div>
  )
}
