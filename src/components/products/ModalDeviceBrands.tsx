import React, { useEffect, useState, useMemo } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { getBrandsByProducts } from '@/services/global_services';
import Link from 'next/link';
import { useRouter } from 'next/router';
import brandsample from '../../assets/img/brandDummylogo.png'
interface Brand {
    mid: string;
    Brand: string;
    src: string;
}

const ModalDeviceBrands = ({ showModal, toggleModal, productId }: { showModal: boolean, toggleModal: any, productId: string }) => {
    console.log('productId', productId);
    const router = useRouter();
  const { subcategoryid } = router.query;
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading
    const [deviceList, setDeviceList] = useState<Brand[]>([]); 
    const [listening, setListening] = useState(false);
    const fetchBrandList = useMemo(() => {
        return async () => {
            try {
                setLoading(true); // Set loading state to true
                if (productId) {
                    const response = await getBrandsByProducts(productId);
                    if (response && response.isSuccess && response.statusCode === 200) {
                        setDeviceList(response.data);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading state to false when done
            }
        };
    }, [productId]);

    useEffect(() => {
        if (productId) {
            fetchBrandList();
        }
    }, [productId, fetchBrandList]);

    
    // if (loading) {
    //     return (
    //       <div className="spinner-grow" role="status">
    //       <span className="sr-only">Loading...</span>
    //     </div>
    //     );
    // }
    

    return (
        <Modal
        show={showModal}
        onHide={() => {
            toggleModal();
            setSearchQuery('');
        }}
        className="modal fade"
        id="selectBrands"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">
                        Select Device Brands
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={toggleModal}
                        aria-label="Close"
                    />
                </div>
                <div className="modal-body">
                    {loading ? ( // Render Spinner if loading is true
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <div className="main-container">
                            <div className="searchbar">
                                <div className="searchbar-wrapper">
                                    <div className="searchbar-left">
                                        <div className="search-icon-wrapper">
                                            <span className="search-icon searchbar-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                            </svg>
                                            </span>
                                        </div>
                                    </div>
                                    {/* Your search bar code */}
                                    <div className="searchbar-center">
                                        <div className="searchbar-input-spacer" />
                                        <input
                                            type="text"
                                            className="searchbar-input"
                                            maxLength={2048}
                                            name="q"
                                            autoCapitalize="off"
                                            autoComplete="off"
                                            title="Search"
                                            role="combobox"
                                            placeholder="Search Brand..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="searchbar-right">
                                        <svg
                                            className="voice-search"
                                            role="button"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 16 16"
                                            // onClick={handleVoiceSearch}
                                        >
                                            <path
                                                fill="#9aa0a6"
                                                d="M8 10c-1.7 0-3-1.3-3-3V3c0-1.6 1.3-3 3-3c1.6 0 3 1.3 3 3v4c0 1.6-1.4 3-3 3"
                                            />
                                            <path
                                                fill="#9aa0a6"
                                                d="M12 5v2.5c0 1.9-1.8 3.5-3.8 3.5h-.4C5.8 11 4 9.4 4 7.5V5c-.6 0-1 .4-1 1v1.5c0 2.2 1.8 4.1 4 4.4V14c-3 0-2.5 2-2.5 2h7s.5-2-2.5-2v-2.1c2.2-.4 4-2.2 4-4.4V6c0-.6-.4-1-1-1"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h2>Search your brand if not visible here</h2>
                            <div className="radio-buttons">
                            {deviceList.length > 0 && deviceList
                                .filter((brand: any) =>
                                    brand.Brand.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((brand, index) => {
                                    if (index <= 11) {
                                        return (
                                            <Link key={index} href={`/plan?subcategoryid=${subcategoryid}&productid=${brand.mid}&brand=${brand.Brand}`} className="custom-radio">
                                                    <label className="">
                                                        <input type="radio" name="radio" />
                                                        <span className="radio-btn">
                                                            <div className="brand-icon">
                                                                <img src={brandsample.src} alt={brand.Brand} />
                                                                <h3>{brand.Brand}</h3>
                                                            </div>
                                                        </span>
                                                    </label>
                                            </Link>
                                        )
                                    }
                                    return null; // Ensure to return null for cases where index > 11
                                })
                            }
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </Modal>
    

    )
}

export default ModalDeviceBrands;
