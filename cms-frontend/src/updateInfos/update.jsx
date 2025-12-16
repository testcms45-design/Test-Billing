import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function UpdateInfos() {
  const navigate = useNavigate();
  const {id} = useParams();


  const [formDataState, setFormDataState] = useState({
    customer: "",
    description: "",
    amount: "",
    service:"",
    location: "",
    imageFile: null,
    imagePreview: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Handle ONE image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormDataState((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  const removeImage = () => {
  setFormDataState((prev) => ({
      ...prev,
      image: null,
      imagePreview: null,
    }));
};



 const getInfos = async () => {
    try {
      const response = await fetch(`https://test-billing-zpdr.onrender.com/api/billing/${id}`, {
        method: "GET",
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Failed to find infos");
        return;
      }
      const data = await response.json();
      setFormDataState(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } 
  };

  useEffect(()=>{
   getInfos()
  },[])



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formDataState.customer.trim()) newErrors.customer = "Client title is required.";
    if (!formDataState.description.trim()) newErrors.description = "Client description is required.";
    if (!formDataState.amount) newErrors.amount = "Amount is required.";
    if (!formDataState.service.trim()) newErrors.service = "Location is required.";
        if (!formDataState.location.trim()) newErrors.location = "Service is required.";
    if (!formDataState.imagePreview && !formDataState.image) newErrors.image = "Client image is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("customer", formDataState.customer);
    formData.append("description", formDataState.description);
    formData.append("amount", formDataState.amount);
    formData.append("service", formDataState.service);
    formData.append("location", formDataState.location);
    formData.append("image", formDataState.imageFile); // 🔑 ONE image

    try {
      const response = await fetch(`https://test-billing-zpdr.onrender.com/api/billing/${id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Failed to create Client");
        return;
      }

      alert("Client modified successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      

      {/* FORM */}
      <div className="bg-green-50 min-h-screen text-black py-10 mt-24 md:mt-30">
        <h1 className="text-3xl  text-center mb-10">
          Update Client Infos
        </h1>

        <div className="max-w-3xl mx-auto px-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Client Title"
              className="p-3 border border-black"
              value={formDataState.customer}
              onChange={(e) =>
                setFormDataState({ ...formDataState, customer: e.target.value })
              }
            />
            {errors.customer && <p className="text-red-500">{errors.customer}</p>}

            <textarea
              rows={3}
              placeholder="Client Description"
              className="p-3 border border-black"
              value={formDataState.description}
              onChange={(e) =>
                setFormDataState({ ...formDataState, description: e.target.value })
              }
            />
            {errors.description && <p className="text-red-500">{errors.description}</p>}

            <input
              type="number"
              placeholder="amount"
              className="p-3 border border-black"
              value={formDataState.amount}
              onChange={(e) =>
                setFormDataState({ ...formDataState, amount: e.target.value })
              }
            />
            {errors.amount && <p className="text-red-500">{errors.amount}</p>}

            <input 
              type="text"
              placeholder="Service"
              className="p-3 border border-black"
              value={formDataState.service}
              onChange={(e) =>
                setFormDataState({ ...formDataState, service: e.target.value })
              }
            />
            {errors.service && <p className="text-red-500">{errors.service}</p>}

            <input
              type="text"
              placeholder="Location"
              className="p-3 border border-black"
              value={formDataState.location}
              onChange={(e) =>
                setFormDataState({ ...formDataState, location: e.target.value })
              }
            />
            {errors.location && <p className="text-red-500">{errors.location}</p>}

           {/* IMAGE SECTION */}
<label>Client Image</label>

{ formDataState.image || formDataState.imagePreview? (
  <div className="relative w-72 md:w-96 m-auto">
    <img
      src={formDataState.image ? formDataState.image : formDataState.imagePreview}
      alt="Preview"
      className="h-40 w-72 md:w-96 object-cover border rounded"
    />
    <button
      type="button"
      onClick={removeImage}
      className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
    >
      ✕
    </button>
  </div>
) : (
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="border border-black p-2"
  />
)}

{errors.image && <p className="text-red-500">{errors.image}</p>}

            {/* SUBMIT */}
            <button
            disabled={loading}
              type="submit"
              className={`bg-black text-white py-3 flex items-center justify-center gap-2 `}
            >
              {loading ? "Uploading..." : <>Update <Send size={16} /></>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
