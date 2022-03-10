import React, { useEffect } from "react"
import router from 'next/router'
//Firebase
import { app } from '../config/firebase'
import { getAuth } from 'firebase/auth'
//Components
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
//Redux
import { useDispatch, useSelector } from "react-redux"
//Actions
import { getUserProducts } from "../redux/slices/productSlice"
//Selectors
import { productsArraySelector } from "../redux/slices/productSlice"

export default function Home() {

  const dispatch = useDispatch()

  const auth = getAuth()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //Request to API
        dispatch(getUserProducts())
      } else {
        router.push('/login')
      }
    })
  }, [])

  //Get products from state
  const products = useSelector(productsArraySelector)

  return (
    <Layout>
      <div className="my-5 w-full lg:w-8/12 m-auto">
        {
          products ? <ProductList products={products} /> : null
        }
      </div>
    </Layout>
  )
}
