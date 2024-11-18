import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopFilter from "../../Filter/Index";
import { useTranslation } from "react-i18next";
import { useAccessories } from "../../context/useAccessories";
import { t } from "i18next";
const ITEMS_PER_PAGE = 6;

const Accessories: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { accessories, isLoading, error } = useAccessories();
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<{
    name?: string;
    info?: string;
    price?: { from: number; to: number };
    mm?: number;
    mp?: number;
    mic?: boolean;
    aud?: boolean;
  }>({});

  const handleAccessoryClick = (id: number) => {
    navigate(`/accessories/${id}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading || !accessories) return <div className="loading-spinner"></div>;
  if (error)
    return <div className="error-message">{`Error: ${error.message}`}</div>;

  const languageAccessories = accessories[i18n?.language]?.cards || [];
  const filteredAccessories = languageAccessories.filter((item) => {
    const matchesName = filters.name
      ? item.name.toLowerCase().includes(filters.name.toLowerCase())
      : true;
    const matchesInfo = filters.info
      ? item.info.toLowerCase().includes(filters.info.toLowerCase())
      : true;
    const matchesPrice = filters.price
      ? item.price >= filters.price.from && item.price <= filters.price.to
      : true;

    const matchesMm = filters.mm ? item.mm >= filters.mm : true;
    const matchesMp = filters.mp ? item.mp >= filters.mp : true;
    const matchesMic = filters.mic ? item.mic : true;
    const matchesAud = filters.aud ? item.aud : true;

    return (
      matchesName &&
      matchesInfo &&
      matchesPrice &&
      matchesMm &&
      matchesMp &&
      matchesMic &&
      matchesAud
    );
  });

  const totalItems = filteredAccessories.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedAccessories = filteredAccessories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPageButtons = 3;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return (
      <>
        {startPage > 1 && (
          <button
            onClick={() => handlePageChange(1)}
            className="btn btn-outline-primary mx-1"
            style={{
              padding: "10px 15px",
              borderRadius: "7px",
              fontSize: "16px",
            }}
          >
            1
          </button>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`btn ${
              currentPage === page ? "btn-primary" : "btn-outline-primary"
            } mx-1`}
            style={{
              padding: "10px 15px",
              borderRadius: "7px",
              fontSize: "16px",
              fontWeight: "500",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            {page}
          </button>
        ))}
        {endPage < totalPages - 1 && (
          <span
            className="mx-1"
            style={{ padding: "10px 15px", fontSize: "16px" }}
          >
            ...
          </span>
        )}
        {endPage < totalPages && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="btn btn-outline-primary mx-1"
            style={{
              padding: "10px 15px",
              borderRadius: "7px",
              fontSize: "16px",
            }}
          >
            {totalPages}
          </button>
        )}
      </>
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 col-lg-3  mb-4">
          <ShopFilter setFilters={setFilters} />
        </div>
        <div className="col-12 col-lg-9">
          <div className="row">
            {paginatedAccessories.map((item) => (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 mb-4">
                <div
                  className="card d-flex flex-column justify-content-between"
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    backgroundColor: "#ffffff",
                    border: "none",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={item.img}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5
                      className="card-title"
                      style={{ fontWeight: "600", color: "#333" }}
                    >
                      {item.name}
                    </h5>
                    <p
                      className="card-text"
                      style={{ color: "#666", flexGrow: 1 }}
                    >
                      {item.info}
                    </p>
                    <p
                      className="card-text"
                      style={{ fontWeight: "700", color: "#007bff" }}
                    >
                      {t("Price")}:{" "}
                      {Math.round((item.price - (item.price * 23) / 100) * 2.7)}
                      <span style={{ marginLeft: "4px" }}>{t("GEL")}</span>
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAccessoryClick(item.id);
                      }}
                      className="btn btn-primary mt-3"
                      style={{
                        borderRadius: "7px",
                        fontWeight: "600",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {t("View Details")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pagination mt-4 d-flex justify-content-center">
            {renderPagination()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accessories;
