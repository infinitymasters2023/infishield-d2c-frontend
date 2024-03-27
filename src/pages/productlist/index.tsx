/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import Layout from '@/components/layouts/Layout';
import { getAllnewproductcategory, getBrandsByProducts, getProductSubcategoryList, getSubcategoryByProducts } from '@/services/global_services';
import { NewProductList } from '@/interfaces/common.interfaces';
import mp3PlayerImage from '../../assets/img/product/mp3player.jpg';
import lcdImage from '../../assets/img/product/Lcd.jpeg';
import ledTvImage from '../../assets/img/product/LED TV.png';
import crtTvImage from '../../assets/img/product/Tv CRT.webp';
import plasmaTvImage from '../../assets/img/product/tv plasma.jpg';
import setupBoxImage from '../../assets/img/product/setupbox.jpg';
import homeTheatreImage from '../../assets/img/product/home theatre.jpg';
import bluplayer from '../../assets/img/product/blu player.jpg';
import multimediaspeaker from '../../assets/img/product/mulitimedia speaker.webp';
import mediaplayer from '../../assets/img/product/multi media.jpg';
import dvdPlayerImage from '../../assets/img/product/dvd player.jpg';
import ebook from '../../assets/img/product/ebookreader.jpg';
import smart from '../../assets/img/product/mobile smat.jpg';
import feature from '../../assets/img/product/mobile feature.jpeg';
import tablet from '../../assets/img/product/mobileand tablet.jpg';
import iphone from '../../assets/img/iphone.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css'
import dynamic from 'next/dynamic';
import { Modal } from 'react-bootstrap';
import ModalDeviceBrands from '@/components/products/ModalDeviceBrands';
import ProductSlider from '../home/components/ProductSlider';
import sample from '../../assets/img/alldevicesample.png'



