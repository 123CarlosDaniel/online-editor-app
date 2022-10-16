const data = [
  {
    id : '123456789',
    name : 'pepe',
  },
  {
    id : '123456781',
    name : 'pepe',
  },
  {
    id : '123456785',
    name : 'pepe',
  },
]


export default function Rooms() {
  return (
    <div className="data_container">
      {data.map(el => (
        <div key={el.id}>
          <span>Id : {el.id}</span>
          <h4>Name : {el.name}</h4>
          <button className="button sm">Unirse</button>
        </div>
      ))}
    </div>
  )
}
