import { Link } from "react-router-dom"


const Navbar = () => {
  

  return (
    <div className="border">
      <ul className="flex justify-between w-4/12 m-auto py-4">
        <li>
          <Link to='/home'>
          Inicio
          </Link>
        </li>
        <li>
          <Link to='/new'>
      Registrar evento
          </Link>
          
        </li>
        <li>
          <Link to='/'>
          Cambiar password
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar