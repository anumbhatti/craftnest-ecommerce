import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../services/api";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const { fetchCartCount } = useCart();
  const { fetchWishlistCount } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

const [rating, setRating] = useState(5);

const [comment, setComment] = useState("");

const [reviewLoading, setReviewLoading] = useState(false);

const [editingReviewId, setEditingReviewId] = useState(null);

 useEffect(() => {
  fetchProduct();
  fetchReviews();
}, []);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
  try {
    const { data } = await API.get(`/reviews/${id}`);

    setReviews(data.reviews);

  } catch (error) {
    console.log(error);
  }
};

  // ================= Add To Cart =================

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await API.post(
        "/cart",
        {
          product: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCartCount();

      toast.success("Product added to cart!");

    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Failed to add product to cart."
);
    }
  };

  // ================= Add To Wishlist =================

  const addToWishlist = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please login first.");
      navigate("/login");
      return;
    }

    try {
      await API.post(
        "/wishlist",
        {
          product: product._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchWishlistCount();

      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error(
  error.response?.data?.message ||
  "Failed to add product to wishlist."
);
    }
  };

  const submitReview = async () => {

  const token = localStorage.getItem("token");

  if (!token) {
   toast.warning("Please login first.");
    navigate("/login");
    return;
  }

  if (!comment.trim()) {
    toast.warning("Please write a comment.");
    return;
  }

  try {

    setReviewLoading(true);

    if (editingReviewId) {

      await API.put(
        `/reviews/${editingReviewId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review updated successfully!");

    } else {

      await API.post(
        "/reviews",
        {
          product: product._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Review submitted successfully!");

    }

    setRating(5);
    setComment("");
    setEditingReviewId(null);

    await fetchReviews();

  } catch (error) {

    toast.error(
  error.response?.data?.message ||
  "Something went wrong."
);

  } finally {

    setReviewLoading(false);

  }

};

const deleteReview = async (reviewId) => {
  const token = localStorage.getItem("token");

  try {
    await API.delete(`/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Review deleted successfully!");

    await fetchReviews();

  } catch (error) {
    console.log(error);

    toast.error(
  error.response?.data?.message ||
  "Failed to delete review."
);
  }
};

const editReview = (review) => {
  setEditingReviewId(review._id);
  setRating(review.rating);
  setComment(review.comment);

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
};

  // ================= Loading =================
const averageRating =
  reviews.length > 0
    ? (
        reviews.reduce(
          (sum, item) => sum + item.rating,
          0
        ) / reviews.length
      ).toFixed(1)
    : 0;

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">

      <Link
        to="/products"
        className="text-emerald-600 font-semibold"
      >
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12 mt-8">

        <img
  src={product.image || "https://placehold.co/600x600?text=No+Image"}
  alt={product.name}
  className="w-full rounded-2xl shadow-lg h-[500px] object-cover"
/>

        <div>

          <h1 className="text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-emerald-600 text-3xl font-bold mt-4">
            Rs. {product.price}
          </p>

          <p className="text-gray-600 mt-6 leading-8">
            {product.description}
          </p>

          <div className="mt-8 space-y-3">

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Stock:</strong>{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-red-600">
                  Out of Stock
                </span>
              )}
            </p>

          </div>

          <div className="mt-10 flex gap-4">

            <button
              onClick={addToCart}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
            >
              Add To Cart
            </button>

            <button
              onClick={addToWishlist}
              className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-600 hover:text-white"
            >
              Add Wishlist
            </button>

          </div>

        </div>

      </div>

      {/* ================= Write Review ================= */}

<div className="bg-white shadow rounded-xl p-6 mt-16 mb-12">

  <h2 className="text-2xl font-bold mb-6">
    Write a Review
  </h2>

  <div className="flex gap-2 mb-5">

    {[1,2,3,4,5].map((star)=>(
      <FaStar
        key={star}
        onClick={()=>setRating(star)}
        className={`text-3xl cursor-pointer ${
          star <= rating
            ? "text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ))}

  </div>

  <textarea
    rows="4"
    placeholder="Write your review..."
    value={comment}
    onChange={(e)=>setComment(e.target.value)}
    className="w-full border rounded-lg p-4"
  />

  <button
    onClick={submitReview}
    disabled={reviewLoading}
    className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
  >
    {reviewLoading
  ? "Saving..."
  : editingReviewId
  ? "Update Review"
  : "Submit Review"}
  </button>

</div>

      {/* ================= Reviews ================= */}

<div className="mt-20">

  <h2 className="text-3xl font-bold mb-6">
    Customer Reviews
  </h2>

  {/* Average Rating */}

  <div className="flex items-center gap-4 mb-8">

    <div className="flex">

      {[1,2,3,4,5].map((star)=>(

        <FaStar
          key={star}
          className={`text-2xl ${
            star <= Math.round(averageRating)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        />

      ))}

    </div>

    <span className="text-lg font-semibold">
      {averageRating} / 5
    </span>

    <span className="text-gray-500">
      ({reviews.length} Reviews)
    </span>

  </div>

  {/* Reviews */}

  {reviews.length === 0 ? (

    <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">

      No reviews yet.

    </div>

  ) : (

    <div className="space-y-6">

      {reviews.map((review)=>(


        <div
          key={review._id}
          className="bg-white shadow rounded-xl p-6"
        >

          {console.log("Logged User ID:", user?.id)}
{console.log("Review User:", review.user)}

          <div className="flex justify-between">

            <div>

              <h3 className="font-bold text-lg">
                {review.user?.name}
              </h3>

              {user &&
 (user.id === review.user?._id ||
  user.id === review.user?.id) && (

  <div className="flex gap-3 mt-3">

    <button
      onClick={() => editReview(review)}
      className="text-blue-600 hover:underline"
    >
      Edit
    </button>

    <button
      onClick={() => deleteReview(review._id)}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>

  </div>

)}

              <div className="flex mt-2">

                {[1,2,3,4,5].map((star)=>(

                  <FaStar
                    key={star}
                    className={
                      star <= review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />

                ))}

              </div>

            </div>

            <span className="text-gray-400 text-sm">

              {new Date(review.createdAt).toLocaleDateString()}

            </span>

          </div>

          <p className="mt-4 text-gray-600">

            {review.comment}

          </p>

        </div>

      ))}

    </div>

  )}

</div>

    </div>
  );
}

export default ProductDetails;