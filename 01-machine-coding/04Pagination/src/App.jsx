import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=100`)
    const data = await res.json()

    console.log(data);

    if (data && data.products) {
      setProducts(data.products)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const selectPagehendler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage != 0) {
      setPage(selectedPage)
    }


  }


  return (
    <div className=''>
      {products &&
        <div className='grid grid-cols-3'>
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return <span key={prod.id} className=''>
              <img src={prod.thumbnail} alt={prod.title} className='w-[60%] bg-slate-200 cursor-pointer' />
              <span>{prod.title}</span>
            </span>
          })}
        </div>}
      {products.length > 0 && <div className='mt-5 flex items-center justify-center'>
        {page >=1 && (
          <span
            className="cursor-pointer border p-4"
            onClick={() => selectPagehendler(page - 1)}
          >
            ⏮️
          </span>
        )}
        {[...Array(products.length / 10)].map((_, i) => {
          return <span key={i} className='cursor-pointer border p-4 ' onClick={() => selectPagehendler(i + 1)} >{i + 1}</span>
        })}
        <span className='cursor-pointer border p-4 ' onClick={() => selectPagehendler(page + 1)}>⏭️</span>
      </div>}

    </div>

  )
}

export default App
