import {
  FaBullseye,
  FaEye,
  FaHeart,
  FaUsers,
} from "react-icons/fa";

function About() {
  return (
    <div className="bg-slate-50">

      {/* Hero Section */}

      <section className="bg-emerald-600 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">

            About CraftNest

          </h1>

          <p className="mt-6 text-lg max-w-3xl mx-auto">

            CraftNest is an online marketplace dedicated to
            promoting handmade crafts, wooden décor,
            personalized gifts and artisan products.

          </p>

        </div>

      </section>

      {/* Our Story */}

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">

        <img
          src="https://images.unsplash.com/photo-1517705008128-361805f42e86?w=900"
          alt="About CraftNest"
          className="rounded-3xl shadow-xl"
        />

        <div>

          <h2 className="text-4xl font-bold mb-6">

            Our Story

          </h2>

          <p className="text-gray-600 leading-8">

            CraftNest was created with one goal:
            to connect talented artisans with customers
            looking for unique handmade creations.

            Every product available on our platform
            reflects creativity, craftsmanship and passion.

          </p>

          <p className="text-gray-600 leading-8 mt-5">

            We believe handmade products carry emotions,
            stories and authenticity that mass-produced
            items cannot replace.

          </p>

        </div>

      </section>

      {/* Mission Vision */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

          <div className="bg-slate-50 rounded-2xl shadow-lg p-8 text-center">

            <FaBullseye className="text-5xl text-emerald-600 mx-auto mb-5" />

            <h3 className="text-2xl font-bold mb-4">

              Our Mission

            </h3>

            <p className="text-gray-600">

              Empower artisans by providing a trusted
              platform to showcase and sell their
              handmade products globally.

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl shadow-lg p-8 text-center">

            <FaEye className="text-5xl text-emerald-600 mx-auto mb-5" />

            <h3 className="text-2xl font-bold mb-4">

              Our Vision

            </h3>

            <p className="text-gray-600">

              Become the leading online destination
              for handmade and eco-friendly products.

            </p>

          </div>

          <div className="bg-slate-50 rounded-2xl shadow-lg p-8 text-center">

            <FaHeart className="text-5xl text-emerald-600 mx-auto mb-5" />

            <h3 className="text-2xl font-bold mb-4">

              Our Values

            </h3>

            <p className="text-gray-600">

              Creativity, Quality,
              Sustainability and Customer
              Satisfaction.

            </p>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">

            CraftNest In Numbers

          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <h3 className="text-5xl font-bold text-emerald-600">

                500+

              </h3>

              <p className="mt-3">

                Handmade Products

              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <h3 className="text-5xl font-bold text-emerald-600">

                150+

              </h3>

              <p className="mt-3">

                Happy Customers

              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <h3 className="text-5xl font-bold text-emerald-600">

                50+

              </h3>

              <p className="mt-3">

                Skilled Artisans

              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

              <h3 className="text-5xl font-bold text-emerald-600">

                100%

              </h3>

              <p className="mt-3">

                Handmade Quality

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Team */}

      <section className="bg-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <FaUsers className="text-6xl text-emerald-600 mx-auto mb-6" />

          <h2 className="text-4xl font-bold">

            Meet Our Community

          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-8">

            Our community consists of talented artisans,
            creative designers and satisfied customers
            who share a passion for handmade products
            and sustainable craftsmanship.

          </p>

        </div>

      </section>

    </div>
  );
}

export default About;