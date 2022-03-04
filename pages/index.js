import Layout from "../components/Layout"
import Product from "../components/Product"

export default function Home() {
  return (
    <Layout>
      <div className="my-5 w-6/12 m-auto">
        <Product/>
      </div>
    </Layout>
  )
}
