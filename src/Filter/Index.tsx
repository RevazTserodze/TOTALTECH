import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface ShopFilterProps {
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name?: string;
      price?: { from: number; to: number };
      mm?: number;
      mp?: number;
      mic?: boolean;
      aud?: boolean;
    }>
  >;
}

const ShopFilter: React.FC<ShopFilterProps> = ({ setFilters }) => {
  const [nameFilter, setNameFilter] = React.useState<string>("");
  const [priceFrom, setPriceFrom] = React.useState<number | "">("");
  const [priceTo, setPriceTo] = React.useState<number | "">("");
  const [mm, setMm] = React.useState<number | "">("");
  const [mp, setMp] = React.useState<number | "">("");
  const [mic, setMic] = React.useState<boolean>(false);
  const [aud, setAud] = React.useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };

  const handlePriceFromChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPriceFrom(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handlePriceToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceTo(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleMmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMm(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleMpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMp(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === "mic") setMic(checked);
    if (name === "aud") setAud(checked);
  };

  const applyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      name: nameFilter,
      price: {
        from: priceFrom === "" ? 0 : priceFrom,
        to: priceTo === "" ? Infinity : priceTo,
      },
      mm: mm === "" ? undefined : mm,
      mp: mp === "" ? undefined : mp,
      mic,
      aud,
    }));
  };
  const { t } = useTranslation();
  return (
    <Container
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "10px",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
        maxWidth: "700px",
        marginTop: "2rem",
      }}
    >
      <h4
        style={{
          marginBottom: "1.5rem",
          fontWeight: 600,
          fontSize: "1.4rem",
          color: "#007bff",
          textAlign: "center",
        }}
      >
        {t("Filter Products")}
      </h4>
      <div style={{ borderTop: "2px solid #ddd", paddingTop: "15px" }}>
        <Row
          className="mb-3 align-items-center"
          style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
        >
          <Col xs={4} style={{ fontWeight: "bold", color: "#555" }}>
            {t("Product Name")}
          </Col>
          <Col xs={8}>
            <input
              type="text"
              value={nameFilter}
              onChange={handleNameChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </Col>
        </Row>
        <Row
          className="mb-3 align-items-center"
          style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
        >
          <Col xs={4} style={{ fontWeight: "bold", color: "#555" }}>
            {t("Price Range")}
          </Col>
          <Col xs={4}>
            <input
              type="number"
              value={priceFrom}
              onChange={handlePriceFromChange}
              placeholder="From"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </Col>
          <Col xs={4}>
            <input
              type="number"
              value={priceTo}
              onChange={handlePriceToChange}
              placeholder="To"
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </Col>
        </Row>
        <Row
          className="mb-3 align-items-center"
          style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
        >
          <Col xs={4} style={{ fontWeight: "bold", color: "#555" }}>
            MM
          </Col>
          <Col xs={8}>
            <input
              type="number"
              value={mm}
              onChange={handleMmChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </Col>
        </Row>
        <Row
          className="mb-3 align-items-center"
          style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
        >
          <Col xs={4} style={{ fontWeight: "bold", color: "#555" }}>
            MP
          </Col>
          <Col xs={8}>
            <input
              type="number"
              value={mp}
              onChange={handleMpChange}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                fontSize: "0.9rem",
                boxSizing: "border-box",
              }}
            />
          </Col>
        </Row>
        <Row className="mb-3 align-items-center">
          <Col xs={4} style={{ fontWeight: "bold", color: "#555" }}>
            {t("Options")}
          </Col>
          <Col xs={4}>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>
              <input
                type="checkbox"
                name="mic"
                checked={mic}
                onChange={handleCheckboxChange}
                style={{ marginRight: "8px" }}
              />
              MIC
            </label>
          </Col>
          <Col xs={4}>
            <label style={{ fontSize: "0.9rem", color: "#555" }}>
              <input
                type="checkbox"
                name="aud"
                checked={aud}
                onChange={handleCheckboxChange}
                style={{ marginRight: "8px" }}
              />
              AUD
            </label>
          </Col>
        </Row>
      </div>
      <button
        onClick={applyFilters}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "12px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          fontWeight: 800,
          fontSize: "1rem",
          transition: "background-color 0.3s ease",
          marginTop: "15px",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#0056b3";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#007bff";
        }}
      >
        {t("Apply Filters")}
      </button>
    </Container>
  );
};

export default ShopFilter;
