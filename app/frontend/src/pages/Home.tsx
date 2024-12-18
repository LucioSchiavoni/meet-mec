import Layout from '../components/Layout'
import ItemMeet from '../components/item/ItemMeet'

const Home = () => {
  return (
    <Layout>
       <div className='flex justify-center items-center h-screen w-8/12 m-auto'>
        <ItemMeet/>
    </div>
    </Layout>
   
  )
}

export default Home