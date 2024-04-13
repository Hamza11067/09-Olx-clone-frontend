import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchHeader from "../Header/SearchHeader";

function Home() {
  // const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    const url = "http://localhost:3000/get-products";
    axios
      .get(url)
      .then((res) => {
        if ((res.data, products)) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {
    let filteredProducts = products.filter((item) => {
      if (
        item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.pcategory.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });
    setProducts(filteredProducts);
  };

  return (
    <>
      <div className="px-8">
        <SearchHeader
          search={search}
          handleSearch={handleSearch}
          handleClick={handleClick}
        />
        {/* <h1>Products</h1> */}
        <div className="products flex flex-wrap gap-6 py-4">
          {products &&
            products.length > 0 &&
            products.map((item) => (
              <div
                key={item._id}
                className="product-card w-[300px]  border-[1px] border-gray-300"
              >
                <img
                  className="inline-block w-full h-[200px] object-cover"
                  src={"http://localhost:3000/" + item.pimage}
                  alt="img"
                />
                <div className="text-left p-4">
                  <h2 className="text-xl font-semibold pb-2">
                    Rs {item.price}
                  </h2>
                  <h2 className="text-lg">
                    {item.pname} | {item.pcategory}
                  </h2>
                  <p className="text-sm text-gray-500 pt-1">{item.pdesc}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Home;
