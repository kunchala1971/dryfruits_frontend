import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function BarcodeSummary() {

    const [data, setData] = useState([]);

    const loadData = async () => {

        try {

            const res = await api.get(
                "/barcodes/summary"
            );

            setData(res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteBatch = async (itemName) => {

        const confirmDelete =
            window.confirm(
                `Delete all coupons for ${itemName}?`
            );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `/barcodes/delete/${itemName}`
            );

            alert("Deleted Successfully");

            loadData();

        } catch (error) {

            alert(
                error.response?.data?.message
            );
        }
    };
    const downloadPdf = async (itemName) => {

        try {

            const res = await api.post(
                "/barcodes/generate-pdf",
                {
                    itemName
                }
            );

            window.open(
                `http://localhost:5000${res.data.url}`,
                "_blank"
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Error generating PDF"
            );
        }
    };
    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h3>Barcode Summary</h3>

                <table className="table table-bordered table-striped">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Item Name</th>
                            <th>Qty</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            data.map((row, index) => (

                                <tr key={index}>

                                    <td>{row.batch_id}</td>

                                    <td>{row.item_name}</td>

                                    <td>{row.qty}</td>

                                    <td>
                                        {
                                            new Date(
                                                row.created_at
                                            ).toLocaleDateString()
                                        }
                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() =>
                                                downloadPdf(
                                                    row.item_name
                                                )
                                            }
                                        >
                                            PDF
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                deleteBatch(
                                                    row.item_name
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </>
    );
}

export default BarcodeSummary;