import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import Layout from "../components/Layout"
import ProductList from "../components/ProductList"
import { getProducts } from "../redux/actions/productsActions"

export default function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    //Request to API
    dispatch(getProducts())
  }, [])

  //Get products from state
  const products = useSelector(state => state.products.products)

  return (
    <Layout>
      <div className="my-5 w-8/12 m-auto">
        {
          products ? <ProductList products={products}/> : null
        }
      </div>
    </Layout>
  )
}
