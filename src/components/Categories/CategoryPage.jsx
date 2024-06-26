import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SearchHeader from "../Header/SearchHeader";
import Categories from "../Categories/Categories";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import API_URL from "../../constants"


function CategoryPage() {
  const params = useParams();
//   console.log(params);

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cproducts, setcProducts] = useState([]);
  const [search, setSearch] = useState();
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    const url =
      API_URL + "/get-products?categoryName=" + params.categoryName;
    axios
      .get(url)
      .then((res) => {
        if ((res.data.products)) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {
    const url = API_URL +  "/search?search=" + search;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setcProducts(res.data.products);
        setIsSearched(true);
      })
      .catch((err) => {
        console.log("Server Error:", err);
      });

  };

  const likedProducts = {};

  const handleIconClick = (productId) => {
    let userId = localStorage.getItem("userId");

    const data = { userId, productId };
    const url = API_URL + "/like-product";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const goToSingleProduct = (id) => {
    navigate("/product/" + id);
  };

  const clearSearchResults = () => {
    setIsSearched(false);
    setSearch("");
  };

  return (
    <>
      <div className="px-8">
        <SearchHeader
          search={search}
          handleSearch={handleSearch}
          handleClick={handleClick}
        />
        <Categories />

        {isSearched && cproducts && (
          <>
            <h3 className=" font-medium uppercase">Search Results</h3>
            <button
              className="font-bold underline hover:no-underline"
              onClick={() => clearSearchResults()}
            >
              Clear Results
            </button>
          </>
        )}
        {isSearched && cproducts && cproducts.length < 1 && (
          <h3 className=" font-medium uppercase">No Results Found</h3>
        )}
        {isSearched && (
          <div className="products flex flex-wrap gap-6 py-4">
            {cproducts &&
              products.length > 0 &&
              cproducts.map((item) => (
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
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold pb-2">
                        Rs {item.price}
                      </h2>
                      <div
                        onClick={handleIconClick}
                        className="cursor-pointer "
                      >
                        {/* {likedProducts[item._id] ? ( */}
                        <IoMdHeartEmpty
                          size={24}
                          className="hover:fill-red-500"
                        />
                        {/* // ) : ( */}
                        {/* <IoMdHeart size={24} /> */}
                        {/* )} */}
                      </div>
                    </div>
                    <h2 className="text-lg">
                      {item.pname} | {item.pcategory}
                    </h2>
                    <p className="text-sm text-gray-500 pt-1">{item.pdesc}</p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* <div className="flex justify-between font-medium uppercase">
          <h3>All Products</h3>
        </div> */}

        {!isSearched && (
          <div className="products flex flex-wrap gap-6 py-4">
            {products &&
              products.length > 0 &&
              products.map((item) => (
                <div
                  onClick={() => goToSingleProduct(item._id)}
                  key={item._id}
                  className="product-card w-[300px]  border-[1px] border-gray-300"
                >
                  <img
                    className="inline-block w-full h-[200px] object-cover"
                    src={"http://localhost:3000/" + item.pimage}
                    alt="img"
                  />
                  <div className="text-left p-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold pb-2">
                        Rs {item.price}
                      </h2>
                      <div
                        onClick={() => handleIconClick(item._id)}
                        className="cursor-pointer"
                      >
                        {likedProducts[item._id] ? (
                          <IoMdHeart size={24} />
                        ) : (
                          <IoMdHeartEmpty
                            size={24}
                            className="hover:fill-red-500"
                          />
                        )}
                      </div>
                    </div>
                    <h2 className="text-lg">
                      {item.pname} | {item.pcategory}
                    </h2>
                    <p className="text-sm text-gray-500 pt-1">{item.pdesc}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryPage;
