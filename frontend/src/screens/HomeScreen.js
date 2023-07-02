import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import imageName from '../images/nike-sneaker.jpg';
import adidas1 from '../images/adidas-1.png';
import background1 from '../images/background-1.jpg';
import sneaker1 from '../images/sneaker-1.jpg';
import sneaker2 from '../images/sneaker-2.jpg';
import sneaker3 from '../images/sneaker-3.jpg';
import sneaker4 from '../images/sneaker-4.jpg';
import sneaker5 from '../images/sneaker-5.jpg';
import sneaker6 from '../images/sneaker-6.jpg';







function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}



      <section id="home" class="section-showcase">
         <div class="container">
           <div>
             <h1>Step into Style: Unleash Your Sneaker Obsession</h1>
             <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
               repudiandae rerum libero ipsum asperiores omnis mollitia, nostrum
               commodi placeat ea itaque modi corrupti corporis nam voluptas aut
               reprehenderit eaque culpa.
             </p>
             <a href="#about" class="btn">Read More</a>
           </div>
           <img src={adidas1} alt="Description" />
         </div>
       </section>


       <section id="about" class="section-large-text">
         <div class="overlay">
           <div class="section-large-text-inner">
             <h3>Run and feel good</h3>
             <h2>Kick Up Your Fashion Game: Find Your Sole Mate at Our Sneaker Store</h2>
             <p>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
               repudiandae laboriosam quia, error tempore porro ducimus voluptate
               laborum nostrum iure.
             </p>
           </div>
         </div>
       </section>
   
       
       <section class="section-gallery">
         <div class="gallery">
           <img src={sneaker1} alt="Description"   class="big"  />
           <img src={sneaker2} alt="Description"   class="big"  />
           <img src={sneaker3} alt="Description"   class="big"  />
           <img src={sneaker4} alt="Description"   class="big"  />
           <img src={sneaker5} alt="Description"   class="big"  />
           <img src={sneaker6} alt="Description"   class="big"  />
         </div>
       </section>
   

      

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
