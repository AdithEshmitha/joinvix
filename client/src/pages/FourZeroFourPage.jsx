import { Link, useNavigate } from 'react-router-dom'

const FourZeroFourPage = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-200 bg-gray-50 flex items-center justify-center px-6">

      <div className='flex flex-col w-full justify-center items-center gap-3'>

        <h1 className='text-[200px] text-green-shade font-bold tracking-wider'>404</h1>

        <p className='text-text/80 tracking-wide'>Oops! Page not found.</p>

        <Link to={'/'} className='text-green-shade hover:underline cursor-pointer'>Go to Home Page</Link>

      </div>

    </div>
  )
}

export default FourZeroFourPage
