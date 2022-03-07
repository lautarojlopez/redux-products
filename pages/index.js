import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import { getProducts } from "../redux/actions/productsActions"
import { app } from '../config/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import router from 'next/router'

export default function Home() {

  const dispatch = useDispatch()

  const auth = getAuth()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        //Request to API
        dispatch(getProducts())
      } else {
        router.push('/login')
      }
    })
  }, [])

  //Get products from state
  const products = useSelector(state => state.products.products)
  const lodaing = useSelector(state => state.products.loading)

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
