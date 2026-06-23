import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");

    const [pdfUrl, setPdfUrl] = useState("");

    const generateCoupons = async () => {

        try {

            const res = await api.post(
                "/barcodes/generate",
                {
                    itemName,
                    quantity
                }
            );

            alert(
                `${res.data.count} Coupons Generated Successfully`
            );

            // Generate PDF automatically
            const pdfRes = await api.post(
                "/barcodes/generate-pdf",
                {
                    itemName
                }
            );

            setPdfUrl(
                `http://localhost:5000${pdfRes.data.url}`
            );

            // Clear Inputs
            setItemName("");
            setQuantity("");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error"
            );
        }
    };

    return (
        <div className="container mt-4">
            <Navbar />
            <h2>Barcode Dashboard</h2>

            <div className="card p-4">

                <input
                    className="form-control mb-3"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) =>
                        setItemName(e.target.value)
                    }
                />

                <input
                    className="form-control mb-3"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }
                />

                <button
                    className="btn btn-success"
                    onClick={generateCoupons}
                >
                    Generate Coupons
                </button>
                {
                    pdfUrl && (
                        <div className="mt-3">

                            <a
                                href={pdfUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary"
                            >
                                Download PDF
                            </a>

                        </div>
                    )
                }
            </div>

        </div>
    );
}

export default Dashboard;