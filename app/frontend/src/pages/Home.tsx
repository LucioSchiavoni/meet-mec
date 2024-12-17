
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
        <Link to='/new/meet' className=''>Registrar </Link>
    </div>
  )
}

export default Home