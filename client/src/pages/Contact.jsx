import { useState } from "react";
import { toast } from "react-toastify";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  toast.success("Message sent successfully!");

  setFormData({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
};
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}

      <section className="bg-emerald-600 text-white py-20 text-center">

        <h1 className="text-5xl font-bold">
          Contact Us
        </h1>

        <p className="mt-5 text-lg">
          We'd love to hear from you.
          Send us a message anytime.
        </p>

      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16">

        {/* Left */}

        <div>

          <h2 className="text-3xl font-bold mb-10">

            Get In Touch

          </h2>

          <div className="space-y-8">

            <div className="flex gap-5 bg-white shadow rounded-xl p-6">

              <FaEnvelope className="text-3xl text-emerald-600" />

              <div>

                <h3 className="font-bold text-xl">

                  Email

                </h3>

                <p className="text-gray-600">

                  anumsanaulah@gmail.com

                </p>

              </div>

            </div>

            <div className="flex gap-5 bg-white shadow rounded-xl p-6">

              <FaPhoneAlt className="text-3xl text-emerald-600" />

              <div>

                <h3 className="font-bold text-xl">

                  Phone

                </h3>

                <p className="text-gray-600">

                  +92 320 9118134

                </p>

              </div>

            </div>

            <div className="flex gap-5 bg-white shadow rounded-xl p-6">

              <FaMapMarkerAlt className="text-3xl text-emerald-600" />

              <div>

                <h3 className="font-bold text-xl">

                  Address

                </h3>

                <p className="text-gray-600">

                  Islamabad, Pakistan

                </p>

              </div>

            </div>

          </div>

          {/* Social */}

          <div className="mt-10">

            <h3 className="text-2xl font-bold mb-5">

              Follow Us

            </h3>

            <div className="flex gap-4">

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="bg-emerald-600 text-white p-4 rounded-full hover:bg-emerald-700 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="bg-emerald-600 text-white p-4 rounded-full hover:bg-emerald-700 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="bg-emerald-600 text-white p-4 rounded-full hover:bg-emerald-700 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="bg-emerald-600 text-white p-4 rounded-full hover:bg-emerald-700 transition"
              >
                <FaGithub />
              </a>

            </div>

          </div>

        </div>

        {/* Contact Form */}

        <div className="bg-white shadow-xl rounded-2xl p-10">

          <h2 className="text-3xl font-bold mb-8">

            Send Message

          </h2>

          <form
  onSubmit={handleSubmit}
  className="space-y-6"
>
            <input
  type="text"
  name="name"
  placeholder="Full Name"
  className="w-full border rounded-xl p-4"
  value={formData.name}
  onChange={handleChange}
  required
/>

            <input
  type="email"
  name="email"
  placeholder="Email Address"
  className="w-full border rounded-xl p-4"
  value={formData.email}
  onChange={handleChange}
  required
/>

            <input
  type="text"
  name="subject"
  placeholder="Subject"
  className="w-full border rounded-xl p-4"
  value={formData.subject}
  onChange={handleChange}
  required
/>

            <textarea
  rows="6"
  name="message"
  placeholder="Your Message"
  className="w-full border rounded-xl p-4"
  value={formData.message}
  onChange={handleChange}
  required
></textarea>

            <button
  type="submit"
  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl text-lg font-semibold transition"
>
  Send Message
</button>

          </form>

        </div>

      </div>

      {/* Google Map */}

      <div className="max-w-7xl mx-auto px-6 pb-20">

        <iframe
          title="CraftNest Location"
          src="https://www.google.com/maps?q=Islamabad,Pakistan&output=embed"
          className="w-full h-[450px] rounded-2xl shadow-xl border-0"
          loading="lazy"
        ></iframe>

      </div>

    </div>
  );
}

export default Contact;