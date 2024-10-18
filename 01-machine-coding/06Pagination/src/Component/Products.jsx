import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'

const Products = () => {
    const [products, setProducts] = useState()
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const fetchProducts = async ()=>{
        const respose = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`)
        const resposeData = await respose.json()
        console.log(resposeData)
        if(resposeData, resposeData.products){
            setProducts(resposeData.products)
            setTotal(resposeData.total)
        }

    }
    useEffect(()=>{
         fetchProducts()
    },[page])
  return (
    <div>
      <h1 className='font-bold text-3xl text-center p-5'>Product List </h1>
      <ul className='flex flex-wrap'>
        {products && products.length ? 
            products.map((product, i)=> (
                <li className='p-5 mb-3'>
                    <img className='h-22 w-22' src={product.thumbnail} alt={product.title} />
                    <span>{product.title}</span>
                </li>
            ))

        : "loading..."}
      </ul>
      <Pagination page={page} setPage={setPage} total={total}  products={products}/>
    </div>
  )
}

export default Products