function ProductList() {
  const router = useRouter();
  const { subcategoryid } = router.query;
  const [products, setProducts] = useState<NewProductList>([] as NewProductList);
  const [filteredProducts, setFilteredProducts] = useState<NewProductList>([] as NewProductList);
  const [filterId, setFilterId] = useState<number | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  useEffect(() => {
    async function fetchData() {
      try {

        await getSubcategoryByProducts(subcategoryid).then(response => {
          if (response.statusCode === 200 && response.isSuccess && response.data) {
            setProducts(response.data);
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [subcategoryid]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getProductSubcategoryList('');
      setCategories(response.data);

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getBrandsByProducts(subcategoryid);
        if (response.statusCode === 200 && response.isSuccess && response.data) {
          setDeviceList(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [subcategoryid]);

  useEffect(() => {
    if (filterId !== null) {
      const filtered = products.filter((product: { subcategoryid: number; }) => product.subcategoryid === filterId);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, filterId]);

  // useEffect(() => {

  //   sortProducts();
  // }, [sortBy]);
  // const sortProducts = () => {
  //   let sortedProducts = [...filteredProducts];
  //   if (sortBy === 'A-z') {
  //     sortedProducts.sort((a, b) => a.productname.localeCompare(b.productname));
  //   } else if (sortBy === 'Z-a') {
  //     sortedProducts.sort((a, b) => b.productname.localeCompare(a.productname));
  //   } else if (sortBy === 'Popular') {
  //   } else if (sortBy === 'New Arrivals') {
  //   }
  //   setFilteredProducts(sortedProducts);
  // };
  const toggleModal = () => {
    setShowModal(!showModal);
  }
  const handleSubcategoryClick = (id: string) => {
    sessionStorage.setItem('subcategoryid', id);
  };
  console.log('products', products);
  // if (loading) {
  //   // If loading, display a loading indicator
  //   <div className="loader-container">
  //     <div className="spinner"></div>
  //   </div>
  // }
//   if (loading) {
//     return (
//       <div className="spinner-grow" role="status">
//       <span className="sr-only">Loading...</span>
//     </div>
//     );
// }

  return (
    <Layout>

      <section className="pageMainContent">
                <div className="container g-0">
                    <div className="row g-0">
                    <div className="pageHead-Outer">
                        <div className="outerHero">
                        <div className="row g-0">
                            {/* Breadcrumb start */}
                            <nav aria-label="breadcrumb" className="g-0">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                  Our Devices
                                </li>
                            </ol>
                            </nav>
                            {/* Breadcrumb ends */}
                            {/* banner start */}
                            <div className="OuterBanner">
                            {/* left */}
                            <div className="OuterBanner--left">
                                <div className="left_content">
                                <h2>InfyShield</h2>
                                <h1 className="display-3">Category Name</h1>
                                <p>
                                  Hassle Free Claim with InfyShield for all brands
                                </p>
                                <p>
                                  Select Your Product Type And Extend It's Warranty Today!
                                </p>
                                </div>
                                <div className="left_action d-none">
                                <a href="#dwFormBox" className="ActionBtn">
                                    {" "}
                                    Get Now
                                </a>
                                </div>
                            </div>
                            {/* right */}
                            <div className="OuterBanner--right d-none">
                                <figure className="figure">
                                <img
                                    src="assets/img/heroBanner/iPhone-X 1.png"
                                    className="figure-img img-fluid"
                                    width={200}
                                    height={398}
                                    alt="banner right"
                                />
                                </figure>
                            </div>
                            </div>
                            {/* banner ends */}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>

      {
        /* Modal for Brands start */
      }
      <ModalDeviceBrands showModal={showModal} toggleModal={toggleModal} productId={selectedProduct} />



      <div className="OurDevices--Section">
        <div className="container">
          <div className="row">
            <div className="topheadfilter d-flex align-items-center justify-content-between">
              <a
                className="allCati-btn"
                data-bs-toggle="offcanvas"
                href="#offcanvasWithBothOptions"
                role="button"
                aria-controls="offcanvasExample"
              >
                <span> View All Categories</span>
              </a>
              {/* filter */}
              <div className="onheadfilter">
                <div className="dw--form">
                  <form action="">
                    <div className="row g-0 mb-3 justify-content-end">
                      <div className="col-6 col-sm-6 col-md-6 ">
                        <label htmlFor="sortBy" className="form-label">
                          Sort By
                        </label>
                        <select
                          id="sortBy"
                          className="form-select"
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="">Sort...</option>
                          <option value="A-z">A-z</option>
                          <option value="Z-a">Z-a</option>
                          <option value="Popular">Popular</option>
                          <option value="New Arrivals">New Arrivals</option>
                        </select>
                      </div>
                      {/* <div className="col-6 col-sm-6 col-md-6">
                        <label htmlFor="Select Device Type" className="form-label">
                          Select Category Type
                        </label>
                        <select
                          id="inputDeviceBrand"
                          className="form-select"
                          onChange={(e) => {
                            const subcategoryId = e.target.value;
                            setFilterId(parseInt(subcategoryId));
                            handleSubcategoryClick(subcategoryId);

                            router.push(`/productlist?subcategoryid=${subcategoryId}`);
                          }}
                        >
                          <option value="">Type...</option>
                          {categories.map((category) => (
                            <option key={category.subcategoryid} value={category.subcategoryid}>
                              {category.subcategoryname}
                            </option>
                          ))}
                        </select>


                      </div> */}
                    </div>
                  </form>
                </div>
              </div>
              {/* offcanvas  side left nav */}
              <div
                className="offcanvas offcanvas-start"
                data-bs-scroll="true"
                tabIndex={-1}
                id="offcanvasWithBothOptions"
                aria-labelledby="offcanvasWithBothOptionsLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                    Filters
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className="offcanvas-body">
                  <hr />
                  <div className="catiList">

                    {categories.map((category) => {
                      return (
                        <>

                          <li key={category.id} className="dropdown-item">
                            <Link href={`/productlist?subcategoryid=${category.subcategoryid}`} className="dropdown-item-links"
                            >
                              <div className="navMedia">

                              </div>
                              <div className="navText">

                                <span>{category.subcategoryname}</span>
                              </div>
                            </Link>
                          </li>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-0">
              {/* products */}
              <div className="ourDevice--filterGrid">
                {filteredProducts.map((product: any, index: number) => (
                  <>

                    <div className="deviceCard" key={index}>
                      <div className="media">
                        <img
                          src={sample.src}
                          width={180}
                          height={180}
                          alt="Device Image"
                        />
                      </div>
                      <div className="ctaBody">
                        <h3>{product.productname}</h3>
                        <Link
                          href="#"
                          className="viewPlan-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleModal();
                            setSelectedProduct(product.productid)
                          }}
                        >

                          View Plan
                        </Link>
                        {/* href={`/productlist?subcategoryid=${product.productid}`} */}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
   </Layout>
  );
}

export default ProductList;
